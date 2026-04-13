"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const ASCII_CHARS = " .,:;!iI|+X%E&#@"; // Expanded and more varied
const CELL_WIDTH = 6;
const CELL_HEIGHT = 10;

// User Palette
const COLORS = {
  background: "#030303",
  primary: "#6064A3", // Dusty Grape
  primaryLight: "#B3A6C4", // Lilac Ash
  accent: "#937E9C", // Dusty Mauve
};

interface Cell {
  char: string;
  brightness: number;
}

interface WaterParams {
  waveSpeed: number;
  damping: number;
  rippleStrength: number;
  clickStrength: number;
  refraction: number;
}

const DEFAULT_PARAMS: WaterParams = {
  waveSpeed: 0.4,
  damping: 0.94,
  rippleStrength: 0.25,
  clickStrength: 15,
  refraction: 1.2,
};

export default function AsciiRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);

  const waveCurrentRef = useRef<Float32Array>(new Float32Array(0));
  const velocityRef = useRef<Float32Array>(new Float32Array(0));

  const mouseRef = useRef({ x: -1, y: -1, prevX: -1, prevY: -1 });
  const animFrameRef = useRef<number>(0);
  const paramsRef = useRef<WaterParams>({ ...DEFAULT_PARAMS });
  const isVisibleRef = useRef(true);

  const initGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = containerRef.current;
    if (!container) return;

    const dpr = window.devicePixelRatio || 1;
    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const cols = Math.floor(width / CELL_WIDTH);
    const rows = Math.floor(height / CELL_HEIGHT);
    colsRef.current = cols;
    rowsRef.current = rows;

    const totalCells = cols * rows;
    waveCurrentRef.current = new Float32Array(totalCells);
    velocityRef.current = new Float32Array(totalCells);
  }, []);

  const propagateWaves = useCallback(() => {
    const cols = colsRef.current;
    const rows = rowsRef.current;
    if (cols === 0 || rows === 0) return;
    
    const current = waveCurrentRef.current;
    const velocity = velocityRef.current;
    const p = paramsRef.current;

    const next = new Float32Array(current.length);
    const THRESHOLD = 0.001;

    for (let row = 1; row < rows - 1; row++) {
      for (let col = 1; col < cols - 1; col++) {
        const idx = row * cols + col;

        const laplacian =
          current[idx - 1] +
          current[idx + 1] +
          current[idx - cols] +
          current[idx + cols] -
          4 * current[idx];

        const acceleration = laplacian * p.waveSpeed;
        const v = (velocity[idx] + acceleration) * p.damping;
        const d = current[idx] + v;

        if (Math.abs(v) > THRESHOLD || Math.abs(d) > THRESHOLD) {
          velocity[idx] = v;
          next[idx] = d;
        }
      }
    }

    waveCurrentRef.current = next;
  }, []);

  const addRipple = useCallback((col: number, row: number, strength: number, radius: number) => {
    const cols = colsRef.current;
    const rows = rowsRef.current;
    if (cols === 0 || rows === 0) return;
    
    const current = waveCurrentRef.current;

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const c = col + dx;
        const r = row + dy;
        if (c >= 0 && c < cols && r >= 0 && r < rows) {
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist <= radius) {
            const idx = r * cols + c;
            const sigma = radius * 0.4;
            const gaussian = Math.exp(-(dist * dist) / (2 * sigma * sigma));
            current[idx] += strength * gaussian;
          }
        }
      }
    }
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cols = colsRef.current;
    const rows = rowsRef.current;
    const current = waveCurrentRef.current;
    const p = paramsRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = `${8 * dpr}px "Geist Mono", monospace`;
    ctx.textBaseline = "middle";

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const idx = row * cols + col;
        const wave = current[idx];

        if (Math.abs(wave) < 0.03) continue;

        const waveIntensity = Math.min(1, Math.abs(wave) * 0.1);
        if (waveIntensity < 0.01) continue;

        const charIdx = Math.floor(waveIntensity * (ASCII_CHARS.length - 1));
        const displayChar = ASCII_CHARS[charIdx];

        // Smooth interpolation between Dusty Grape (#6064A3) and Lilac Ash (#B3A6C4)
        // Dusty Grape: r: 96, g: 100, b: 163
        // Lilac Ash: r: 179, g: 166, b: 196
        const r = Math.floor(96 + (179 - 96) * waveIntensity);
        const g = Math.floor(100 + (166 - 100) * waveIntensity);
        const b = Math.floor(163 + (196 - 163) * waveIntensity);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1.0, waveIntensity * 4.0)})`;

        const drawX = col * CELL_WIDTH * dpr;
        const drawY = (row * CELL_HEIGHT + CELL_HEIGHT * 0.5) * dpr;

        ctx.fillText(displayChar, drawX, drawY);
      }
    }
  }, []);

  const animate = useCallback(() => {
    if (!isVisibleRef.current) return;

    const mouse = mouseRef.current;
    const p = paramsRef.current;

    if (mouse.x >= 0 && mouse.y >= 0) {
      const col = Math.floor(mouse.x / CELL_WIDTH);
      const row = Math.floor(mouse.y / CELL_HEIGHT);
      
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 1) {
        addRipple(col, row, speed * p.rippleStrength, 3);
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    } else {
        // Subtle autonomous ripples
        if (Math.random() > 0.98) {
            const rCol = Math.floor(Math.random() * colsRef.current);
            const rRow = Math.floor(Math.random() * rowsRef.current);
            addRipple(rCol, rRow, 5, 2);
        }
    }

    propagateWaves();
    render();
    animFrameRef.current = requestAnimationFrame(animate);
  }, [propagateWaves, render, addRipple]);

  useEffect(() => {
    initGrid();
    animate();

    const handleResize = () => initGrid();
    window.addEventListener("resize", handleResize);

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isVisibleRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only track if mouse is within section bounds (plus some padding)
      if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
      } else {
        mouseRef.current.x = -1;
        mouseRef.current.y = -1;
      }
    };

    const handleWindowClick = (e: MouseEvent) => {
      if (!containerRef.current || !isVisibleRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const col = Math.floor(x / CELL_WIDTH);
        const row = Math.floor(y / CELL_HEIGHT);
        addRipple(col, row, paramsRef.current.clickStrength, 6);
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mousedown", handleWindowClick);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          animate();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mousedown", handleWindowClick);
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
    };
  }, [animate, initGrid, addRipple]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
    >
      <canvas 
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
}

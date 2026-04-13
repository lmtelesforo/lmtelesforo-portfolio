"use client";

import { forwardRef, useImperativeHandle, useEffect, useState } from "react";

export type CardVariant = "dark" | "light";

interface CardTemplateProps {
  userName: string;
  variant: CardVariant;
  onTextureReady: (dataUrl: string) => void;
  city?: string;
  date?: string;
  avatarUrl?: string;
}

export interface CardTemplateRef {
  captureTexture: () => Promise<void>;
  exportCard: () => void;
}

const CANVAS_SIZE = 1376;

const CardTemplate = forwardRef<CardTemplateRef, CardTemplateProps>(
  ({ userName, variant, onTextureReady, city, date, avatarUrl }, ref) => {
    const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null);
    const [avatarImage, setAvatarImage] = useState<HTMLImageElement | null>(null);

    const imageSrc = variant === "dark" ? "/card-base-dark.png" : "/card-base-light.png";
    const textColor = variant === "dark" ? "#ffffff" : "#000000";

    const loadImage = (url: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image at ${url}`));
        img.src = url;
      });
    };

    const captureTexture = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) return;

      try {
        // Load images on the fly to ensure they are available
        const [baseImg, avatarImg] = await Promise.all([
          loadImage(imageSrc),
          avatarUrl ? loadImage(avatarUrl) : Promise.resolve(null)
        ]);

        // 1. Draw avatar image if available (FULL SPACE COVER)
        if (avatarImg) {
          const canvasAspect = 1;
          const imageAspect = avatarImg.width / avatarImg.height;
          let drawWidth, drawHeight, offsetX, offsetY;

          if (imageAspect > canvasAspect) {
            drawHeight = CANVAS_SIZE;
            drawWidth = CANVAS_SIZE * imageAspect;
            offsetX = (CANVAS_SIZE - drawWidth) / 2;
            offsetY = 0;
          } else {
            drawWidth = CANVAS_SIZE;
            drawHeight = CANVAS_SIZE / imageAspect;
            offsetX = 0;
            offsetY = (CANVAS_SIZE - drawHeight) / 2;
          }
          
          ctx.drawImage(avatarImg, offsetX, offsetY, drawWidth, drawHeight);
        } else {
          // Fallback if no avatar
          ctx.fillStyle = variant === "dark" ? "#030303" : "#F5ECF1";
          ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
        
        // 2. Overlay base card UI (logos, lines)
        // Note: Using globalAlpha or composite modes can allow the photo to peek through
        ctx.save();
        ctx.globalAlpha = 0.4; // Let the photo be the primary focus while keeping branding lines
        ctx.drawImage(baseImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.restore();

        // Draw user name
        const displayName = userName || "YOUR NAME";
        ctx.fillStyle = textColor;
        ctx.font = 'normal 48px "Geist Mono", monospace';
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        
        const textX = (CANVAS_SIZE / 2) - 55;
        const textY = CANVAS_SIZE - 400;
        ctx.fillText(displayName.toUpperCase(), textX, textY);

        // Render city label
        if (city) {
          ctx.fillStyle = textColor;
          ctx.font = 'normal 48px "Geist Mono", monospace';
          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          const cityTextX = (CANVAS_SIZE / 2) - 55;
          const cityTextY = CANVAS_SIZE - 1226;
          ctx.fillText(city.toUpperCase(), cityTextX, cityTextY);
        }

        // Render date label
        if (date) {
          ctx.fillStyle = "#878787";
          ctx.font = 'normal 48px "Geist Mono", monospace';
          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          const dateTextX = (CANVAS_SIZE / 2) - 55;
          const dateTextY = CANVAS_SIZE - 1170;
          ctx.fillText(date.toUpperCase(), dateTextX, dateTextY);
        }

        const dataUrl = canvas.toDataURL("image/png");
        onTextureReady(dataUrl);
      } catch (error) {
        console.error("Error capturing texture:", error);
      }
    };

    const exportCard = async () => {
      const CROP_BOTTOM = 334;
      const EXPORT_HEIGHT = CANVAS_SIZE - CROP_BOTTOM;

      // First, create a full-size canvas to draw the complete card
      const fullCanvas = document.createElement("canvas");
      fullCanvas.width = CANVAS_SIZE;
      fullCanvas.height = CANVAS_SIZE;
      const fullCtx = fullCanvas.getContext("2d");
      
      if (!fullCtx) return;

      // 1. Draw avatar image if available for export (FULL SPACE COVER)
      if (avatarImage) {
        const canvasAspect = 1;
        const imageAspect = avatarImage.width / avatarImage.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (imageAspect > canvasAspect) {
          drawHeight = CANVAS_SIZE;
          drawWidth = CANVAS_SIZE * imageAspect;
          offsetX = (CANVAS_SIZE - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = CANVAS_SIZE;
          drawHeight = CANVAS_SIZE / imageAspect;
          offsetX = 0;
          offsetY = (CANVAS_SIZE - drawHeight) / 2;
        }
        
        fullCtx.drawImage(avatarImage, offsetX, offsetY, drawWidth, drawHeight);
      } else {
        // Fallback black background if image not loaded
        fullCtx.fillStyle = variant === "dark" ? "#030303" : "#F5ECF1";
        fullCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      }

      // 2. Overlay base card UI (logos, lines)
      if (baseImage) {
        fullCtx.save();
        fullCtx.globalAlpha = 0.4;
        fullCtx.drawImage(baseImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
        fullCtx.restore();
      }

      // Draw user name at the bottom left area (below the geometric pattern)
      const displayName = userName || "YOUR NAME";
      fullCtx.fillStyle = textColor;
      fullCtx.font = 'normal 48px "Geist Mono", monospace';
      fullCtx.textAlign = "right";
      fullCtx.textBaseline = "middle";
      
      const textX = (CANVAS_SIZE / 2) - 55;
      const textY = CANVAS_SIZE - 400;
      fullCtx.fillText(displayName.toUpperCase(), textX, textY);

      // Render city label
      if (city) {
        const cityRender = fullCanvas.getContext("2d");

        if (!cityRender) return;

        cityRender.fillStyle = textColor;
        cityRender.font = 'normal 48px "Geist Mono", monospace';
        cityRender.textAlign = "right";
        cityRender.textBaseline = "middle";

        const cityTextX = (CANVAS_SIZE / 2) - 55;
        const cityTextY = CANVAS_SIZE - 1226;
        cityRender.fillText(city.toUpperCase(), cityTextX, cityTextY);
      }

      // Render date label
      if (date) {
        const dateRender = fullCanvas.getContext("2d");

        if (!dateRender) return;

        dateRender.fillStyle = '#878787';
        dateRender.font = 'normal 48px "Geist Mono", monospace';
        dateRender.textAlign = "right";
        dateRender.textBaseline = "middle";

        const dateTextX = (CANVAS_SIZE / 2) - 55;
        const dateTextY = CANVAS_SIZE - 1170;
        dateRender.fillText(date.toUpperCase(), dateTextX, dateTextY);
      }

      // Create cropped export canvas (excludes bottom 334px)
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = CANVAS_SIZE;
      exportCanvas.height = EXPORT_HEIGHT;
      const exportCtx = exportCanvas.getContext("2d");

      if (!exportCtx) return;

      // Copy the top portion of the full canvas to the export canvas
      exportCtx.drawImage(
        fullCanvas,
        0, 0, CANVAS_SIZE, EXPORT_HEIGHT, // Source: top portion
        0, 0, CANVAS_SIZE, EXPORT_HEIGHT  // Destination: same size
      );

      // Export at full resolution
      const dataUrl = exportCanvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `v0-guadalajara-${userName || "card"}.png`;
      link.href = dataUrl;
      link.click();
    };

    useImperativeHandle(ref, () => ({
      captureTexture,
      exportCard,
    }));

    // This component doesn't render anything visible
    return null;
  }
);

CardTemplate.displayName = "CardTemplate";

export default CardTemplate;

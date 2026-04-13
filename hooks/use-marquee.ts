import { useEffect, useRef } from 'react';

export function useMarquee(speed = 0.5, reverse = false) {
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const track = trackRef.current;
    if (!shell || !track) return;

    let isDown = false;
    let startX = 0;
    let currentTranslate: number | null = null;
    let previousTranslate = 0;
    let animationFrame: number | null = null;
    let autoScroll = true;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let momentumFrame: number | null = null;
    let hasDragged = false;
    const direction = reverse ? 1 : -1;

    function getLoopWidth() {
      return track ? track.scrollWidth / 2 : 0;
    }

    function initTranslateIfNeeded() {
      if (currentTranslate === null && track && track.scrollWidth > 0) {
        currentTranslate = reverse ? -(track.scrollWidth / 2) : 0;
        previousTranslate = currentTranslate;
      }
    }

    function normalizeLoop() {
      const loopWidth = getLoopWidth();
      if (!loopWidth || currentTranslate === null) return;
      
      if (currentTranslate < -loopWidth) currentTranslate += loopWidth;
      if (currentTranslate > 0) currentTranslate -= loopWidth;
      previousTranslate = currentTranslate;
    }

    function setTrackPosition() {
      if (currentTranslate !== null && track) {
        track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
      }
    }

    function stopMomentum() {
      if (momentumFrame) {
        cancelAnimationFrame(momentumFrame);
        momentumFrame = null;
      }
    }

    function autoMove() {
      initTranslateIfNeeded();
      if (currentTranslate !== null && autoScroll && !isDown) {
        currentTranslate += speed * direction;
        normalizeLoop();
        setTrackPosition();
      }
      animationFrame = requestAnimationFrame(autoMove);
    }

    function startMomentum() {
      stopMomentum();
      function step() {
        if (Math.abs(velocity) < 0.08) {
          velocity = 0;
          previousTranslate = currentTranslate || 0;
          setTimeout(() => { autoScroll = true; }, 500);
          return;
        }
        if (currentTranslate !== null) {
          currentTranslate += velocity;
          velocity *= 0.97;
          normalizeLoop();
          setTrackPosition();
          momentumFrame = requestAnimationFrame(step);
        }
      }
      momentumFrame = requestAnimationFrame(step);
    }

    function dragStart(x: number) {
      initTranslateIfNeeded();
      if (currentTranslate === null) return;
      isDown = true;
      autoScroll = false;
      hasDragged = false;
      startX = x;
      lastX = x;
      lastTime = performance.now();
      velocity = 0;
      stopMomentum();
      shell?.classList.add('cursor-grabbing');
    }

    function dragMove(x: number) {
      if (!isDown || currentTranslate === null) return;
      const now = performance.now();
      const delta = x - startX;
      const frameDelta = x - lastX;
      const dt = Math.max(now - lastTime, 1);

      if (Math.abs(delta) > 5) hasDragged = true;

      velocity = (frameDelta / dt) * 0.35;
      currentTranslate = previousTranslate + (delta * 0.08); // Reduced multiplier for smoother drag behavior
      normalizeLoop();
      setTrackPosition();

      lastX = x;
      lastTime = now;
    }

    function dragEnd() {
      if (!isDown) return;
      isDown = false;
      previousTranslate = currentTranslate || 0;
      shell?.classList.remove('cursor-grabbing');
      startMomentum();
    }

    const handleClick = (e: MouseEvent) => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    shell.addEventListener('click', handleClick, { capture: true });
    
    const handleMouseDown = (e: MouseEvent) => dragStart(e.pageX);
    const handleMouseMove = (e: MouseEvent) => dragMove(e.pageX);
    const handleMouseUp = () => dragEnd();
    const handleMouseLeave = () => dragEnd();
    
    const handleTouchStart = (e: TouchEvent) => dragStart(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => dragMove(e.touches[0].clientX);
    const handleTouchEnd = () => dragEnd();

    shell.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    shell.addEventListener('mouseleave', handleMouseLeave);
    
    shell.addEventListener('touchstart', handleTouchStart, { passive: true });
    shell.addEventListener('touchmove', handleTouchMove, { passive: true });
    shell.addEventListener('touchend', handleTouchEnd, { passive: true });

    autoMove();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      stopMomentum();
      shell.removeEventListener('click', handleClick as any, { capture: true });
      shell.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      shell.removeEventListener('mouseleave', handleMouseLeave);
      shell.removeEventListener('touchstart', handleTouchStart);
      shell.removeEventListener('touchmove', handleTouchMove);
      shell.removeEventListener('touchend', handleTouchEnd);
    };
  }, [speed, reverse]);

  return { shellRef, trackRef };
}

"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

/**
 * SmoothScroll Provider using Lenis
 * This provides the "momentum" / "inertial" scrolling feel.
 * 
 * To use: 
 * 1. Run: npm install lenis
 * 2. Wrap your RootLayout children with this component.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.5, 
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    }}>
      {children}
    </ReactLenis>
  );
}

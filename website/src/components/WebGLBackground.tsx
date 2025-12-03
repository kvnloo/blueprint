import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion, useLocalStorage } from '../hooks';

/**
 * WebGLBackground - Unicorn Studio WebGL background integration.
 * Features:
 * - Lazy loading after critical content paints (requestIdleCallback)
 * - Fallback to CSS grid if WebGL not supported
 * - Respects prefers-reduced-motion
 * - User can pause via BackgroundControls
 */

interface UnicornStudio {
  isInitialized: boolean;
  init: () => void;
  destroy?: () => void;
}

declare global {
  interface Window {
    UnicornStudio?: UnicornStudio;
  }
}

const UNICORN_STUDIO_PROJECT_ID = 'ILgOO23w4wEyPQOKyLO4';
const UNICORN_STUDIO_CDN = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';

export const WebGLBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const [animationsEnabled] = useLocalStorage('bg-animations-enabled', true);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Load Unicorn Studio script
  useEffect(() => {
    // Don't load if reduced motion is preferred or animations are disabled
    if (prefersReducedMotion || !animationsEnabled || !hasWebGL) {
      return;
    }

    const loadUnicornStudio = () => {
      if (window.UnicornStudio?.isInitialized) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = UNICORN_STUDIO_CDN;
      script.async = true;
      script.defer = true;
      // Note: SRI hash should be generated and added here in production
      // script.integrity = 'sha384-[GENERATED_HASH]';
      script.crossOrigin = 'anonymous';

      script.onload = () => {
        if (!window.UnicornStudio) {
          window.UnicornStudio = { isInitialized: false, init: () => {} };
        }
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
        setIsLoaded(true);
      };

      script.onerror = () => {
        console.warn('Failed to load Unicorn Studio, falling back to CSS background');
        setHasWebGL(false);
      };

      document.body.appendChild(script);
    };

    // Use requestIdleCallback for lazy loading, with fallback for Safari
    if ('requestIdleCallback' in window) {
      (window as Window & typeof globalThis & { requestIdleCallback: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number }).requestIdleCallback(loadUnicornStudio, { timeout: 2000 });
    } else {
      setTimeout(loadUnicornStudio, 2000);
    }

    return () => {
      // Cleanup on unmount
      if (window.UnicornStudio?.destroy) {
        window.UnicornStudio.destroy();
      }
    };
  }, [prefersReducedMotion, animationsEnabled, hasWebGL]);

  // If reduced motion or no WebGL support, return null (fallback handled by parent)
  if (prefersReducedMotion || !animationsEnabled || !hasWebGL) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      data-us-project={UNICORN_STUDIO_PROJECT_ID}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}
      aria-hidden="true"
    />
  );
};

export default WebGLBackground;

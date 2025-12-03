import React, { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion, useLocalStorage, useMediaQuery } from '../hooks';

/**
 * WebGLBackground - Native WebGL wisps animation.
 *
 * Recreates the Unicorn Studio animation with:
 * - Voronoi additive pattern with extreme Y-stretch (0.96)
 * - Two-pass rendering at scales 20.52 and 25.92
 * - Purple/pink gradient color mapping
 * - Shimmer effect per cell
 * - Vignette post-processing
 *
 * Features:
 * - Native WebGL2 (no external dependencies)
 * - Respects prefers-reduced-motion
 * - User can pause via BackgroundControls
 * - Mobile performance optimization (0.5x resolution)
 */

// Vertex shader - simple fullscreen quad
const VERTEX_SHADER = `#version 300 es
in vec4 a_position;
void main() {
  gl_Position = a_position;
}`;

// Fragment shader - wisps matching exact Aura/Unicorn Studio parameters
const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
out vec4 fragColor;

const float PI = 3.14159265359;

// Hash function for Voronoi (exact match to original)
vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// Rotation matrix
mat2 rot(float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a));
}

// Gradient color mapping (orange/amber - matching hero section theme)
vec3 gradientColor(float luma) {
  vec3 c0 = vec3(0.0, 0.0, 0.0);           // Black
  vec3 c1 = vec3(0.2, 0.08, 0.02);         // Dark orange/brown
  vec3 c2 = vec3(0.6, 0.25, 0.05);         // Deep orange
  vec3 c3 = vec3(0.95, 0.5, 0.1);          // Bright orange
  vec3 c4 = vec3(1.0, 0.9, 0.7);           // Warm white/cream

  float s0 = 0.0;
  float s1 = 0.15;
  float s2 = 0.4;
  float s3 = 0.7;
  float s4 = 1.0;

  if (luma <= s1) {
    return mix(c0, c1, (luma - s0) / (s1 - s0));
  } else if (luma <= s2) {
    return mix(c1, c2, (luma - s1) / (s2 - s1));
  } else if (luma <= s3) {
    return mix(c2, c3, (luma - s2) / (s3 - s2));
  } else {
    return mix(c3, c4, (luma - s3) / (s4 - s3));
  }
}

// Voronoi additive pattern - EXACT match to Aura original
float voronoi_additive(vec2 st, float radius) {
  vec2 i_st = floor(st);
  float total_contribution = 0.0;

  // 5x5 neighborhood search (exact match)
  for (int y = -2; y <= 2; y++) {
    for (int x = -2; x <= 2; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 cell_id = i_st + neighbor;
      vec2 point = hash(cell_id);

      // Static point positions - wander = 0 in original
      point = 0.5 + 0.5 * sin(5.0 + 6.2831 * point);

      vec2 starAbsPos = cell_id + point;
      vec2 diff = starAbsPos - st;
      float dist = length(diff);

      // Inverse distance glow (original formula)
      float contribution = radius / max(dist, radius * 0.1);

      // Shimmer effect
      float shimmer_phase = dot(point, vec2(1.0)) * 10.0 + hash(cell_id).x * 5.0 + uTime * 0.5;
      float shimmer = mix(1.0, (sin(shimmer_phase) + 1.0), 1.0);
      contribution *= shimmer;

      // Blend formula
      total_contribution += mix(contribution * contribution, contribution * 2.0, 0.6);
    }
  }
  return total_contribution;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 aspectRatio = vec2(uResolution.x / uResolution.y, 1.0);

  // Center and apply aspect ratio
  vec2 st = uv - vec2(0.5, 0.5);
  st *= aspectRatio;

  // Rotation: 0.3194 * 2 * PI (~115 degrees) - exact from original
  st = st * rot(0.3194 * 2.0 * PI);

  // Scale: 40.0 * 0.54 = 21.6 - exact from original
  st *= 40.0 * 0.54;

  // Y-stretch: mix(vec2(1.0), vec2(1.0, 0.0), 0.96) - exact from original
  // This creates the vertical wisp effect
  st *= mix(vec2(1.0), vec2(1.0, 0.0), 0.96);

  // Restore aspect ratio
  st /= aspectRatio;

  // Movement: vertical only, speed increased 6x for much faster animation
  vec2 movementOffset = vec2(0.0, uTime * 4.5 * -0.05);

  // Two passes at different scales (exact from original)
  // Pass 1: scale 38 * 0.54 = 20.52
  // Pass 2: scale 48 * 0.54 = 25.92
  vec2 st1 = st;
  vec2 st2 = st;

  vec2 mouse1 = st1 + movementOffset;
  vec2 mouse2 = st2 + movementOffset;

  // Radius: 0.5 * 0.09 = 0.045 (exact from original)
  float radius = 0.5 * 0.09;

  // Two-pass voronoi with exact scale ratios
  float pass1 = voronoi_additive(mouse1 * aspectRatio * (38.0/40.0), radius);
  float pass2 = voronoi_additive(mouse2 * aspectRatio * (48.0/40.0) + vec2(10.0), radius);

  // Exact intensity multipliers from original
  pass1 *= 0.02;
  pass2 *= 0.04;

  // Combine passes
  float brightness = pass1 + pass2;
  brightness = clamp(brightness, 0.0, 1.0);

  // Apply gradient color mapping
  vec3 color = gradientColor(brightness);

  // Progressive blur from top - wisps fade/shrink toward top of screen
  float blurGradient = smoothstep(0.0, 0.6, uv.y);
  brightness *= mix(1.0, 0.3, blurGradient * blurGradient);

  // Re-apply color after blur adjustment
  color = gradientColor(brightness);

  // Vignette effect (matching original position and radius)
  vec2 vignettePos = vec2(0.49, 0.73);
  float vignetteRadius = 0.622;
  float vignetteDist = distance(uv * vec2(aspectRatio.x, 1.0), vignettePos * vec2(aspectRatio.x, 1.0));
  float vignette = 1.0 - smoothstep(vignetteRadius * 0.5, vignetteRadius, vignetteDist);
  color *= vignette;

  // Dark overlay for readability + wisps visible on top
  vec3 darkBase = vec3(0.0, 0.0, 0.0);
  vec3 finalColor = darkBase + color;
  fragColor = vec4(finalColor, 0.9);
}`;

// Create and compile shader
function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Create program from shaders
function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export const WebGLBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const startTimeRef = useRef<number>(0);

  const prefersReducedMotion = useReducedMotion();
  const [animationsEnabled] = useLocalStorage('bg-animations-enabled', true);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Resolution scale factor for performance
  const resolutionScale = isMobile ? 0.5 : 1.0;

  const render = useCallback((time: number) => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;

    if (!gl || !program || !canvas) return;

    // Update time uniform
    const timeLocation = gl.getUniformLocation(program, 'uTime');
    gl.uniform1f(timeLocation, (time - startTimeRef.current) * 0.001);

    // Draw
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(render);
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    const program = programRef.current;

    if (!canvas || !gl || !program) return;

    // Set canvas size with resolution scaling
    const width = Math.floor(window.innerWidth * resolutionScale);
    const height = Math.floor(window.innerHeight * resolutionScale);

    canvas.width = width;
    canvas.height = height;

    gl.viewport(0, 0, width, height);

    // Update resolution uniform
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution');
    gl.uniform2f(resolutionLocation, width, height);
  }, [resolutionScale]);

  useEffect(() => {
    // Don't initialize if reduced motion or animations disabled
    if (prefersReducedMotion || !animationsEnabled) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL2 with alpha for transparency
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.warn('WebGL2 not supported, falling back to CSS background');
      return;
    }

    glRef.current = gl;

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      console.error('Failed to create shaders');
      return;
    }

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      console.error('Failed to create program');
      return;
    }

    programRef.current = program;
    gl.useProgram(program);

    // Create fullscreen quad
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Initial resize
    handleResize();

    // Start animation
    startTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(render);

    // Handle resize
    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);

      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, [prefersReducedMotion, animationsEnabled, handleResize, render]);

  // Don't render if reduced motion or animations disabled
  if (prefersReducedMotion || !animationsEnabled) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{
        imageRendering: isMobile ? 'auto' : 'auto',
      }}
      aria-hidden="true"
    />
  );
};

export default WebGLBackground;

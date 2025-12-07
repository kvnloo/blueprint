import{r as s,u as b,a as A,b as x,j as T}from"./index-C86ivZEY.js";const _=`#version 300 es
in vec4 a_position;
void main() {
  gl_Position = a_position;
}`,y=`#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
out vec4 fragColor;

const float PI = 3.14159265359;

// Hash function for Voronoi
vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// Rotation matrix
mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
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

// Voronoi additive pattern - creates individual "stars" that glow
float voronoi_additive(vec2 st, float radius, float time) {
  vec2 i_st = floor(st);
  float total = 0.0;

  // 5x5 neighborhood search
  for (int y = -2; y <= 2; y++) {
    for (int x = -2; x <= 2; x++) {
      vec2 cell_id = i_st + vec2(float(x), float(y));
      vec2 point = hash(cell_id);

      // Static point positions (no wandering as per original)
      point = 0.5 + 0.5 * sin(5.0 + 6.2831 * point);

      vec2 starPos = cell_id + point;
      float dist = length(starPos - st);

      // Inverse distance for glow effect - smaller radius = tighter glow
      float contribution = radius / max(dist, radius * 0.1);

      // Fast shimmer effect (creates twinkling)
      float shimmer_phase = dot(point, vec2(1.0)) * 10.0 + hash(cell_id).x * 5.0 + time * 2.0;
      float shimmer = (sin(shimmer_phase) + 1.0) * 0.5 + 0.5;
      contribution *= shimmer;

      // Blend squared and linear
      total += mix(contribution * contribution, contribution * 2.0, 0.6);
    }
  }
  return total;
}

// Sample with motion blur trail (creates comet effect) - clean trails
float sampleWithTrail(vec2 uv, vec2 aspect, float time, float trailLength) {
  float total = 0.0;
  const int TRAIL_SAMPLES = 6;

  // Trail direction: UP and to the LEFT (opposite of movement = down-right)
  vec2 trailDir = vec2(-0.3, 1.0);

  for (int i = 0; i < TRAIL_SAMPLES; i++) {
    float t = float(i) / float(TRAIL_SAMPLES - 1);
    float weight = 1.0 - t * 0.85; // Fade along trail

    // Clean straight trail
    vec2 trailOffset = trailDir * t * trailLength;
    vec2 sampleUV = uv + trailOffset;

    // Two-pass voronoi at different scales
    float pass1 = voronoi_additive(sampleUV * aspect * 0.95, 0.035, time);
    float pass2 = voronoi_additive(sampleUV * aspect * 1.2 + vec2(10.0), 0.035, time);

    float brightness = pass1 * 0.015 + pass2 * 0.025;
    total += brightness * weight;
  }

  return total / float(TRAIL_SAMPLES) * 2.0;
}

// Wind/Stretch post-processing distortion (from Unicorn Studio Layer 4 "stretch")
// This distorts UV coordinates to create wind-swept appearance
vec2 applyWindStretch(vec2 uv, vec2 aspect, float time) {
  // Stretch center position (slightly above center)
  vec2 stretchCenter = vec2(0.5, 0.48);

  // Wind angle - animated slowly over time for gentle swaying
  // Base angle ~-270 degrees with subtle time-based variation
  float baseAngle = (0.75 - 0.25) * -2.0 * PI;  // ~-270 degrees
  float windSway = sin(time * 0.15) * 0.1;       // Gentle swaying
  float angle = baseAngle + windSway;

  // Stretch amounts (from extracted shader, scaled down for subtlety)
  float stretchX = 0.08;   // Horizontal stretch intensity
  float stretchY = 0.4;    // Vertical stretch intensity (stronger = more wind streaks)

  // Get direction from center
  vec2 dir = uv - stretchCenter;
  dir.x *= aspect.x;  // Correct for aspect ratio

  // Rotate to align with wind direction
  vec2 rotDir = dir * rot(angle);

  // Only stretch on the "downwind" side (positive x after rotation)
  // This creates the one-directional wind sweep effect
  float stretchMask = smoothstep(-0.1, 0.3, rotDir.x);

  // Exponential falloff from center for natural wind feel
  float distFromCenter = length(dir);
  float falloff = 1.0 - exp(-distFromCenter * 3.0);
  falloff *= falloff;  // Quadratic falloff for softer edges

  // Calculate stretch offset
  vec2 stretchOffset = vec2(0.0);
  if (stretchMask > 0.0) {
    // Stretch in the wind direction
    vec2 windDir = vec2(cos(angle), sin(angle));
    float stretchAmount = stretchMask * falloff * (stretchX + stretchY * abs(rotDir.y));
    stretchOffset = windDir * stretchAmount * 0.05;
  }

  return uv + stretchOffset;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

  // Apply wind stretch distortion to UV (post-process style)
  vec2 windUV = applyWindStretch(uv, aspect, uTime);

  // Center UV for wisps calculation
  vec2 centered = windUV - 0.5;
  centered *= aspect;

  // Rotation (115.4 degrees)
  centered = centered * rot(0.3194 * 2.0 * PI);

  // Base scale
  centered *= 18.0;

  // Y-stretch (creates vertical wisps)
  centered.y *= 0.06;

  // Restore aspect
  centered /= aspect;

  // Movement direction: DOWN and to the RIGHT
  float moveSpeed = 0.25;
  vec2 movement = vec2(uTime * moveSpeed * 0.3, -uTime * moveSpeed);

  vec2 animatedUV = centered + movement;

  // Sample with motion trail for comet effect
  float brightness = sampleWithTrail(animatedUV, aspect, uTime, 0.15);
  brightness = clamp(brightness, 0.0, 1.0);

  // Apply gradient color mapping
  vec3 color = gradientColor(brightness);

  // Vignette effect
  vec2 vignetteCenter = vec2(0.5, 0.6);
  float vignetteRadius = 0.7;
  float vignette = 1.0 - smoothstep(vignetteRadius * 0.4, vignetteRadius, length((uv - vignetteCenter) * vec2(aspect.x * 0.8, 1.0)));
  color *= vignette;

  // Add subtle glow bloom
  color += color * color * 0.3;

  fragColor = vec4(color, 1.0);
}`;function R(t,c,l){const r=t.createShader(c);return r?(t.shaderSource(r,l),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("Shader compile error:",t.getShaderInfoLog(r)),t.deleteShader(r),null)):null}function L(t,c,l){const r=t.createProgram();return r?(t.attachShader(r,c),t.attachShader(r,l),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)?r:(console.error("Program link error:",t.getProgramInfoLog(r)),t.deleteProgram(r),null)):null}const P=()=>{const t=s.useRef(null),c=s.useRef(0),l=s.useRef(null),r=s.useRef(null),p=s.useRef(0),d=b(),[u]=A("bg-animations-enabled",!0),g=x("(max-width: 768px)"),m=g?.5:1,h=s.useCallback(i=>{const e=l.current,a=r.current,n=t.current;if(!e||!a||!n)return;const o=e.getUniformLocation(a,"uTime");e.uniform1f(o,(i-p.current)*.001),e.drawArrays(e.TRIANGLE_STRIP,0,4),c.current=requestAnimationFrame(h)},[]),f=s.useCallback(()=>{const i=t.current,e=l.current,a=r.current;if(!i||!e||!a)return;const n=Math.floor(window.innerWidth*m),o=Math.floor(window.innerHeight*m);i.width=n,i.height=o,e.viewport(0,0,n,o);const v=e.getUniformLocation(a,"uResolution");e.uniform2f(v,n,o)},[m]);return s.useEffect(()=>{if(d||!u)return;const i=t.current;if(!i)return;const e=i.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1});if(!e){console.warn("WebGL2 not supported, falling back to CSS background");return}l.current=e;const a=R(e,e.VERTEX_SHADER,_),n=R(e,e.FRAGMENT_SHADER,y);if(!a||!n){console.error("Failed to create shaders");return}const o=L(e,a,n);if(!o){console.error("Failed to create program");return}r.current=o,e.useProgram(o);const v=new Float32Array([-1,-1,1,-1,-1,1,1,1]),w=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,w),e.bufferData(e.ARRAY_BUFFER,v,e.STATIC_DRAW);const S=e.getAttribLocation(o,"a_position");return e.enableVertexAttribArray(S),e.vertexAttribPointer(S,2,e.FLOAT,!1,0,0),f(),p.current=performance.now(),c.current=requestAnimationFrame(h),window.addEventListener("resize",f),()=>{cancelAnimationFrame(c.current),window.removeEventListener("resize",f),e&&(e.deleteProgram(o),e.deleteShader(a),e.deleteShader(n),e.deleteBuffer(w))}},[d,u,f,h]),d||!u?null:T.jsx("canvas",{ref:t,className:"fixed inset-0 w-full h-full -z-10 pointer-events-none",style:{imageRendering:"auto"},"aria-hidden":"true"})};export{P as WebGLBackground,P as default};

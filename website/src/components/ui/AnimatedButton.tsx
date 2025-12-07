import React, { memo, useState, ButtonHTMLAttributes, ReactNode } from 'react';
import { useReducedMotion, useMediaQuery } from '../../hooks';

// Particle configuration - positions and timing for floating particles
const PARTICLE_CONFIG = [
  { left: '10%', duration: 2.35, delay: 0.2 },
  { left: '30%', duration: 2.5, delay: 0.5 },
  { left: '25%', duration: 2.2, delay: 0.1 },
  { left: '44%', duration: 2.05, delay: 0 },
  { left: '50%', duration: 1.9, delay: 0 },
  { left: '75%', duration: 1.5, delay: 1.5 },
  { left: '88%', duration: 2.2, delay: 0.2 }
] as const;

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showParticles?: boolean;
}

/**
 * AnimatedButton - Button component with floating particle animation.
 * Particles appear on hover/focus and float upward.
 * Respects prefers-reduced-motion and reduces particles on mobile.
 */
export const AnimatedButton = memo<AnimatedButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  showParticles: enableParticles = true,
  className = '',
  ...props
}) => {
  const [showParticles, setShowParticles] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Reduce particle count on mobile for performance
  const particleCount = isMobile ? 3 : 7;

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
    ghost: 'bg-transparent text-teal-400 hover:text-teal-300 hover:bg-teal-500/10'
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion && enableParticles) {
      setShowParticles(true);
    }
  };

  const handleMouseLeave = () => {
    setShowParticles(false);
  };

  const handleFocus = () => {
    if (!prefersReducedMotion && enableParticles) {
      setShowParticles(true);
    }
  };

  const handleBlur = () => {
    setShowParticles(false);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`
        relative overflow-hidden rounded-full font-medium transition-all duration-300
        min-h-[44px] min-w-[44px]
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      style={{ contain: 'layout style paint' }}
      {...props}
    >
      {/* Floating particles - only render when active */}
      {showParticles && !prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLE_CONFIG.slice(0, particleCount).map((config, i) => (
            <span
              key={i}
              className="absolute bottom-[-10px] w-[2px] h-[2px] bg-white rounded-full animate-floating-point"
              style={{
                left: config.left,
                animationDuration: `${config.duration}s`,
                animationDelay: `${config.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;

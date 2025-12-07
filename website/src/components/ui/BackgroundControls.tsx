import React from 'react';
import { useLocalStorage } from '../../hooks';

/**
 * BackgroundControls - Pause/Play control for background animations.
 * Accessibility feature allowing users to stop all background motion.
 * State persists in localStorage.
 */
export const BackgroundControls: React.FC = () => {
  const [enabled, setEnabled] = useLocalStorage('bg-animations-enabled', true);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="fixed bottom-4 right-4 z-50 p-3 bg-gray-900/80 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/20 transition-all duration-200 group"
      aria-label={enabled ? 'Pause background animations' : 'Play background animations'}
      title={enabled ? 'Pause animations' : 'Play animations'}
    >
      {enabled ? (
        // Pause icon
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        // Play icon
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
        </svg>
      )}
    </button>
  );
};

export default BackgroundControls;

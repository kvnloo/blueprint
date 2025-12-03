import React from 'react';

const BackgroundGrid = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto px-6 opacity-20">
        {/* Five columns */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent">
            {/* Random falling beams */}
            <div 
              className="absolute w-[2px] h-32 bg-gradient-to-b from-transparent via-teal-500 to-transparent animate-beam"
              style={{
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${5 + i}s`,
                left: '-0.5px'
              }}
            />
          </div>
        ))}
      </div>
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] h-32 top-0 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] h-32 bottom-0 z-10" />
    </div>
  );
};

export default BackgroundGrid;
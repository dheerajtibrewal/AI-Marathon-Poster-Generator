import React, { useEffect, useState } from 'react';

const TIPS = [
  "ANALYZING_FACIAL_STRUCTURE...",
  "APPLYING_MARATHON_PHYSICS...",
  "RENDERING_BANDRA_WORLI_SEA_LINK...",
  "OPTIMIZING_LIGHTING_CONDITIONS...",
  "GENERATING_HIGH_RES_TEXTURES..."
];

export const ProcessingScreen: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Rotate tips
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 2000);

    // Fake progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 2; // Random increment
      });
    }, 100);

    return () => {
      clearInterval(tipInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="flex flex-col h-[100dvh] bg-black text-white items-center justify-center p-6 relative overflow-hidden font-mono">
      {/* Background Matrix/Grid Effect */}
      <div className="absolute inset-0 z-0 opacity-20">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#800000_1px,transparent_1px),linear-gradient(to_bottom,#800000_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Sci-Fi Core Animation - Responsive Sizing */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 md:mb-12 flex items-center justify-center z-10">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-2 border-red-900 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-2 border border-red-800/50 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
        
        {/* Pulsing Energy Rings */}
        <div className="absolute w-36 h-36 md:w-48 md:h-48 border-4 border-t-yellow-500 border-r-transparent border-b-yellow-500 border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute w-28 h-28 md:w-40 md:h-40 border-2 border-red-500 rounded-full opacity-50 animate-pulse"></div>
        
        {/* Core */}
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-red-600 to-red-900 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.6)] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-yellow-400/20 animate-pulse"></div>
            <span className="text-2xl md:text-4xl font-bold tracking-tighter z-10 drop-shadow-lg">AI</span>
            
            {/* Scanning Line inside Core */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/30 to-transparent -translate-y-full animate-[shimmer_2s_infinite]"></div>
        </div>

        {/* Orbiting Particles */}
        <div className="absolute w-full h-full animate-[spin_3s_linear_infinite]">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,1)]"></div>
        </div>
      </div>

      {/* Text Content */}
      <div className="z-10 text-center max-w-md w-full px-4">
        <h2 className="text-lg md:text-xl font-bold mb-1 tracking-widest text-red-500 uppercase">Processing Image</h2>
        
        {/* Typing/Glitch Effect for Tips */}
        <div className="h-12 md:h-8 mb-4 md:mb-6 flex items-center justify-center">
            <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-wider animate-pulse break-words max-w-xs md:max-w-full">
            {">"} {TIPS[tipIndex]}
            </p>
        </div>

        {/* High Tech Progress Bar */}
        <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-700 relative">
            <div 
                className="h-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 transition-all duration-100 ease-out relative"
                style={{ width: `${progress}%` }}
            >
                <div className="absolute right-0 top-0 h-full w-2 bg-white/50 shadow-[0_0_10px_white]"></div>
            </div>
        </div>
        <div className="flex justify-between text-[10px] md:text-xs text-gray-500 mt-2 font-sans">
            <span>SYSTEM_READY</span>
            <span>{Math.floor(progress)}%</span>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};
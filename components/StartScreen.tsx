import React, { useState } from 'react';
import { Play, Activity, ChevronDown, Sparkles } from 'lucide-react';
import { STYLES, StyleKey } from '../services/geminiService';

interface StartScreenProps {
  onStart: (selectedStyle: string) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [selectedOption, setSelectedOption] = useState<string>('SURPRISE');

  const handleStartClick = () => {
    onStart(selectedOption);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-red-900 to-red-700 text-white relative overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="white" />
         </svg>
      </div>

      {/* Header */}
      <div className="z-10 w-full p-4 md:p-6 flex justify-between items-center bg-transparent">
        <div className="flex items-center space-x-2">
           <div className="font-bold text-xl md:text-2xl tracking-tight text-shadow">Marathon AI</div>
        </div>
        <div className="text-xs md:text-sm font-semibold opacity-80 uppercase tracking-widest hidden sm:block">Poster Generator</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 z-10 flex flex-col items-center justify-center p-6 text-center w-full max-w-4xl mx-auto">
        <div className="mb-6 md:mb-10 p-4 bg-white/10 rounded-full backdrop-blur-sm animate-pulse shadow-xl">
            <Activity size={48} className="text-white md:w-16 md:h-16" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-xl leading-tight">
          Run the <br/> <span className="text-yellow-400">Dream</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-2xl text-gray-100 max-w-lg mb-8 md:mb-10 leading-relaxed px-4">
          See yourself crossing the finish line of a major marathon.
        </p>

        {/* Style Selection Dropdown */}
        <div className="relative mb-8 w-full max-w-xs md:max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-200">
                <Sparkles size={18} />
            </div>
            <select 
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="block w-full pl-10 pr-10 py-4 text-base md:text-lg border-2 border-white/20 bg-white/10 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-md appearance-none cursor-pointer transition-all hover:bg-white/20 font-medium"
            >
                <option value="SURPRISE" className="bg-red-900 text-white font-bold">🎲 &nbsp; Surprise Me!</option>
                {Object.entries(STYLES).map(([key, value]) => (
                    <option key={key} value={key} className="bg-red-900 text-gray-100">
                        ✨ &nbsp; {value.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-white">
                <ChevronDown size={20} />
            </div>
        </div>

        <button
          onClick={handleStartClick}
          className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white text-red-900 rounded-full text-lg md:text-xl font-bold shadow-2xl hover:bg-yellow-400 hover:text-red-950 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <span>Start Now</span>
          <Play size={24} className="fill-current" />
        </button>
      </div>

      {/* Footer */}
      <div className="z-10 p-4 md:p-6 text-center text-[10px] md:text-xs opacity-60">
        AI Poster Generator • 2026
      </div>
    </div>
  );
};
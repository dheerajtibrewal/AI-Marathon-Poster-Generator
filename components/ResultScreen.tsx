import React from 'react';
import { Download, RotateCcw, Share2, Check, Sparkles, ChevronRight } from 'lucide-react';

interface ResultScreenProps {
  imageSrc: string;
  onRestart: () => void;
  onRegenerate: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ imageSrc, onRestart, onRegenerate }) => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href)}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `marathon-ai-poster-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center relative overflow-x-hidden font-inter">
      
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#3a0506] to-black z-0 fixed"></div>
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none fixed">
          <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
      </div>
      
      {/* Header */}
      <div className="w-full p-4 md:p-6 flex justify-between items-center z-20 backdrop-blur-sm bg-black/20 sticky top-0 border-b border-white/5">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-red-900/50">AI</div>
            <div className="font-bold text-sm md:text-lg tracking-tight text-white hidden sm:block">Marathon Poster</div>
        </div>
        <button 
            onClick={onRestart} 
            className="group flex items-center gap-2 text-[10px] md:text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-2 md:px-4 md:py-2 rounded-full transition-all border border-white/10"
        >
          <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" /> 
          <span>START OVER</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="flex-1 w-full max-w-7xl p-4 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center z-10 mt-4 overflow-y-auto">
        
        {/* Left Column: Image Card */}
        <div className="w-full max-w-sm md:max-w-md lg:max-w-[400px] shrink-0">
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-2 md:p-3 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 relative group">
             
             {/* Glowing border effect */}
             <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-red-600 rounded-3xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
             
             <div className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-gray-900">
                 <img 
                    src={imageSrc} 
                    alt="Generated Marathon Runner" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                 
                 <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-yellow-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1">Marathon 2026</div>
                    <div className="text-white text-xl md:text-2xl font-bold leading-tight">#JourneyToTheStart</div>
                 </div>
             </div>
          </div>
        </div>

        {/* Right Column: Actions & Details */}
        <div className="w-full max-w-md lg:w-[450px] flex flex-col gap-6 lg:gap-8 pb-8">
           
           {/* Success Message */}
           <div className="text-center lg:text-left mt-2 lg:mt-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-tight">
                 You look <span className="text-yellow-400">Heroic!</span>
              </h1>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm mx-auto lg:mx-0">
                 Your customized marathon poster is ready. Share your spirit with the world.
              </p>
           </div>

           {/* Action Buttons */}
           <div className="flex flex-col gap-3 md:gap-4">
              <button 
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-red-700 to-brand-primary hover:from-red-600 hover:to-red-800 text-white py-4 px-6 rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-3 shadow-lg shadow-red-900/30 transition-all transform hover:scale-[1.02] active:scale-95 border border-red-500/30"
              >
                <Download size={20} md:size={22} /> Download Poster
              </button>
              
              <div className="flex gap-3">
                  <button 
                    onClick={onRegenerate}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 md:py-4 px-4 rounded-xl font-medium text-sm md:text-base flex items-center justify-center gap-2 border border-white/10 transition-colors"
                  >
                     <Sparkles size={16} md:size={18} className="text-yellow-400" /> Regenerate
                  </button>
                  <button 
                     onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: 'My Marathon AI Poster',
                                text: 'Check out my AI generated marathon poster!',
                                url: window.location.href,
                            }).catch(console.error);
                        } else {
                            alert("Sharing is not supported on this browser context.");
                        }
                     }}
                     className="flex-none bg-white/5 hover:bg-white/10 text-white py-3 md:py-4 px-5 rounded-xl border border-white/10 transition-colors"
                  >
                     <Share2 size={20} />
                  </button>
              </div>
           </div>

           <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"></div>

           {/* QR Section */}
           <div className="bg-gradient-to-b from-white/10 to-transparent p-4 md:p-6 rounded-2xl border border-white/10 flex items-center gap-4 md:gap-6">
               <div className="bg-white p-2 rounded-lg flex-none shadow-inner">
                   <img src={qrCodeUrl} alt="Scan QR" className="w-16 h-16 md:w-20 md:h-20 mix-blend-multiply" />
               </div>
               <div className="flex-1">
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">Scan to Mobile</h3>
                  <p className="text-[10px] md:text-xs text-gray-400 mb-2 md:mb-3">Get the high-quality image directly on your smartphone.</p>
                  <div className="flex items-center text-yellow-500 text-[10px] md:text-xs font-bold gap-1">
                      <span>INSTANT TRANSFER</span> <ChevronRight size={12} />
                  </div>
               </div>
           </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full p-4 md:p-6 text-center z-10 mt-auto bg-black/40 backdrop-blur-md border-t border-white/5">
        <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
           AI Poster Generator • 2026
        </p>
      </div>
    </div>
  );
};
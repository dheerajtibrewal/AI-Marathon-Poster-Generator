import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, AlertCircle, ArrowLeft, RotateCcw, Check, Sparkles, Upload } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onBack: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user', 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          aspectRatio: { ideal: 1.777 }
        },
        audio: false,
      });
      
      streamRef.current = mediaStream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError("Unable to access camera. Please allow permissions.");
      console.error(err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Only start camera if we don't have a captured image
    if (!capturedImage) {
      startCamera();
    }
    return () => stopCamera();
  }, [capturedImage, startCamera, stopCamera]);

  // Countdown Logic
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      performCapture();
      setCountdown(null);
    }
  }, [countdown]);

  const initiateCapture = () => {
    setCountdown(3);
  };

  const performCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        // Crop logic 9:16
        const videoW = video.videoWidth;
        const videoH = video.videoHeight;
        const videoAspect = videoW / videoH;
        const targetAspect = 9 / 16;

        let sourceX = 0;
        let sourceY = 0;
        let sourceW = videoW;
        let sourceH = videoH;

        if (videoAspect > targetAspect) {
          sourceH = videoH;
          sourceW = videoH * targetAspect;
          sourceX = (videoW - sourceW) / 2;
        } else {
          sourceW = videoW;
          sourceH = videoW / targetAspect;
          sourceY = (videoH - sourceH) / 2;
        }

        canvas.width = sourceW;
        canvas.height = sourceH;
        
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        
        context.drawImage(
          video, 
          sourceX, sourceY, sourceW, sourceH, 
          0, 0, canvas.width, canvas.height
        );
        
        const imageSrc = canvas.toDataURL('image/jpeg', 0.95);
        stopCamera();
        setCapturedImage(imageSrc);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCapturedImage(result);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-gradient-to-br from-red-900 to-red-700 text-white relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-10 right-0 w-64 h-64 bg-yellow-500 blur-[100px] rounded-full mix-blend-overlay animate-pulse"></div>
         <div className="absolute bottom-10 left-0 w-80 h-80 bg-red-500 blur-[80px] rounded-full mix-blend-multiply"></div>
      </div>

      {/* Header */}
      <div className="flex-none p-4 flex justify-between items-center z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors backdrop-blur-md">
          <ArrowLeft size={24} />
        </button>
        <span className="font-bold tracking-widest uppercase text-xs md:text-sm drop-shadow-md">
            {capturedImage ? "Review Photo" : "Selfie Camera"}
        </span>
        <div className="w-10"></div>
      </div>

      {/* Main Content Area - Responsive Flex */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 min-h-0">
        {error ? (
           <div className="text-center p-6 max-w-xs bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
             <AlertCircle className="mx-auto mb-4 text-red-300" size={48} />
             <p className="text-lg font-medium mb-2">Camera Error</p>
             <p className="text-sm text-gray-200 mb-4">{error}</p>
             <button onClick={startCamera} className="px-4 py-2 bg-white text-red-900 font-bold rounded-lg">Retry</button>
           </div>
        ) : (
          /* Container for the 9:16 Frame */
          /* max-h-[75vh] ensures it fits vertically even on landscape mobile */
          <div className="relative h-full max-h-[75vh] aspect-[9/16] bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 ring-1 ring-black/50 mx-auto">
            
            {capturedImage ? (
                <img src={capturedImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform scale-x-[-1]"
                />
            )}
            
            {/* Countdown Overlay */}
            {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                    <div className="text-8xl md:text-9xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-bounce">
                        {countdown}
                    </div>
                </div>
            )}
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      {/* Footer Controls */}
      <div className="flex-none p-6 md:p-8 z-10 bg-gradient-to-t from-black/40 to-transparent">
         {capturedImage ? (
             <div className="flex items-center justify-center gap-8">
                 <button 
                    onClick={handleRetake}
                    className="flex flex-col items-center gap-2 text-xs md:text-sm font-medium text-gray-300 hover:text-white transition-colors"
                 >
                     <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all">
                        <RotateCcw size={20} className="md:w-6 md:h-6" />
                     </div>
                     <span>Retake</span>
                 </button>

                 <button 
                    onClick={handleConfirm}
                    className="flex flex-col items-center gap-2 text-xs md:text-sm font-bold text-white group"
                 >
                     <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-yellow-400 text-red-900 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.4)] group-hover:scale-105 transition-transform">
                        <Sparkles size={28} className="md:w-8 md:h-8" />
                     </div>
                     <span className="text-yellow-400">Generate</span>
                 </button>
             </div>
         ) : (
             <div className="flex justify-center items-center gap-12">
                <button
                   onClick={handleUploadClick}
                   className="flex flex-col items-center gap-2 text-xs md:text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all">
                       <Upload size={20} className="md:w-6 md:h-6" />
                   </div>
                   <span>Upload</span>
                </button>

                <button
                    onClick={initiateCapture}
                    disabled={!!error || countdown !== null}
                    className="group relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
                >
                    <div className="absolute inset-0 rounded-full border-4 border-white opacity-50 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-white opacity-100"></div>
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full group-active:scale-95 transition-transform duration-100 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
                    <div className="absolute -bottom-6 text-[10px] md:text-xs font-semibold tracking-wider opacity-80 uppercase whitespace-nowrap">Tap to Snap</div>
                </button>
             </div>
         )}
      </div>
    </div>
  );
};
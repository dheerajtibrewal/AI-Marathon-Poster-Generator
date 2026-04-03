import React, { useState } from 'react';
import { AppState } from './types';
import { StartScreen } from './components/StartScreen';
import { CameraCapture } from './components/CameraCapture';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultScreen } from './components/ResultScreen';
import { generateMarathonImage, STYLES } from './services/geminiService';
import { AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.START);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Store the actual style key to be used for generation
  const [activeStyle, setActiveStyle] = useState<string>('HEROIC');

  const handleStart = (selectedOption: string) => {
    setErrorMessage(null);
    
    let styleToUse = selectedOption;
    
    // Logic: If Surprise Me is selected, pick a random key from STYLES
    if (selectedOption === 'SURPRISE') {
        const keys = Object.keys(STYLES);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        styleToUse = randomKey;
        console.log("Surprise selected! Using style:", STYLES[randomKey as keyof typeof STYLES].label);
    }

    setActiveStyle(styleToUse);
    setAppState(AppState.CAMERA);
  };

  const handleCapture = async (imageSrc: string) => {
    setSourceImage(imageSrc); // Store the original selfie
    setAppState(AppState.PROCESSING);
    
    try {
      // Pass the activeStyle to the service
      const resultImage = await generateMarathonImage(imageSrc, activeStyle);
      setGeneratedImage(resultImage);
      setAppState(AppState.RESULT);
    } catch (error: any) {
      console.error("Generation failed", error);
      setErrorMessage(error?.message || "Failed to generate image. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleRegenerate = async () => {
    if (!sourceImage) return;
    
    setAppState(AppState.PROCESSING);
    try {
      // Reuse the same activeStyle for regeneration so the theme stays consistent
      const resultImage = await generateMarathonImage(sourceImage, activeStyle);
      setGeneratedImage(resultImage);
      setAppState(AppState.RESULT);
    } catch (error: any) {
      console.error("Regeneration failed", error);
      setErrorMessage(error?.message || "Failed to regenerate image.");
      setAppState(AppState.ERROR);
    }
  };

  const handleRestart = () => {
    setGeneratedImage(null);
    setSourceImage(null);
    setErrorMessage(null);
    // Reset style handled by StartScreen selection
    setAppState(AppState.START);
  };

  const handleErrorRetry = () => {
     setAppState(AppState.CAMERA);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 font-inter">
      {appState === AppState.START && (
        <StartScreen onStart={handleStart} />
      )}

      {appState === AppState.CAMERA && (
        <CameraCapture 
          onCapture={handleCapture} 
          onBack={() => setAppState(AppState.START)} 
        />
      )}

      {appState === AppState.PROCESSING && (
        <ProcessingScreen />
      )}

      {appState === AppState.RESULT && generatedImage && (
        <ResultScreen 
          imageSrc={generatedImage} 
          onRestart={handleRestart}
          onRegenerate={handleRegenerate}
        />
      )}

      {appState === AppState.ERROR && (
        <div className="flex flex-col items-center justify-center h-screen bg-white p-6 text-center">
            <div className="bg-red-50 p-6 rounded-full mb-6">
                <AlertTriangle className="text-red-600" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h2>
            <p className="text-gray-600 mb-8 max-w-md">{errorMessage}</p>
            <div className="flex gap-4">
                 <button 
                    onClick={handleRestart}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                 >
                    Back to Home
                 </button>
                 <button 
                    onClick={handleErrorRetry}
                    className="px-6 py-3 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-dark"
                 >
                    Try Again
                 </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
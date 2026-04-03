import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const STYLES = {
  HEROIC: {
    label: "Cinematic Hero",
    prompt: "Style: Cinematic, high-contrast photography. Lighting: Golden hour sun flare. Vibe: Epic, determined, and professional commercial photography."
  },
  CYBERPUNK: {
    label: "Cyberpunk Neon",
    prompt: "Style: Futuristic Cyberpunk. Lighting: Neon blue and pink city lights, night time setting. Vibe: High-tech, intense, electric energy, digital glitches."
  },
  COMIC: {
    label: "Comic Book Art",
    prompt: "Style: Modern Comic Book / Pop Art. Visuals: Bold black outlines, vibrant flat colors, dynamic action lines (speed lines). Vibe: Energetic superhero illustration."
  },
  WATERCOLOR: {
    label: "Artistic Watercolor",
    prompt: "Style: Digital Watercolor Painting. Visuals: Soft edges, paint splashes, artistic brush strokes. Background: Dreamy and slightly abstract interpretation of the bridge."
  },
  RETRO: {
    label: "Retro 80s Synthwave",
    prompt: "Style: 1980s Retro Synthwave. Visuals: VHS grain filter, sunset gradient, grid lines in the sky. Vibe: Nostalgic, vintage poster aesthetic."
  }
};

export type StyleKey = keyof typeof STYLES;

export const generateMarathonImage = async (base64InputImage: string, styleKey: string = 'HEROIC'): Promise<string> => {
  try {
    // Strip the data URL prefix if present to get raw base64
    const base64Data = base64InputImage.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

    // Get the specific style instructions
    // @ts-ignore
    const styleInstruction = STYLES[styleKey]?.prompt || STYLES.HEROIC.prompt;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: `
              Transform this selfie into a high-quality, professional image of a marathon runner participating in a major city marathon.
              
              CORE REQUIREMENTS:
              1. Keep the person's face clearly recognizable.
              2. The person should be wearing a professional marathon running jersey.
              3. Background: A scenic city marathon finish line or iconic city landmark.
              4. Composition: Vertical portrait (9:16).
              
              VISUAL STYLE INSTRUCTIONS:
              ${styleInstruction}
            `,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16"
        }
      }
    });

    // Extract the generated image from the response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
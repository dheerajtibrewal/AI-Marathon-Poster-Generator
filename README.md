# 🎨 AI Marathon Poster Generator

Transform any photo into a professional marathon runner poster using generative AI

---

## ✨ Features

- **Live Selfie Capture** — Use your device camera with a 3-second countdown, or upload an existing photo
- **AI-Powered Transformation** — Generative AI preserves your facial features while reimagining you as a marathon runner
- **6 Artistic Styles** — Choose from Cinematic Hero, Cyberpunk Neon, Comic Book Art, Watercolor, Retro 80s, or surprise yourself
- **Professional Output** — High-resolution poster-ready images with marathon running gear and scenic backgrounds
- **Share & Download** — Save your poster or share instantly via native web share
- **Mobile-Friendly** — Responsive design that works on desktop, tablet, and mobile devices

---

## 🎭 Style Options

- **Cinematic Hero** — High-contrast professional commercial photography aesthetic
- **Cyberpunk Neon** — Futuristic city lights with electric energy and bold neon colors
- **Comic Book Art** — Bold outlines, vibrant pop-art colors, and dynamic comic-style effects
- **Artistic Watercolor** — Soft edges, dreamy brush strokes, and ethereal atmosphere
- **Retro 80s** — Vintage synthwave aesthetic with warm sunset gradients and nostalgic vibes
- **Surprise Me** — AI randomly selects a style for an unpredictable creative experience

---

## 🛠 Tech Stack

- **React 19** + TypeScript — Modern, type-safe component architecture
- **Vite** — Lightning-fast bundling and development server
- **Tailwind CSS** — Utility-first styling with smooth animations
- **Gemini 2.5 Flash** — Image-to-image transformation via Google Generative AI SDK
- **Lucide React** — Clean, consistent icon library
- **Web APIs** — Native share API for seamless content distribution
- **QR Code Generation** — Easy mobile device transfer

---

## 🚀 How It Works

1. **Select Style** — Choose your artistic direction from the home screen
2. **Capture Photo** — Take a live selfie with countdown timer or upload an existing image
3. **Review** — Preview your photo before AI processing
4. **Generate** — Gemini AI transforms the image:
   - Preserves facial features and expressions
   - Generates realistic running gear and athletic wear
   - Creates scenic marathon background environments
   - Applies your selected artistic style
5. **Share or Download** — Save your poster or share instantly across platforms
6. **Regenerate** — Try again with a different result or style

---

## 🎯 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Installation

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your Gemini API key:**
   - Create a `.env.local` file in the project root
   - Add your key: `VITE_GEMINI_API_KEY=your_api_key_here`
   - Get a free API key from [Google AI Studio](https://ai.google.dev/)

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in your browser:**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
```

---

## 📸 Screenshots

<table>
  <tr>

   <td><img src="https://github.com/user-attachments/assets/9d02a56c-3d9a-4d5e-b585-46263fb6b512" width="250"/></td>
   <td><img src="https://github.com/user-attachments/assets/082fd6da-5fbf-41f7-a36f-f0fe62b19aca" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/686be8bc-5cec-45b1-b0db-bb793806c6b4" width="250"/></td>
   
  </tr>
  <tr>
    <td align="center"><em>Landing Page</em></td>
    <td align="center"><em>Select Comic theme</em></td>
    <td align="center"><em>Capture/Upload</em></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/9df3aba0-a3b6-4d8e-ba23-fabb4c598296" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/55f58f0e-fc96-43b3-97c7-aa2ada5889d0" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/2bfb60ae-1fe1-444c-b5e7-d0bafe62858c" width="250"/></td>
    <td></td>
  </tr>
  <tr>
    <td align="center"><em>AI Generation</em></td>
    <td align="center"><em>Final Result</em></td>
     <td align="center"><em>Download & Share</em></td>
    <td></td>
  </tr>
</table>

---

## 📝 Notes

Built as a creative technology POC exploring AI-powered personalised content experiences at scale.

# Indic Motion Engine 🎬

An open-source, schema-driven programmatic video rendering engine built with **TypeScript**, **React**, and **Remotion**.

Designed for automated bilingual (**Malayalam + English**) explainer reels, animated SVG concept graphs, and grapheme-safe Indic kinetic typography.

## ✨ Key Features

- **Grapheme-Safe Indic Typography:** Uses native `Intl.Segmenter('ml', { granularity: 'word' })` to ensure complex Malayalam Unicode ligatures (*chillaksharam* & conjuncts) never split or break during frame-by-frame kinetic animations.
- **Spring-Physics Concept Graphs:** Parameterized node-and-edge layout animations driven by Remotion's `spring()` and `interpolate()` hooks.
- **Schema-Driven Props:** Live-editable composition props in Remotion Studio and CLI JSON payload support for headless batch rendering.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start Remotion Studio live preview
npm run dev

# Render 1080x1920 vertical reel to MP4
npx remotion render MalayalamExplainerReel out/reel.mp4
git push

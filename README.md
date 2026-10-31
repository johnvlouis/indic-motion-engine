# Indic Motion Engine

An open-source, schema-driven programmatic video rendering engine built with TypeScript, React, and Remotion.

Designed for automated bilingual (Malayalam + English) explainer reels, animated SVG concept graphs, and grapheme-safe Indic kinetic typography.

## Key Features
- Grapheme-Safe Indic Typography using Intl.Segmenter('ml', { granularity: 'word' })
- Spring-Physics Concept Graphs using Remotion spring() and interpolate()
- Schema-Driven Props for live studio editing and CLI batch rendering

## Architecture
- src/MalayalamExplainer.tsx: Core 9:16 vertical explainer composition
- src/Root.tsx: Composition registry and default bilingual payload schema

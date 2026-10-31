import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface ExplainerProps {
  topicBadge: string;
  titleMalayalam: string;
  subtitleEnglish: string;
  nodes: string[];
  captionText: string;
}

export const MalayalamExplainer: React.FC<ExplainerProps> = ({
  topicBadge,
  titleMalayalam,
  subtitleEnglish,
  nodes,
  captionText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 14 } });

  // Grapheme-safe word splitting for Malayalam + English
  const words = React.useMemo(() => {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const segmenter = new Intl.Segmenter('ml', { granularity: 'word' });
      return Array.from(segmenter.segment(captionText))
        .filter((s) => s.isWordLike)
        .map((s) => s.segment);
    }
    return captionText.split(' ');
  }, [captionText]);

  const activeWordIndex = Math.floor(
    interpolate(frame, [15, 135], [0, words.length - 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090e',
        backgroundImage:
          'radial-gradient(circle at 50% 25%, rgba(16, 185, 129, 0.16), transparent 60%)',
        color: '#f8fafc',
        fontFamily: '"Noto Sans Malayalam", system-ui, sans-serif',
        padding: 64,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          transform: `translateY(${interpolate(headerSpring, [0, 1], [40, 0])}px)`,
          opacity: headerSpring,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '10px 22px',
            borderRadius: 999,
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.45)',
            color: '#34d399',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 28,
          }}
        >
          {topicBadge}
        </div>
        <h1
          style={{
            fontSize: 64,
            lineHeight: 1.25,
            fontWeight: 800,
            margin: '0 0 20px 0',
            color: '#ffffff',
          }}
        >
          {titleMalayalam}
        </h1>
        <p
          style={{
            fontSize: 32,
            color: '#94a3b8',
            margin: 0,
            fontWeight: 500,
          }}
        >
          {subtitleEnglish}
        </p>
      </div>

      {/* Center Animated Concept Nodes */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          margin: '40px 0',
        }}
      >
        {nodes.map((node, i) => {
          const nodeProgress = spring({
            frame: frame - (20 + i * 18),
            fps,
            config: { damping: 12 },
          });
          return (
            <div
              key={i}
              style={{
                opacity: nodeProgress,
                transform: `scale(${interpolate(nodeProgress, [0, 1], [0.88, 1])})`,
                background: 'rgba(30, 41, 59, 0.75)',
                border: '1px solid rgba(148, 163, 184, 0.25)',
                borderRadius: 24,
                padding: '28px 36px',
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#10b981',
                  color: '#052e16',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  fontWeight: 800,
                }}
              >
                {i + 1}
              </div>
              <span style={{ fontSize: 36, fontWeight: 700 }}>{node}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Kinetic Malayalam + English Captions */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          borderRadius: 28,
          padding: '32px 36px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 14,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {words.map((word, idx) => {
          const isActive = idx === activeWordIndex;
          return (
            <span
              key={idx}
              style={{
                fontSize: 40,
                fontWeight: isActive ? 800 : 600,
                padding: '6px 16px',
                borderRadius: 14,
                backgroundColor: isActive ? '#10b981' : 'transparent',
                color: isActive ? '#052e16' : '#cbd5e1',
                transition: 'all 0.1s ease',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

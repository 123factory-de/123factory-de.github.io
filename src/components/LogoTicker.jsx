import React from 'react';

// Minimal Kinetic Glyph: • — • • — • • •
// Pure monochrome minimalism.
// Smooth, deliberate entrance animation:
// Dots snap into place one by one, and dashes begin as dots before
// smoothly unfolding/morphing into precision bars.

const BASE_DELAY = 0.7; // Wait until hero headline and submeta fade in
const STAGGER = 0.14;   // Deliberate, relaxed timing between units

const ITEMS = [
  { type: 'dot',  w: 6,  delay: BASE_DELAY + 0 * STAGGER },
  { type: 'dash', w: 24, delay: BASE_DELAY + 1 * STAGGER },
  { type: 'dot',  w: 6,  delay: BASE_DELAY + 2 * STAGGER },
  { type: 'dot',  w: 6,  delay: BASE_DELAY + 3 * STAGGER },
  { type: 'dash', w: 24, delay: BASE_DELAY + 4 * STAGGER },
  { type: 'dot',  w: 6,  delay: BASE_DELAY + 5 * STAGGER },
  { type: 'dot',  w: 6,  delay: BASE_DELAY + 6 * STAGGER },
  { type: 'dot',  w: 6,  delay: BASE_DELAY + 7 * STAGGER },
];

export default function LogoTicker({ color = '#FFFFFF' }) {
  return (
    <div className="kinetic-glyph-track" aria-hidden="true">
      <style>{`
        .kinetic-glyph-track {
          display: inline-flex;
          align-items: center;
          gap: 8px; /* Wider spacing between dots and dashes */
          height: 16px;
          margin-right: 14px;
          vertical-align: middle;
          user-select: none;
          cursor: default;
        }

        /* 1. Dot Entrance: Smooth, deliberate arrival */
        @keyframes kineticDotSnap {
          0% {
            opacity: 0;
            transform: scale(0) translateY(-6px);
          }
          60% {
            opacity: 1;
            transform: scale(1.15) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* 2. Dash Entrance: Arrives as a compact dot, rests briefly, then smoothly unfolds to a bar */
        @keyframes dashMorph {
          0% {
            width: 6px;
            opacity: 0;
            transform: scale(0) translateY(-6px);
          }
          25% {
            width: 6px;
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          45% {
            width: 6px;
            transform: scale(1);
          }
          85% {
            width: 27px;
            transform: scale(1);
          }
          100% {
            width: 24px;
            opacity: 1;
            transform: scale(1);
          }
        }

        .kinetic-unit {
          height: 6px;
          border-radius: 3px;
          background-color: ${color};
          display: inline-block;
          flex-shrink: 0;
        }

        /* Pure Dot */
        .kinetic-dot {
          width: 6px;
          opacity: 0;
          animation: kineticDotSnap 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Morphing Dash (Slower, elegant duration) */
        .kinetic-dash {
          opacity: 0;
          animation: dashMorph 1.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {ITEMS.map((item, index) => {
        if (item.type === 'dot') {
          return (
            <span
              key={index}
              className="kinetic-unit kinetic-dot"
              style={{
                animationDelay: `${item.delay}s`,
              }}
            />
          );
        }

        return (
          <span
            key={index}
            className="kinetic-unit kinetic-dash"
            style={{
              animationDelay: `${item.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

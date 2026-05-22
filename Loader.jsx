/* ── Hide native cursor everywhere ── */
:global(*), :global(*::before), :global(*::after) { cursor: none !important; }

.sprite {
  position: fixed;
  top: 0; left: 0;
  width: 22px; height: 22px;
  z-index: 10020;
  pointer-events: none;
  backface-visibility: hidden;
  will-change: transform;
  transform: translate3d(-200px, -200px, 0);
  image-rendering: pixelated;
  filter: drop-shadow(0 0 4px rgba(97,242,255,0.7));
  transition: filter 150ms, scale 150ms;
}

:global(.sprite canvas),
.sprite :global(canvas) {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  image-rendering: pixelated;
}

:global(.canvas-ready) {
  background-image: none !important;
  background: none !important;
}

.aura {
  position: fixed;
  top: 0; left: 0;
  width: 44px; height: 44px;
  z-index: 10019;
  pointer-events: none;
  backface-visibility: hidden;
  will-change: transform;
  transform: translate3d(-200px, -200px, 0);
  border: 1.5px solid rgba(97,242,255,0.4);
  box-shadow: 0 0 12px rgba(97,242,255,0.15), inset 0 0 12px rgba(97,242,255,0.06);
  transition:
    width  250ms cubic-bezier(0.19,1,0.22,1),
    height 250ms cubic-bezier(0.19,1,0.22,1),
    border-color 200ms,
    box-shadow 200ms;
  animation: cursorSpin 5s linear infinite;
}

@keyframes cursorSpin { to { rotate: 90deg; } }

/* Hover */
:global(body.is-hovering) .sprite {
  filter: drop-shadow(0 0 6px rgba(120,224,107,0.95)) drop-shadow(0 0 12px rgba(120,224,107,0.5));
  scale: 1.1;
}
:global(body.is-hovering) .aura {
  width: 60px; height: 60px;
  border-color: rgba(120,224,107,0.55);
  box-shadow: 0 0 20px rgba(120,224,107,0.2), inset 0 0 16px rgba(120,224,107,0.08);
  animation: cursorSpin 1.2s linear infinite;
}

/* Click */
:global(body.is-clicking) .sprite {
  scale: 0.8;
  filter: drop-shadow(0 0 8px rgba(255,213,106,0.95));
}
:global(body.is-clicking) .aura {
  width: 30px; height: 30px;
  border-color: rgba(255,213,106,0.8);
  animation: none;
  rotate: 45deg;
}

/* Tooltip */
.tooltip {
  position: fixed;
  top: 0; left: 0;
  z-index: 10021;
  pointer-events: none;
  will-change: transform;
  transform: translate3d(-200px, -200px, 0);
  padding: 6px 12px;
  background: rgba(5,8,10,0.92);
  border: 1px solid rgba(97,242,255,0.3);
  color: #eff8f4;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
  letter-spacing: 0.05em;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 180ms;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

.tooltip:global(.show) { opacity: 1; }

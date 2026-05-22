import { useState, useEffect } from 'react'
import bgImg from '../assets/bg.png'
import { useParticles } from '../hooks/useParticles.js'

export default function Hero() {
  const [xpWidth, setXpWidth] = useState(0)
  const canvasRef = useParticles()

  useEffect(() => {
    const t = setTimeout(() => setXpWidth(84), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" aria-labelledby="hero-title">
      {/* Background */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${bgImg})` }}
        aria-hidden="true"
      />
      <div className="hero-depth"  aria-hidden="true" />
      <div className="hero-beams"  aria-hidden="true" />
      <div className="hero-fog"    aria-hidden="true" />

      {/* Particles canvas */}
      <canvas ref={canvasRef} id="particles" aria-hidden="true" />

      <div className="hero-voxel-floor" aria-hidden="true" />

      <div className="section-container hero-layout">
        {/* Left: text */}
        <div className="hero-copy">
          <div className="hero-badge reveal">
            <span className="badge-dot" aria-hidden="true" />
            Creative Designer — Level 04
          </div>

          <div className="hero-name reveal">Amirtha Rengavathi</div>

          <h1 id="hero-title" className="hero-title reveal">
            Crafting<br />
            <span className="hero-title-accent">Block by Block</span>
          </h1>

          <p className="hero-role reveal">
            Graphic Designer · UI/UX · Video Editor
          </p>

          <p className="hero-sub reveal">
            Designing immersive visuals, interfaces, and motion experiences
            inspired by gaming worlds and cinematic storytelling.
          </p>

          <div className="hero-actions reveal">
            <a
              href="#projects"
              className="hero-btn btn-primary"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              Explore Works
            </a>
            <a
              href="https://drive.google.com/drive/folders/19upmE13-mbGe1p2o3iOUHuUKGa4GQMzy"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn btn-ghost"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
              Portfolio Drive
            </a>
          </div>

          {/* XP bar */}
          <div className="hero-xp reveal">
            <div className="xp-label-row">
              <span>XP DESIGN LEVEL</span>
              <span>840 / 1000</span>
            </div>
            <div className="xp-bar" role="progressbar" aria-valuenow={xpWidth} aria-valuemin={0} aria-valuemax={100}>
              <div className="xp-fill" style={{ width: `${xpWidth}%` }} />
            </div>
          </div>

          {/* Stats */}
          <div className="hero-stats reveal">
            {[
              { num: '25+', label: 'Projects' },
              { num: '2',   label: 'Clubs'    },
              { num: '6+',  label: 'Tools'    },
              { num: '2026',label: 'Active'   },
            ].map(s => (
              <div key={s.label} className="hero-stat">
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: HUD panel */}
        <aside className="hud-panel reveal" aria-label="Player HUD">
          <div className="hud-title">// PLAYER.HUD</div>

          {[
            { k: 'Name',  v: 'Amirtha R.'       },
            { k: 'Role',  v: 'Creative Designer' },
            { k: 'Base',  v: 'Chennai, India'    },
            { k: 'Phone', v: '+91 75985 36107'   },
          ].map(row => (
            <div key={row.k} className="hud-stat-row">
              <span className="hud-key">{row.k}</span>
              <span className="hud-val">{row.v}</span>
            </div>
          ))}

          <div className="hud-mode-row">
            <span className="hud-key">Mode</span>
            <span className="hud-val hud-available">AVAILABLE</span>
          </div>

          {/* Inventory colour slots */}
          <div className="inv-row" aria-label="Inventory slots">
            {['#61f2ff','#78e06b','#ffd56a','#b084ff','#84cfff'].map(c => (
              <div
                key={c}
                className="inv-slot"
                style={{ '--slot-color': c }}
                aria-hidden="true"
              />
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

import { useInView } from '../hooks/useInView.js'
import { skills, craftSlots } from '../data/siteData.js'

function SkillBar({ name, level, color, c2, animate }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: animate ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${c2})`,
          }}
        />
      </div>
    </div>
  )
}

function CraftSlot({ icon, label, color }) {
  return (
    <div
      className="craft-slot"
      data-tooltip={label}
      style={{ '--slot-glow': color }}
    >
      <span
        className="craft-icon"
        dangerouslySetInnerHTML={{ __html: icon }}
        aria-hidden="true"
      />
      <span className="craft-label">{label}</span>
    </div>
  )
}

export default function About() {
  const [skillsRef, skillsInView] = useInView()

  return (
    <section id="about" className="ambient-section" aria-labelledby="about-title">
      <div className="section-container">
        <div className="section-header reveal">
          <p className="section-kicker">// PLAYER.INFO</p>
          <h2 id="about-title" className="section-title">
            About <span className="accent">The Builder</span>
          </h2>
        </div>

        <div className="about-grid">
          {/* Left column */}
          <div className="about-left">
            <div className="glass-panel reveal">
              <p className="about-bio">
                I am <strong className="highlight">Amirtha Rengavathi</strong>, a
                creative designer focused on graphic design, UI/UX, and cinematic
                video editing. Inspired by gaming worlds, futuristic visuals, and
                digital storytelling, I craft immersive experiences combining strong
                visuals with interactive design.
              </p>
              <p className="about-bio">
                My work blends cinematic composition, motion, typography, and modern
                UI aesthetics to build memorable digital identities and visual
                campaigns.
              </p>

              <div className="meta-cards">
                {[
                  { k: 'GUILD',    v: 'DEVS · Team Vikram'  },
                  { k: 'LEVEL',    v: 'Level 04 · Junior'   },
                  { k: 'BASE',     v: 'Chennai, India'       },
                  { k: 'PROJECTS', v: '25+ Completed'        },
                ].map(m => (
                  <div key={m.k} className="meta-card">
                    <small className="meta-key">{m.k}</small>
                    <strong className="meta-val">{m.v}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill bars */}
            <div className="glass-panel skill-panel reveal" ref={skillsRef}>
              <p className="panel-label">// SKILL.MATRIX</p>
              {skills.map(s => (
                <SkillBar key={s.name} {...s} animate={skillsInView} />
              ))}
            </div>
          </div>

          {/* Right column — crafting inventory */}
          <div className="about-right reveal">
            <div className="crafting-wrap">
              <div className="crafting-title">
                <span>// INVENTORY UI</span>
                <span>Tool Stack</span>
              </div>
              <div className="crafting-grid" id="craftingGrid">
                {craftSlots.map(slot => (
                  <CraftSlot key={slot.label} {...slot} />
                ))}
              </div>
              <div className="crafted-result">
                <div className="crafted-cube" aria-hidden="true" />
                <div>
                  <small>CRAFTED OUTPUT</small>
                  <strong>Recruiter-ready creative systems</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState, useMemo } from 'react'
import projectsData from '../data/projects.json'
import { filters } from '../data/siteData.js'

// Vite glob import — loads all project images at build time
const imageModules = import.meta.glob('../assets/project_*.{jpg,png}', { eager: true })

function getImage(filename) {
  const key = Object.keys(imageModules).find(k => k.endsWith(filename))
  return key ? imageModules[key].default : null
}

function ProjectCard({ project }) {
  const imgSrc = getImage(project.img)

  return (
    <article className="project-card reveal">
      <div className="card-thumb">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={project.name}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="card-thumb-placeholder"
            style={{ background: `linear-gradient(135deg,${project.badge}22,${project.badge}08)` }}
          />
        )}
        <div className="card-overlay" aria-hidden="true" />
        <span
          className="card-type-badge"
          style={{ background: project.badge }}
        >
          {project.type}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{project.name}</h3>
        <p className="card-desc">{project.desc}</p>
        <div className="card-tools" aria-label="Tools used">
          {project.tools.map(t => (
            <span key={t} className="tool-chip">{t}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = useMemo(
    () => activeFilter === 'All'
      ? projectsData
      : projectsData.filter(p => p.cat === activeFilter),
    [activeFilter]
  )

  return (
    <section id="projects" className="ambient-section" aria-labelledby="projects-title">
      <div className="section-container">
        <div className="section-header reveal">
          <p className="section-kicker">// WORLD.BUILDS</p>
          <h2 id="projects-title" className="section-title">
            Selected <span className="accent">Works</span>
          </h2>
        </div>

        {/* Filter bar */}
        <div
          className="filter-bar reveal"
          id="filterBar"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn${activeFilter === f ? ' is-active' : ''}`}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="projects-grid"
          id="projectsGrid"
          role="list"
          aria-label="Project portfolio"
        >
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

import { useActiveSection } from '../hooks/useActiveSection.js'

const SECTIONS = [
  { id: 'hero',         label: 'Home'    },
  { id: 'about',        label: 'About'   },
  { id: 'projects',     label: 'Works'   },
  { id: 'achievements', label: 'XP'      },
  { id: 'contact',      label: 'Contact' },
]

const IDS = SECTIONS.map(s => s.id)

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Minimap() {
  const active = useActiveSection(IDS)

  return (
    <nav
      className="minimap-nav"
      role="navigation"
      aria-label="Section navigation"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          className={`minimap-dot${active === id ? ' is-active' : ''}`}
          onClick={() => scrollTo(id)}
          aria-label={`Go to ${label}`}
          aria-current={active === id ? 'true' : undefined}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}

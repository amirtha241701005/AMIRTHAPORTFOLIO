const LINKS = [
  { id: 'hero',         label: 'Home'     },
  { id: 'about',        label: 'About'    },
  { id: 'projects',     label: 'Projects' },
  { id: 'achievements', label: 'XP'       },
  { id: 'contact',      label: 'Contact'  },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  return (
    <nav className="nav-bar" role="navigation" aria-label="Main navigation">
      <button
        className="nav-logo"
        onClick={() => scrollTo('hero')}
        aria-label="Back to top"
      >
        AR.WORLD
      </button>

      <ul className="nav-links" role="list">
        {LINKS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="nav-link"
              onClick={e => { e.preventDefault(); scrollTo(id) }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-status" aria-label="Availability status">
        Available for Work
      </div>
    </nav>
  )
}

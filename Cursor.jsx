import { useState, useCallback } from 'react'
import { socials } from '../data/siteData.js'

const ACCESS_KEY = 'ae13326e-299a-4d65-a6ac-7fbb595739a6'

function SocialLink({ item }) {
  return (
    <a
      href={item.href}
      target={item.href.startsWith('http') ? '_blank' : undefined}
      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="social-link"
      style={{ '--soc-color': item.color }}
    >
      <span
        className="soc-icon"
        dangerouslySetInnerHTML={{ __html: item.icon }}
        aria-hidden="true"
      />
      <span className="soc-info">
        <span className="soc-label">{item.label}</span>
        <span className="soc-sub">{item.sub}</span>
      </span>
      <svg className="soc-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  )
}

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)   // null | 'sending' | 'success' | 'error'

  const handleChange = useCallback(e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(async e => {
    e.preventDefault()
    setStatus('sending')

    try {
      const fd = new FormData()
      fd.append('access_key', ACCESS_KEY)
      fd.append('subject', 'New Portfolio Enquiry — Amirtha Rengavathi')
      fd.append('from_name', 'Portfolio Contact Form')
      fd.append('name',    form.name)
      fd.append('email',   form.email)
      fd.append('message', form.message)

      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error('Submit failed')
      }
    } catch {
      setStatus('error')
    }
  }, [form])

  return (
    <section id="contact" className="ambient-section" aria-labelledby="contact-title">
      <div className="section-container">
        <div className="section-header reveal">
          <p className="section-kicker">// CONTACT.INIT</p>
          <h2 id="contact-title" className="section-title">
            Let's <span className="accent">Build</span>
          </h2>
        </div>

        <div className="contact-grid">
          {/* Left — info + socials */}
          <div className="contact-info reveal">
            <p className="contact-sub">
              Ready to collaborate on something extraordinary? Whether it's a
              poster, a campaign, or an immersive visual world — let's craft it
              together.
            </p>

            <div className="social-links" id="socialLinks">
              {socials.map(s => <SocialLink key={s.label} item={s} />)}
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-form-wrap reveal">
            <form
              className="contact-form"
              id="contactForm"
              onSubmit={handleSubmit}
              noValidate
            >
              <p className="form-heading">// SEND.MESSAGE</p>

              <div className="form-group">
                <label className="form-label" htmlFor="fname">Player name</label>
                <input
                  id="fname"
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="femail">Channel</label>
                <input
                  id="femail"
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="fmsg">Message packet</label>
                <textarea
                  id="fmsg"
                  className="form-textarea"
                  name="message"
                  placeholder="Tell me about the project..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="form-msg form-msg--success" id="formMsg" role="status">
                  ✦ Message sent! I'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="form-msg form-msg--error" id="formMsg" role="alert">
                  ⚠ Something went wrong. Try emailing directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import cursorImg from '../assets/cursor.png'

export function useCursor() {
  const spriteRef = useRef(null)
  const auraRef   = useRef(null)
  const tipRef    = useRef(null)

  useEffect(() => {
    const sprite = spriteRef.current
    const aura   = auraRef.current
    const tip    = tipRef.current
    if (!sprite || !aura) return

    // ── Chroma-key green out of cursor PNG ───────────────────────────────
    const img = new Image()
    img.onload = () => {
      const cvs = document.createElement('canvas')
      cvs.width  = img.naturalWidth
      cvs.height = img.naturalHeight
      const ctx = cvs.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const id = ctx.getImageData(0, 0, cvs.width, cvs.height)
      const px = id.data
      for (let i = 0; i < px.length; i += 4) {
        const r = px[i], g = px[i + 1], b = px[i + 2]
        if (g > 180 && g > r * 1.4 && g > b * 1.4) px[i + 3] = 0
      }
      ctx.putImageData(id, 0, 0)
      sprite.appendChild(cvs)
      sprite.classList.add('canvas-ready')
    }
    img.src = cursorImg

    // ── Raw mouse coords (no DOM writes here) ───────────────────────────
    let mx = -200, my = -200
    let ax = -200, ay = -200
    const LERP = 0.15
    let prevS = '', prevA = '', prevT = ''
    let rafId

    const onMove = (e) => { mx = e.clientX; my = e.clientY }
    const onDown = () => document.body.classList.add('is-clicking')
    const onUp   = () => document.body.classList.remove('is-clicking')

    // Hover detection via delegation
    const onOver = (e) => {
      const el = e.target?.closest('a,button,[data-tooltip],.project-card,.craft-slot,.filter-btn,.minimap-dot,.social-link')
      document.body.classList.toggle('is-hovering', !!el)
    }

    // Tooltip
    let tipTarget = null
    const onTipOver = (e) => {
      const el = e.target?.closest('[data-tooltip]')
      if (el !== tipTarget) {
        tipTarget = el
        if (tip) {
          if (el) { tip.textContent = el.dataset.tooltip; tip.classList.add('show') }
          else    { tip.classList.remove('show') }
        }
      }
    }

    // ── RAF loop — single pass, all GPU-composited transforms ───────────
    function tick() {
      ax += (mx - ax) * LERP
      ay += (my - ay) * LERP

      const ns = `translate3d(${(mx - 1) | 0}px,${(my - 1) | 0}px,0)`
      const na = `translate3d(${(ax - 22) | 0}px,${(ay - 22) | 0}px,0)`

      if (ns !== prevS) { sprite.style.transform = ns; prevS = ns }
      if (na !== prevA) { aura.style.transform   = na; prevA = na }

      if (tip && tipTarget && tip.classList.contains('show')) {
        const nt = `translate3d(${(mx + 20) | 0}px,${(my - 8) | 0}px,0)`
        if (nt !== prevT) { tip.style.transform = nt; prevT = nt }
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup',   onUp,   { passive: true })
    document.addEventListener('pointerover', onOver,    { passive: true })
    document.addEventListener('pointerover', onTipOver, { passive: true })

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup',   onUp)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerover', onTipOver)
    }
  }, [])

  return { spriteRef, auraRef, tipRef }
}

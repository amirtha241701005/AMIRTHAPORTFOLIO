import { useState, useEffect } from 'react'

const STEPS = [
  { w: 20,  msg: 'Loading assets...'   },
  { w: 50,  msg: 'Spawning chunks...'  },
  { w: 80,  msg: 'Crafting world...'   },
  { w: 100, msg: 'Ready!'              },
]

export default function Loader({ onDone }) {
  const [step, setStep]     = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const delays = [200, 500, 700, 400]
    let timeout

    function advance(i) {
      if (i >= STEPS.length) {
        timeout = setTimeout(() => {
          setVisible(false)
          setTimeout(onDone, 600)
        }, 400)
        return
      }
      setStep(i)
      timeout = setTimeout(() => advance(i + 1), delays[i] ?? 400)
    }

    timeout = setTimeout(() => advance(0), 100)
    return () => clearTimeout(timeout)
  }, [onDone])

  const { w, msg } = STEPS[step] ?? STEPS[STEPS.length - 1]

  return (
    <div
      id="loader"
      className={`loader-overlay${!visible ? ' loader-hide' : ''}`}
      aria-live="polite"
    >
      <div className="loader-panel">
        <div className="loader-title">AR.WORLD</div>
        <div className="loader-cubes" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="loader-bar-wrap">
          <div
            className="loader-bar"
            id="loaderBar"
            style={{ width: `${w}%` }}
            role="progressbar"
            aria-valuenow={w}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="loader-status" id="loaderStatus">{msg}</div>
      </div>
    </div>
  )
}

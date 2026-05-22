import { useCursor } from '../hooks/useCursor.js'
import styles from './Cursor.module.css'

export default function Cursor() {
  const { spriteRef, auraRef, tipRef } = useCursor()

  return (
    <>
      <div ref={spriteRef} className={styles.sprite} aria-hidden="true" />
      <div ref={auraRef}   className={styles.aura}   aria-hidden="true" />
      <div ref={tipRef}    className={styles.tooltip} role="tooltip" id="tooltip" />
    </>
  )
}

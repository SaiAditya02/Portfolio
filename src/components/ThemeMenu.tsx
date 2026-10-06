import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Icon from './Icon'
import {
  appearanceOptions,
  applyPreferences,
  styleOptions,
  useThemePreferences,
  type ThemePreferences,
} from '../theme/preferences'

const appearanceIcon = { light: 'sun', dark: 'moon', system: 'system' } as const

// Cross-fade the whole page when the style changes, where the browser supports it.
function apply(next: ThemePreferences, current: ThemePreferences) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (next.style !== current.style && 'startViewTransition' in document && !reduced) {
    document.startViewTransition(() => applyPreferences(next))
    return
  }
  applyPreferences(next)
}

function ThemeMenu() {
  const preferences = useThemePreferences()
  const [open, setOpen] = useState(false)
  const id = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="theme-menu" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="theme-trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="palette" size={16} />
        <span>Theme</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            className="theme-panel"
            role="dialog"
            aria-label="Theme"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <fieldset>
              <legend>Style</legend>
              <div className="theme-styles">
                {styleOptions.map(({ id: styleId, label }) => (
                  <label key={styleId} className="theme-style">
                    <input
                      type="radio"
                      name={`${id}-style`}
                      checked={preferences.style === styleId}
                      onChange={() => apply({ ...preferences, style: styleId }, preferences)}
                    />
                    <span className={`theme-swatch theme-swatch-${styleId}`} aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Mode</legend>
              <div className="theme-modes">
                {appearanceOptions.map((appearance) => (
                  <label key={appearance} className="theme-mode">
                    <input
                      type="radio"
                      name={`${id}-mode`}
                      checked={preferences.appearance === appearance}
                      onChange={() => apply({ ...preferences, appearance }, preferences)}
                    />
                    <span>
                      <Icon name={appearanceIcon[appearance]} size={16} />
                      {appearance[0].toUpperCase() + appearance.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeMenu

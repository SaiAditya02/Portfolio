import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  appearanceOptions,
  applyPreferences,
  paletteOptions,
  readPreferences,
  type Appearance,
  type Palette,
  type ThemePreferences,
} from '../theme/preferences'

const closeAnimationMs = 180

function ThemeSwitcher() {
  const [preferences, setPreferences] = useState(readPreferences)
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, right: 12, width: 320 })
  const controlRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const selectedAppearanceRef = useRef<HTMLInputElement>(null)
  const closeTimerRef = useRef<number | undefined>(undefined)

  const choosePreference = (next: ThemePreferences) => {
    setPreferences(next)
    applyPreferences(next)
  }

  const choosePalette = (palette: Palette) => {
    choosePreference({ ...preferences, palette })
  }

  const chooseAppearance = (appearance: Appearance) => {
    choosePreference({ ...preferences, appearance })
  }

  const dismiss = useCallback((restoreFocus: boolean) => {
    setIsOpen(false)
    if (closeTimerRef.current !== undefined) {
      window.clearTimeout(closeTimerRef.current)
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsMounted(false)
      closeTimerRef.current = undefined
    }, closeAnimationMs)
    if (restoreFocus) triggerRef.current?.focus()
  }, [])

  const positionPopover = useCallback(() => {
    const bounds = triggerRef.current?.getBoundingClientRect()
    if (!bounds) return

    const viewportWidth = document.documentElement.clientWidth
    const viewportHeight = document.documentElement.clientHeight
      const width = Math.max(200, Math.min(320, viewportWidth - 24))
    const maxRight = Math.max(12, viewportWidth - width - 12)
    const right = Math.min(maxRight, Math.max(12, viewportWidth - bounds.right))
    const maxTop = Math.max(12, viewportHeight - 272)
    const top = Math.min(maxTop, Math.max(12, bounds.bottom + 9))
      setPopoverPosition({ top, right, width })
  }, [])

  const open = () => {
    if (closeTimerRef.current !== undefined) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = undefined
    }
    positionPopover()
    setIsMounted(true)
    window.requestAnimationFrame(() => setIsOpen(true))
  }

  useEffect(() => {
    if (!isOpen) return

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !controlRef.current?.contains(event.target) &&
        !popoverRef.current?.contains(event.target)
      ) {
        dismiss(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dismiss(true)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [dismiss, isOpen])

  useEffect(() => {
    if (isOpen) selectedAppearanceRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const reposition = () => positionPopover()
    window.addEventListener('resize', reposition)
    window.addEventListener('scroll', reposition, true)
    return () => {
      window.removeEventListener('resize', reposition)
      window.removeEventListener('scroll', reposition, true)
    }
  }, [isOpen, positionPopover])

  useEffect(
    () => () => {
      if (closeTimerRef.current !== undefined) window.clearTimeout(closeTimerRef.current)
    },
    [],
  )

  return (
    <div className="theme-switcher" ref={controlRef}>
      <button
        ref={triggerRef}
        className="theme-trigger"
        type="button"
        aria-label="Change appearance and theme"
        aria-expanded={isOpen}
        aria-controls="appearance-popover"
        aria-haspopup="dialog"
        title="Change appearance and theme"
        onClick={() => (isOpen ? dismiss(false) : open())}
      >
        <svg
          className="theme-trigger-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </button>

      {isMounted && createPortal(
        <div
          ref={popoverRef}
          className={`theme-popover${isOpen ? ' is-open' : ''}`}
          id="appearance-popover"
          role="dialog"
          aria-labelledby="appearance-popover-title"
          aria-hidden={!isOpen}
            style={{
              top: popoverPosition.top,
              right: popoverPosition.right,
              width: popoverPosition.width,
            }}
        >
          <h2 className="theme-popover-title" id="appearance-popover-title">
            Appearance
          </h2>

          <fieldset className="theme-selector">
            <legend>THEME</legend>
            <div className="appearance-segmented">
              {appearanceOptions.map((appearance) => (
                <label className="appearance-option" key={appearance}>
                  <input
                    ref={preferences.appearance === appearance ? selectedAppearanceRef : undefined}
                    type="radio"
                    name="portfolio-appearance"
                    value={appearance}
                    checked={preferences.appearance === appearance}
                    onChange={() => chooseAppearance(appearance)}
                  />
                  <span className="appearance-option-content">
                    <span className="appearance-option-icon" aria-hidden="true">
                      {appearance === 'light' ? '☀' : appearance === 'dark' ? '☾' : '▣'}
                    </span>
                    <span>{appearance[0].toUpperCase() + appearance.slice(1)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="theme-selector palette-selector">
            <legend>PALETTE</legend>
            <div className="palette-grid">
              {paletteOptions.map(({ id, label }) => (
                <label className="palette-option" key={id}>
                  <input
                    type="radio"
                    name="portfolio-palette"
                    value={id}
                    checked={preferences.palette === id}
                    onChange={() => choosePalette(id)}
                  />
                  <span className="palette-swatch" data-palette={id} aria-hidden="true" />
                  <span className="palette-option-label">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>,
        document.body,
      )}
    </div>
  )
}

export default ThemeSwitcher
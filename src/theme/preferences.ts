import { useSyncExternalStore } from 'react'

// public/theme-init.js repeats these options, defaults and storage keys so it
// can run before React loads. Keep both files in sync.
export const styleOptions = [
  { id: 'lime', label: 'Lime Editorial' },
  { id: 'terminal', label: 'Dark & Techy' },
] as const

export const appearanceOptions = ['light', 'dark', 'system'] as const

export type ThemeStyle = (typeof styleOptions)[number]['id']
export type Appearance = (typeof appearanceOptions)[number]

export type ThemePreferences = {
  style: ThemeStyle
  appearance: Appearance
}

export const DEFAULT_PREFERENCES: ThemePreferences = {
  style: 'lime',
  appearance: 'system',
}

const CHANGE_EVENT = 'portfolio-theme-change'

export function isThemeStyle(value: string | undefined): value is ThemeStyle {
  return styleOptions.some((option) => option.id === value)
}

export function isAppearance(value: string | undefined): value is Appearance {
  return appearanceOptions.some((appearance) => appearance === value)
}

let snapshot: ThemePreferences = DEFAULT_PREFERENCES

function getSnapshot() {
  const root = document.documentElement
  const style = isThemeStyle(root.dataset.style) ? root.dataset.style : DEFAULT_PREFERENCES.style
  const appearance = isAppearance(root.dataset.appearance) ? root.dataset.appearance : DEFAULT_PREFERENCES.appearance
  if (snapshot.style !== style || snapshot.appearance !== appearance) snapshot = { style, appearance }
  return snapshot
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => window.removeEventListener(CHANGE_EVENT, onChange)
}

export function useThemePreferences() {
  return useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_PREFERENCES)
}

export function applyPreferences({ style, appearance }: ThemePreferences) {
  const root = document.documentElement
  root.dataset.style = style
  root.dataset.appearance = appearance

  try {
    window.localStorage.setItem('portfolio-style', style)
    window.localStorage.setItem('portfolio-appearance', appearance)
  } catch {
    // Preferences still apply for this page when browser storage is disabled.
  }

  window.dispatchEvent(new Event(CHANGE_EVENT))
}

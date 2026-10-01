export const paletteOptions = [
  { id: 'theme_monochrome_editorial', label: 'Monochrome Editorial' },
  { id: 'theme_amber_telemetry', label: 'Amber Telemetry' },
  { id: 'theme_electric_cyan', label: 'Electric Cyan' },
  { id: 'theme_acid_lime', label: 'Acid Lime' },
] as const

export const appearanceOptions = ['light', 'dark', 'system'] as const

export type Palette = (typeof paletteOptions)[number]['id']
export type Appearance = (typeof appearanceOptions)[number]

export type ThemePreferences = {
  palette: Palette
  appearance: Appearance
}

export const DEFAULT_PREFERENCES: ThemePreferences = {
  palette: 'theme_amber_telemetry',
  appearance: 'dark',
}

export function isPalette(value: string | undefined): value is Palette {
  return paletteOptions.some((palette) => palette.id === value)
}

export function isAppearance(value: string | undefined): value is Appearance {
  return appearanceOptions.some((appearance) => appearance === value)
}

export function readPreferences(): ThemePreferences {
  const root = document.documentElement

  return {
    palette: isPalette(root.dataset.palette) ? root.dataset.palette : DEFAULT_PREFERENCES.palette,
    appearance: isAppearance(root.dataset.appearance)
      ? root.dataset.appearance
      : DEFAULT_PREFERENCES.appearance,
  }
}

export function applyPreferences({ palette, appearance }: ThemePreferences) {
  const root = document.documentElement
  root.dataset.palette = palette
  root.dataset.appearance = appearance

  try {
    window.localStorage.setItem('portfolio-palette', palette)
    window.localStorage.setItem('portfolio-appearance', appearance)
  } catch {
    // Preferences still apply for this page when browser storage is disabled.
  }
}
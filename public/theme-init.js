(() => {
  const palettes = [
    'theme_monochrome_editorial',
    'theme_amber_telemetry',
    'theme_electric_cyan',
    'theme_acid_lime',
  ]
  const appearances = ['light', 'dark', 'system']
  let palette = 'theme_amber_telemetry'
  let appearance = 'dark'

  try {
    const savedPalette = window.localStorage.getItem('portfolio-palette')
    const savedAppearance = window.localStorage.getItem('portfolio-appearance')
    if (palettes.includes(savedPalette)) palette = savedPalette
    if (appearances.includes(savedAppearance)) appearance = savedAppearance
  } catch {
    // Defaults remain available when browser storage is disabled.
  }

  document.documentElement.dataset.palette = palette
  document.documentElement.dataset.appearance = appearance
})()
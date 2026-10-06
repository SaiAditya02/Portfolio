// Runs before React to avoid a theme flash. Keep these lists, defaults and
// storage keys in sync with src/theme/preferences.ts.
(() => {
  const styles = ['lime', 'terminal']
  const appearances = ['light', 'dark', 'system']
  let style = 'lime'
  let appearance = 'system'

  try {
    const savedStyle = window.localStorage.getItem('portfolio-style')
    const savedAppearance = window.localStorage.getItem('portfolio-appearance')
    if (styles.includes(savedStyle)) style = savedStyle
    if (appearances.includes(savedAppearance)) appearance = savedAppearance
  } catch {
    // Defaults remain available when browser storage is disabled.
  }

  // A shared link can pick the look: ?style=terminal&mode=dark
  const params = new URLSearchParams(window.location.search)
  if (styles.includes(params.get('style'))) style = params.get('style')
  if (appearances.includes(params.get('mode'))) appearance = params.get('mode')

  document.documentElement.dataset.style = style
  document.documentElement.dataset.appearance = appearance
})()

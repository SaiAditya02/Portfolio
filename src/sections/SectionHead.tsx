import type { ReactNode } from 'react'
import { useThemePreferences } from '../theme/preferences'

type SectionHeadProps = {
  id: string
  label: string
  file: string
  children: ReactNode
}

// Lime Editorial labels a section with an italic "/ label"; Dark & Techy with the shell command that prints it.
function SectionHead({ id, label, file, children }: SectionHeadProps) {
  const { style } = useThemePreferences()

  return (
    <header className="section-head">
      <p className="section-label" aria-hidden="true">
        {style === 'terminal' ? (
          <>
            <span className="prompt">~/sai $</span> cat {file}
          </>
        ) : (
          <>/ {label}</>
        )}
      </p>
      <h2 id={id}>{children}</h2>
    </header>
  )
}

export default SectionHead

import { toolMarks } from '../data/toolMarks'

// Glyphs for skills that are practices rather than brands, matched by keyword.
const practiceGlyphs: [RegExp, string][] = [
  [/regression|loop/i, 'M4 12a8 8 0 0 1 13.7-5.7L20 8.6M20 4v4.6h-4.6M20 12a8 8 0 0 1-13.7 5.7L4 15.4M4 20v-4.6h4.6'],
  [/api|integration|oauth/i, 'M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16'],
  [/uat|user|stakeholder/i, 'M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 20c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6M16 4.2a3.5 3.5 0 0 1 0 6.6M18 14.3c2.3.8 4 3 4 5.7'],
  [/explor|edge|brainstorm/i, 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z'],
  [/analytic|data|report/i, 'M4 20V10M10 20V4M16 20v-7M22 20H2'],
  [/agile|scrum|workflow/i, 'M4 7h12l-3-3M20 17H8l3 3M20 7v4M4 17v-4'],
  [/doc|bug|draft|case|scenario|requirement|code/i, 'M6 2h9l5 5v15H6zM14 2v6h6M9 13h8M9 17h6'],
]
const checkGlyph = 'M5 12.5l4.5 4.5L19 7.5'

type ToolIconProps = {
  name: string
  size?: number
  className?: string
}

// A brand mark on a light tile, or a practice glyph when the skill is not a product.
function ToolIcon({ name, size = 28, className }: ToolIconProps) {
  const mark = toolMarks[name]
  const glyph = practiceGlyphs.find(([pattern]) => pattern.test(name))?.[1] ?? checkGlyph
  const inner = Math.round(size * 0.62)

  return (
    <span
      className={className ? `tool-icon ${className}` : 'tool-icon'}
      style={{
        display: 'inline-grid',
        placeItems: 'center',
        flex: 'none',
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: '#ffffff',
        boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 8%)',
      }}
      aria-hidden="true"
    >
      {mark ? (
        <svg width={inner} height={inner} viewBox="0 0 24 24">
          <path d={mark.path} fill={mark.color} />
        </svg>
      ) : (
        <svg width={inner} height={inner} viewBox="0 0 24 24" fill="none" stroke="#3a4250" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d={glyph} />
        </svg>
      )}
    </span>
  )
}

export default ToolIcon

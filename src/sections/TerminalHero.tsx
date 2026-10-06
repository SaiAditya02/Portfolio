import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import Icon from '../components/Icon'
import { contact, copy, experience, metrics, projects, qaScenarios, skillGroups, socials } from '../data/portfolio'

type Line = { id: number; node: ReactNode; tone?: 'cmd' | 'pass' | 'muted' | 'warn' }

const BOOT = 'npx qa-run --candidate "Sai Aditya"'
const commands = ['help', 'whoami', 'experience', 'projects', 'skills', 'lab', 'resume', 'contact', 'clear'] as const
const linkedIn = socials.find(({ label }) => label === 'LinkedIn')?.href ?? '#'

const testNames = ['experience', 'ai_tools', 'products', 'bug_escapes', 'payments', 'scale']
const dots = (label: string, width = 16) => `${label} ${'.'.repeat(Math.max(2, width - label.length))}`

function TerminalHero() {
  const reduced = useReducedMotion()
  const [lines, setLines] = useState<Line[]>([])
  const [typed, setTyped] = useState('')
  const [booted, setBooted] = useState(false)
  const [input, setInput] = useState('')
  const nextId = useRef(0)
  const screenRef = useRef<HTMLDivElement>(null)

  const push = (node: ReactNode, tone?: Line['tone']) => setLines((current) => [...current, { id: nextId.current++, node, tone }])

  // Boot: type the command, then print every resume number as a passing test.
  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))
    const run = async () => {
      if (reduced) setTyped(BOOT)
      else {
        for (let count = 1; count <= BOOT.length; count += 1) {
          if (cancelled) return
          setTyped(BOOT.slice(0, count))
          await wait(34)
        }
        await wait(250)
      }
      for (const [index, { value, label }] of metrics.entries()) {
        if (cancelled) return
        push(
          <>
            <span className="t-badge">PASS</span> {dots(testNames[index] ?? 'check')} {value} {label}
          </>,
          'pass',
        )
        if (!reduced) await wait(200)
      }
      if (cancelled) return
      push(<>Tests: {metrics.length} passed, {metrics.length} total</>, 'muted')
      push(<>Type a command or tap one below. Try “projects”.</>, 'muted')
      setBooted(true)
    }
    void run()
    return () => {
      cancelled = true
      setLines([])
      setTyped('')
      setBooted(false)
    }
  }, [reduced])

  useEffect(() => {
    const screen = screenRef.current
    if (screen) screen.scrollTop = screen.scrollHeight
  }, [lines])

  const jump = (hash: string, label: string) => (
    <a className="t-jump" href={hash}>
      → open {label}
    </a>
  )

  const runCommand = (raw: string) => {
    const command = raw.trim().toLowerCase()
    if (!command) return
    push(<>$ {command}</>, 'cmd')
    switch (command) {
      case 'help':
        push(<>Commands: {commands.join(', ')}</>, 'muted')
        break
      case 'whoami':
        push(<>Sai Aditya · {copy.role} @ {copy.company} · {contact.location}</>)
        push(jump('#about', 'about'))
        break
      case 'experience':
        experience.forEach((job) => push(<>{job.duration.padEnd(20)} {job.role}, {job.company}</>))
        push(jump('#experience', 'experience'))
        break
      case 'projects':
        projects.forEach((project) =>
          push(
            <>
              <span className="t-badge">PASS</span> {project.title} · {project.edgeCases.length} edge cases covered
            </>,
            'pass',
          ),
        )
        push(jump('#projects', 'projects'))
        break
      case 'skills':
        skillGroups.forEach((group) => push(<>{dots(group.title, 24)} {group.items.join(', ')}</>))
        push(jump('#skills', 'skills'))
        break
      case 'lab':
        qaScenarios.forEach((scenario) =>
          push(
            <>
              <span className="t-badge t-badge-run">RUN</span> {dots(scenario.label, 18)} {scenario.input}
            </>,
            'warn',
          ),
        )
        push(jump('#qa-lab', 'the QA Lab'))
        break
      case 'resume':
        push(
          <>
            Resume ready:{' '}
            <a href="/SaiAdityaResume.pdf" download>
              SaiAdityaResume.pdf
            </a>
          </>,
        )
        break
      case 'contact':
        push(
          <>
            <a href={`mailto:${contact.email}`}>{contact.email}</a> · {contact.phone} ·{' '}
            <a href={linkedIn} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </>,
        )
        push(jump('#contact', 'the contact form'))
        break
      case 'clear':
        setLines([])
        break
      default:
        push(<>command not found: {command}. Type “help”.</>, 'warn')
    }
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    runCommand(input)
    setInput('')
  }

  return (
    <section className="terminal-hero" id="top" aria-labelledby="hero-title">
      <div className="th-intro">
        <p className="th-micro">{copy.microcopy}</p>
        <ul className="th-status" aria-label="Status">
          <li>
            System status <strong><span className="th-led" aria-hidden="true" />Online</strong>
          </li>
          <li>
            QA status <strong><span className="th-led" aria-hidden="true" />Active</strong>
          </li>
          <li>
            Build <strong>2026.10</strong>
          </li>
        </ul>
        <p className="th-eyebrow">{copy.eyebrow}</p>
        <h1 id="hero-title" className="th-title">
          <span className="visually-hidden">Sai Aditya, {copy.role}. </span>
          {copy.manifesto[0]}
          <br />
          {copy.manifesto[1]}
          <br />
          <span className="th-accent">{copy.manifesto[2]}</span>
        </h1>
        <p className="th-lead">
          {copy.role} at {copy.company}. {copy.lead}
        </p>
        <div className="th-actions">
          <a className="btn btn-primary" href="#contact">
            Start a conversation
            <Icon name="arrow" size={16} />
          </a>
          <a className="btn btn-ghost" href="#projects">
            See my work
          </a>
          <a className="btn btn-ghost" href="/SaiAdityaResume.pdf" target="_blank" rel="noreferrer">
            View resume
          </a>
          <a className="btn btn-ghost" href="/SaiAdityaResume.pdf" download>
            <Icon name="download" size={16} />
            Download resume
          </a>
        </div>
      </div>

      <div className="th-console" aria-label="Interactive test run">
        <div className="th-bar">
          <span className="th-lights" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>qa-run</span>
          <span className={booted ? 'th-run is-done' : 'th-run'}>{booted ? 'all tests passed' : 'running…'}</span>
        </div>
        <div className="th-screen" ref={screenRef} aria-live="polite">
          <p className="t-line t-cmd">
            $ {typed}
            {!booted && <span className="t-caret" aria-hidden="true" />}
          </p>
          {lines.map((line) => (
            <p key={line.id} className={`t-line t-enter${line.tone ? ` t-${line.tone}` : ''}`}>
              {line.node}
            </p>
          ))}
        </div>
        <form className="th-prompt" onSubmit={submit}>
          <label htmlFor="th-input">$</label>
          <input
            id="th-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={booted ? 'type a command…' : 'wait for the run…'}
            autoComplete="off"
            spellCheck={false}
            disabled={!booted}
          />
        </form>
        <div className="th-chips">
          {commands.map((command) => (
            <button key={command} type="button" disabled={!booted} onClick={() => runCommand(command)}>
              {command}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TerminalHero

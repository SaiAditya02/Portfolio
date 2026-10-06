import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import Icon from '../components/Icon'
import ToolIcon from '../components/ToolIcon'
import SectionHead from './SectionHead'
import avatar from '../assets/avatar.png'
import { contactFields, useContactForm } from '../hooks/useContactForm'
import {
  aboutPoints,
  aiTools,
  aiUseCases,
  contact,
  copy,
  experience,
  flowSteps,
  projects,
  qaScenarios,
  skillGroups,
  socials,
  techStack,
} from '../data/portfolio'

const linkedIn = socials.find(({ label }) => label === 'LinkedIn')?.href ?? '#'
const gitHub = socials.find(({ label }) => label === 'GitHub')?.href ?? '#'
const phoneHref = `tel:${contact.phone.replace(/\s/g, '')}`


export function ToolChip({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <span className="tool-chip">
      <ToolIcon name={name} size={size} />
      {name}
    </span>
  )
}

export function ProfileCard() {
  return (
    <aside className="profile-card" aria-label="Profile">
      <img className="profile-avatar" src={avatar} alt="Illustrated avatar of Sai Aditya" width={96} height={96} />
      <div className="profile-id">
        <p className="profile-role">{copy.role} · {copy.company}</p>
        <p className="profile-name">Sai Aditya</p>
        <p className="profile-place">{contact.location}</p>
      </div>
      <ul className="profile-lines">
        <li>
          <a href={`mailto:${contact.email}`}>
            <Icon name="mail" size={16} />
            {contact.email}
          </a>
        </li>
        <li>
          <a href={phoneHref}>
            <Icon name="phone" size={16} />
            {contact.phone}
          </a>
        </li>
        <li>
          <span>
            <Icon name="pin" size={16} />
            {contact.location}
          </span>
        </li>
      </ul>
      <div className="profile-socials">
        <a href={gitHub} target="_blank" rel="noreferrer">
          <ToolIcon name="GitHub" size={26} />
          GitHub
        </a>
        <a href={linkedIn} target="_blank" rel="noreferrer">
          <ToolIcon name="LinkedIn" size={26} />
          LinkedIn
        </a>
      </div>
      <a className="btn btn-primary profile-resume" href="/SaiAdityaResume.pdf" download>
        <Icon name="download" size={16} />
        Download resume
      </a>
    </aside>
  )
}

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total
  const opacity = useTransform(progress, [start, start + 1 / total], [0.25, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

export function About() {
  const introRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: introRef, offset: ['start 85%', 'end 50%'] })
  const words = copy.aboutIntro.split(' ')

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <SectionHead id="about-title" label="About me" file="about.md">
        {copy.aboutTitle[0]}
        <br />
        <span className="muted-title">{copy.aboutTitle[1]}</span>
      </SectionHead>
      <div className="about-layout">
        <ProfileCard />
        <div className="about-main">
          <p className="about-intro" ref={introRef}>
            {words.map((word, index) => (
              <Word key={`${word}-${index}`} word={word} index={index} total={words.length} progress={scrollYProgress} />
            ))}
          </p>
          <h3 className="sub-title">How I think</h3>
          <ol className="think-grid">
            {aboutPoints.map(({ id, title, description }, index) => (
              <li key={id} className="card think-card reveal">
                <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
                <h4>{title}</h4>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <SectionHead id="experience-title" label="Experience" file="experience.log">
        Where I&apos;ve tested
      </SectionHead>
      <ol className="timeline">
        {experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="card job reveal">
            <div className="job-head">
              <p className="job-dates">{job.duration}</p>
              <h3>{job.role}</h3>
              <p className="job-company">{job.company}</p>
              <p className="job-product">{job.product}</p>
            </div>
            <div className="job-body">
              <h4>Responsibilities</h4>
              <ul className="dash-list">
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h4>Testing scope</h4>
              <ul className="tag-list">
                {job.testingScope.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
              <h4>Tools</h4>
              <div className="chip-row">
                {job.tools.map((tool) => (
                  <ToolChip key={tool} name={tool} />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ProjectPreview({ index }: { index: number }) {
  const project = projects[index]
  return (
    <div className={`project-preview preview-${index}`} aria-hidden="true">
      <div className="preview-bar">
        <span />
        <span />
        <span />
        <em>{project.domain}</em>
      </div>
      <div className="preview-body">
        {project.edgeCases.slice(0, 3).map((item) => (
          <span key={item} className="preview-row">
            <span className="preview-check" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Projects() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <SectionHead id="projects-title" label="Selected works" file="projects/*">
        {copy.projectsTitle}
      </SectionHead>
      <ol className="project-grid">
        {projects.map((project, index) => {
          const isOpen = open === project.title
          const panelId = `project-${index}`
          return (
            <motion.li key={project.title} layout="position" transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className={isOpen ? 'card project is-open' : 'card project'}>
              <ProjectPreview index={index} />
              <div className="project-meta-row">
                <h3>{project.title}</h3>
                <ul className="tag-list">
                  {(isOpen ? project.tags : project.tags.slice(0, 3)).map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                  {!isOpen && project.tags.length > 3 && <li className="tag tag-more">+{project.tags.length - 3} more</li>}
                </ul>
              </div>
              <dl className="project-facts">
                <div>
                  <dt>Company</dt>
                  <dd>{project.company}</dd>
                </div>
                <div>
                  <dt>Domain</dt>
                  <dd>{project.domain}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{project.duration}</dd>
                </div>
              </dl>
              <p className="project-desc">{project.description}</p>
              <button type="button" className="btn btn-ghost" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : project.title)}>
                {isOpen ? 'Hide the details' : 'Open the details'}
                <Icon name="arrow" size={16} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    className="project-detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="detail-grid">
                      <div>
                        <h4>Challenges</h4>
                        <ul className="dash-list">
                          {project.challenges.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Approach</h4>
                        <ul className="dash-list">
                          {project.approach.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Edge cases</h4>
                        <ul className="dash-list edge-list">
                          {project.edgeCases.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Outcome</h4>
                        <p>{project.outcome}</p>
                      </div>
                    </div>
                    <h4>Testing scope</h4>
                    <ul className="tag-list">
                      {project.testingScope.map((item) => (
                        <li key={item} className="tag">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <h4>Tools</h4>
                    <div className="chip-row">
                      {project.tools.map((tool) => (
                        <ToolChip key={tool} name={tool} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <SectionHead id="skills-title" label="QA toolkit" file="skills.json">
        What I test with
      </SectionHead>
      <div className="skill-grid">
        {skillGroups.map(({ title, items }) => (
          <div key={title} className="card skill-group reveal">
            <h3>{title}</h3>
            <ul>
              {items.map((item) => (
                <li key={item}>
                  <ToolIcon name={item} size={30} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="stack" id="tech-stack">
        <h3 className="sub-title">Tech stack</h3>
        <ul className="stack-list">
          {techStack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function QaLab() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const scenario = qaScenarios[selected]

  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = (selected + step + qaScenarios.length) % qaScenarios.length
    setSelected(next)
    tabs.current[next]?.focus()
  }

  return (
    <section className="section" id="qa-lab" aria-labelledby="lab-title">
      <SectionHead id="lab-title" label="QA Lab" file="lab/login.spec">
        One login flow, tested six ways
      </SectionHead>
      <div className="card lab">
        <div className="lab-tabs" role="tablist" aria-label="Test scenarios">
          {qaScenarios.map(({ id, label }, index) => (
            <button
              key={id}
              ref={(node) => {
                tabs.current[index] = node
              }}
              type="button"
              role="tab"
              id={`lab-tab-${id}`}
              aria-selected={index === selected}
              aria-controls="lab-panel"
              tabIndex={index === selected ? 0 : -1}
              className={index === selected ? 'is-selected' : undefined}
              onClick={() => setSelected(index)}
              onKeyDown={onKey}
            >
              <span className="lab-status" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
        <div className="lab-panel" id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${scenario.id}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={scenario.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
              <p className="lab-kicker">Test objective</p>
              <h3>{scenario.objective}</h3>
              <dl className="lab-fields">
                <div>
                  <dt>Input</dt>
                  <dd>{scenario.input}</dd>
                </div>
                <div>
                  <dt>Expected result</dt>
                  <dd>{scenario.expected}</dd>
                </div>
                <div>
                  <dt>Potential risk</dt>
                  <dd>
                    <ul className="dash-list">
                      {scenario.risk.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>QA observation</dt>
                  <dd>{scenario.observation}</dd>
                </div>
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section className="section" id="how-i-test" aria-labelledby="process-title">
      <SectionHead id="process-title" label="How I test" file="process.sh">
        Here&apos;s how it works
      </SectionHead>
      <ol className="process">
        {flowSteps.map(({ title, description }, index) => (
          <li key={title} className={`card step step-${index % 3} reveal`}>
            <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function QaAi() {
  return (
    <section className="section qa-ai" id="qa-ai" aria-labelledby="ai-title">
      <SectionHead id="ai-title" label="QA × AI" file="ai.md">
        {copy.aiTitle[0]}
        <br />
        <span className="muted-title">{copy.aiTitle[1]}</span>
      </SectionHead>
      <div className="ai-layout">
        <p className="ai-intro">{copy.aiIntro}</p>
        <div className="card ai-card">
          <h3>In daily use</h3>
          <div className="chip-row ai-tools">
            {aiTools.map((tool) => (
              <ToolChip key={tool} name={tool} size={30} />
            ))}
          </div>
          <h3>Used for</h3>
          <ul className="ai-uses">
            {aiUseCases.map((item) => (
              <li key={item}>
                <Icon name="check" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const { values, errors, sent, update, submit } = useContactForm('contact')

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <SectionHead id="contact-title" label="Contact" file="contact.sh">
        {copy.contactTitle}
      </SectionHead>
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="contact-intro">{copy.contactIntro}</p>
          <ul className="contact-list">
            <li>
              <a href={`mailto:${contact.email}`}>
                <Icon name="mail" size={18} />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={linkedIn} target="_blank" rel="noreferrer">
                <ToolIcon name="LinkedIn" size={22} />
                LinkedIn
              </a>
            </li>
            <li>
              <a href={gitHub} target="_blank" rel="noreferrer">
                <ToolIcon name="GitHub" size={22} />
                GitHub
              </a>
            </li>
            <li>
              <a href={phoneHref}>
                <Icon name="phone" size={18} />
                {contact.phone}
              </a>
            </li>
            <li>
              <span>
                <Icon name="pin" size={18} />
                {contact.location}
              </span>
            </li>
          </ul>
        </div>

        <form className="card contact-form" onSubmit={submit} noValidate>
          {contactFields.map(({ id, label, multiline, type, autoComplete }) => {
            const inputId = `contact-${id}`
            const errorId = `${inputId}-error`
            const error = errors[id]
            const shared = {
              id: inputId,
              name: id,
              value: values[id],
              'aria-invalid': Boolean(error),
              'aria-describedby': error ? errorId : undefined,
              autoComplete,
            }
            return (
              <div key={id} className={`field field-${id}${error ? ' has-error' : ''}`}>
                <label htmlFor={inputId}>{label}</label>
                {multiline ? (
                  <textarea {...shared} rows={5} onChange={(event) => update(id, event.target.value)} />
                ) : (
                  <input {...shared} type={type ?? 'text'} onChange={(event) => update(id, event.target.value)} />
                )}
                {error && (
                  <p id={errorId} className="field-error">
                    {error}
                  </p>
                )}
              </div>
            )
          })}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Send message
              <Icon name="arrow" size={16} />
            </button>
            <p className="form-hint" aria-live="polite">
              {sent ? 'Your email app should now be open with the message ready to send.' : 'Opens your email app with the message filled in.'}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span>Sai Aditya</span>
          <span>{copy.role}</span>
        </div>
        <p className="footer-line">{copy.footerLine}</p>
        <ul className="footer-links">
          {socials.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                download={label === 'Resume' ? true : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="footer-copy">© 2026 Sai Aditya</p>
      </div>
      <p className="footer-giant" aria-hidden="true">
        Sai Aditya
      </p>
    </footer>
  )
}

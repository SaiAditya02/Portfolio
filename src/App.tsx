import { useEffect, useMemo, useState, type FormEvent } from 'react'
import './App.css'
import ThemeSwitcher from './components/ThemeSwitcher'
import profileAvatar from './assets/ChatGPT Image 1.png'
import heroProfileImage from './assets/ChatGPT Image.png'
import {
  aboutPoints,
  experience,
  flowSteps,
  metrics,
  navItems,
  projects,
  qaScenarios,
  skillGroups,
  socials,
  techStack,
} from './data/portfolio'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [selectedScenario, setSelectedScenario] = useState(qaScenarios[0].id)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['top', ...navItems.map(({ href }) => href.slice(1))]
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-110px 0px -60% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const activeScenario = useMemo(
    () => qaScenarios.find((scenario) => scenario.id === selectedScenario) ?? qaScenarios[0],
    [selectedScenario],
  )

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
    if (formState !== 'idle') {
      setFormState('idle')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = 'Please add a subject.'
    }

    if (!formData.message.trim() || formData.message.trim().length < 12) {
      nextErrors.message = 'Please share a bit more detail.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setFormState('error')
      return
    }

    setFormState('loading')

    window.setTimeout(() => {
      setFormState('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 700)
  }

  return (
    <div className="portfolio-shell">
      <div className="portfolio-layout">
        <aside className="profile-sidebar" aria-label="Sai Aditya profile">
          <div className="profile-identity">
            <img className="profile-avatar" src={profileAvatar} alt="Sai Aditya" />
            <div className="profile-copy">
              <span className="profile-role">QA ENGINEER 1</span>
              <h2>SAI ADITYA</h2>
              <p>Hyderabad, India</p>
            </div>
          </div>

          <div className="profile-details">
            <a href="mailto:saiaditya.qa@example.com">
              <span>Email</span>
              <span>saiaditya.qa@example.com</span>
            </a>
            <a href="tel:+919999999999">
              <span>Phone</span>
              <span>+91 99999 99999</span>
            </a>
            <span>
              <span>Location</span>
              <span>Hyderabad, India</span>
            </span>
          </div>

          <div className="profile-socials" aria-label="Social links">
            {socials.filter(({ label }) => label === 'GitHub' || label === 'LinkedIn').map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>
            ))}
          </div>

          <a className="profile-resume-link" href="/resume.pdf" target="_blank" rel="noreferrer">
            DOWNLOAD RESUME <span aria-hidden="true">↗</span>
          </a>
        </aside>

        <div className="portfolio-main">
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top">
            SAI ADITYA
          </a>

          <div className="nav-links">
            {navItems.map(({ label, href }) => (
              <a key={label} href={href} aria-current={activeSection === href.slice(1) ? 'location' : undefined}>
                {label}
              </a>
            ))}
            <ThemeSwitcher />
          </div>

          <a className="resume-link" href="/resume.pdf" target="_blank" rel="noreferrer">
            DOWNLOAD RESUME <span aria-hidden="true">→</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="section-block hero-section" id="top">
          <div className="micro-copy">[01] QA ENGINEER 1 · AI-ASSISTED BUILDER · HYDERABAD, INDIA · 2026</div>

          <div className="status-strip" aria-label="Status indicators">
            <div className="status-chip">
              <span className="label">SYSTEM STATUS</span>
              <span className="state online">● ONLINE</span>
            </div>
            <div className="status-chip">
              <span className="label">QA STATUS</span>
              <span className="state active">● ACTIVE</span>
            </div>
            <div className="status-chip">
              <span className="label">BUILD</span>
              <span className="state">2026.10</span>
            </div>
          </div>

          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">QA ENGINEER × PRODUCT THINKING × AI-ASSISTED TESTING</p>
              <h1>QA Engineer 1</h1>

              <p className="hero-manifesto">
                I test systems. I build with <span>AI.</span> I ship <span>quality.</span>
              </p>

              <p className="lead">
                QA Engineer focused on understanding how products behave, finding what breaks,
                and using AI to build smarter testing workflows.
              </p>

              <div className="cta-row">
                <a className="primary-cta" href="#contact">
                  START A CONVERSATION <span aria-hidden="true">→</span>
                </a>
                <a className="secondary-cta" href="#projects">
                  SEE MY WORK <span aria-hidden="true">→</span>
                </a>
                <a className="secondary-cta" href="/resume.pdf" target="_blank" rel="noreferrer">
                  VIEW RESUME <span aria-hidden="true">→</span>
                </a>
                <a className="secondary-cta" href="/resume.pdf" target="_blank" rel="noreferrer">
                  DOWNLOAD RESUME <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="metrics-grid">
                {metrics.map(({ value, label }) => (
                  <div key={label} className="metric-item">
                    <span className="metric-value">{value}</span>
                    <span className="metric-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual" aria-label="Sai Aditya profile picture">
              <img className="hero-profile-image" src={heroProfileImage} alt="Sai Aditya" />
            </div>
          </div>
        </section>

        <section className="section-block" id="about">
          <div className="section-header">
            <span className="section-label">[02] ABOUT / APPROACH</span>
          </div>

          <div className="about-grid">
            <div>
              <h2>
                I don&apos;t just test features.<br />
                I investigate systems.
              </h2>
            </div>

            <div className="intro-copy">
              <p>
                I work across manual testing, functional validation, regression coverage,
                exploratory investigation, UAT, API testing, automation, performance checks,
                analytics QA and integration testing. My focus is on how the full product behaves
                as a system, not just whether a single screen looks correct.
              </p>
            </div>
          </div>

          <div className="thinking-grid">
            <div className="section-subhead">
              <span className="section-kicker">HOW I THINK</span>
            </div>

            <div className="thinking-steps">
              {aboutPoints.map(({ id, title, description }) => (
                <div key={id} className="thinking-card">
                  <span className="card-index">{String(aboutPoints.indexOf(aboutPoints.find((point) => point.id === id) ?? aboutPoints[0]) + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block" id="experience">
          <div className="section-header">
            <span className="section-label">[03] EXPERIENCE</span>
          </div>

          <div className="timeline">
            {experience.map(({ company, role, duration, product, responsibilities, testingScope, tools }) => (
              <article key={`${company}-${role}`} className="timeline-card">
                <div className="timeline-meta">
                  <span>{company}</span>
                  <span>{duration}</span>
                </div>

                <div className="timeline-header">
                  <div>
                    <h3>{role}</h3>
                    <p>{product}</p>
                  </div>
                </div>

                <div className="timeline-body">
                  <div>
                    <h4>RESPONSIBILITIES</h4>
                    <ul>
                      {responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>TESTING SCOPE</h4>
                    <div className="tag-list">
                      {testingScope.map((item) => (
                        <span key={item} className="tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4>TOOLS</h4>
                    <div className="tag-list">
                      {tools.map((item) => (
                        <span key={item} className="tag muted-tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="projects">
          <div className="section-header">
            <span className="section-label">[04] SELECTED WORK</span>
          </div>

          <h2 className="feature-title">Systems I&apos;ve tested.</h2>

          <div className="project-list">
            {projects.map((project, index) => (
              <details key={project.title} className="project-card" open={index === 0}>
                <summary>
                  <div className="project-summary">
                    <div>
                      <span className="project-index">0{index + 1}</span>
                      <h3>{project.title}</h3>
                    </div>
                    <div className="project-meta">
                      <span>{project.company}</span>
                      <span>{project.duration}</span>
                    </div>
                  </div>
                </summary>

                <div className="project-content">
                  <div className="project-overview">
                    <div>
                      <p className="meta-label">PRODUCT</p>
                      <p>{project.title}</p>
                    </div>
                    <div>
                      <p className="meta-label">DOMAIN</p>
                      <p>{project.domain}</p>
                    </div>
                    <div>
                      <p className="meta-label">ROLE</p>
                      <p>{project.role}</p>
                    </div>
                    <div>
                      <p className="meta-label">DURATION</p>
                      <p>{project.duration}</p>
                    </div>
                  </div>

                  <div className="project-grid">
                    <div>
                      <h4>DESCRIPTION</h4>
                      <p>{project.description}</p>
                    </div>
                    <div>
                      <h4>CHALLENGES</h4>
                      <ul>
                        {project.challenges.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>APPROACH</h4>
                      <ul>
                        {project.approach.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>TOOLS</h4>
                      <div className="tag-list">
                        {project.tools.map((item) => (
                          <span key={item} className="tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4>EDGE CASES</h4>
                      <ul>
                        {project.edgeCases.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>OUTCOME</h4>
                      <p>{project.outcome}</p>
                    </div>
                  </div>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="section-block" id="skills">
          <div className="section-header">
            <span className="section-label">[05] QA TOOLKIT</span>
          </div>

          <div className="skills-grid">
            {skillGroups.map(({ title, items }) => (
              <div key={title} className="skill-group">
                <h3>{title}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block" id="qa-lab">
          <div className="section-header">
            <span className="section-label">[06] QA LAB</span>
          </div>

          <div className="lab-shell">
            <div className="lab-picker" aria-label="QA scenario selector">
              {qaScenarios.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={selectedScenario === id ? 'scenario-button active' : 'scenario-button'}
                  onClick={() => setSelectedScenario(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="lab-panel">
              <div className="lab-header">
                <span className="section-kicker">TEST OBJECTIVE</span>
                <span className="panel-status">[ SYSTEM TESTING SURFACE ]</span>
              </div>

              <h3>{activeScenario.objective}</h3>

              <div className="lab-grid">
                <div>
                  <h4>INPUT</h4>
                  <p>{activeScenario.input}</p>
                </div>
                <div>
                  <h4>EXPECTED RESULT</h4>
                  <p>{activeScenario.expected}</p>
                </div>
                <div>
                  <h4>POTENTIAL RISK</h4>
                  <ul>
                    {activeScenario.risk.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>QA OBSERVATION</h4>
                  <p>{activeScenario.observation}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block" id="how-i-test">
          <div className="section-header">
            <span className="section-label">[07] HOW I TEST</span>
          </div>

          <div className="flow-grid">
            {flowSteps.map(({ title, description }, index) => (
              <div key={title} className="flow-step">
                <span className="flow-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block ai-section" id="qa-ai">
          <div className="section-header">
            <span className="section-label">[08] QA × AI</span>
          </div>

          <div className="ai-layout">
            <div>
              <h2>
                AI doesn&apos;t replace QA thinking.<br />
                It amplifies it.
              </h2>
            </div>

            <div className="ai-copy">
              <p>
                I use AI as a force multiplier for speed, breadth, exploration, reasoning support,
                documentation and test scenario thinking. It helps me expand coverage quickly, draft
                bug reports, reason through requirements and challenge assumptions. Human QA judgment,
                product understanding and critical validation remain essential.
              </p>

              <div className="tool-row">
                <span>ChatGPT</span>
                <span>Claude</span>
                <span>Gemini</span>
              </div>

              <ul className="ai-list">
                <li>Test case generation</li>
                <li>Edge case brainstorming</li>
                <li>Requirement analysis</li>
                <li>Bug report drafting</li>
                <li>Documentation</li>
                <li>Code understanding</li>
                <li>Test scenario exploration</li>
                <li>Test data ideas</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section-block" id="tech-stack">
          <div className="section-header">
            <span className="section-label">[09] TECH STACK</span>
          </div>

          <div className="tech-grid">
            {techStack.map((category) => (
              <div key={category} className="tech-item">
                <span>{category}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block contact-section" id="contact">
          <div className="section-header">
            <span className="section-label">[10] CONTACT</span>
          </div>

          <div className="contact-layout">
            <div>
              <h2>Have a system worth breaking?</h2>
              <p>
                Let&apos;s talk about the product, the problem, or the edge case nobody thought about.
              </p>

              <div className="contact-list">
                <a href="mailto:saiaditya.qa@example.com">Email: saiaditya.qa@example.com</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                <a href="tel:+919999999999">Phone: +91 99999 99999</a>
                <span>Location: Hyderabad, India</span>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="field-row">
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <small>{errors.name}</small>}
                </label>

                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => handleFieldChange('email', event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <small>{errors.email}</small>}
                </label>
              </div>

              <label>
                <span>Subject</span>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(event) => handleFieldChange('subject', event.target.value)}
                  aria-invalid={Boolean(errors.subject)}
                />
                {errors.subject && <small>{errors.subject}</small>}
              </label>

              <label>
                <span>Message</span>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(event) => handleFieldChange('message', event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && <small>{errors.message}</small>}
              </label>

              <button type="submit" className="submit-button" disabled={formState === 'loading'}>
                {formState === 'loading' ? 'SENDING...' : 'SEND MESSAGE →'}
              </button>

              {formState === 'success' && (
                <p className="form-message success" aria-live="polite">
                  Message drafted successfully. Connect this form to your email backend to send live submissions.
                </p>
              )}

              {formState === 'error' && (
                <p className="form-message error" aria-live="polite">
                  Please fix the highlighted fields before sending.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span>SAI ADITYA</span>
          <span>QA ENGINEER 1</span>
        </div>

        <p>Built with curiosity. Tested with intent.</p>

        <div className="footer-links">
          {socials.map(({ label, href }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
              {label}
            </a>
          ))}
        </div>

        <p className="copyright">© 2026 Sai Aditya</p>
      </footer>
        </div>
      </div>
    </div>
  )
}

export default App

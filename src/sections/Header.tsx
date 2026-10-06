import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import Icon from '../components/Icon'
import ThemeMenu from '../components/ThemeMenu'
import ToolIcon from '../components/ToolIcon'
import { navItems } from '../data/portfolio'
import { useThemePreferences } from '../theme/preferences'

function useActiveSection() {
  const [active, setActive] = useState('top')
  useEffect(() => {
    const sections = ['top', ...navItems.map(({ href }) => href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return active
}

function Header() {
  const { style } = useThemePreferences()
  const active = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = navItems.map(({ label, href }) => {
    const isActive = active === href.slice(1)
    return (
      <a key={href} href={href} className={isActive ? 'is-active' : undefined} aria-current={isActive ? 'location' : undefined} onClick={() => setMenuOpen(false)}>
        {isActive && <motion.span className="nav-pill" layoutId="nav-pill" transition={{ type: 'spring', stiffness: 460, damping: 38 }} />}
        <span className="nav-label">{label}</span>
      </a>
    )
  })

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <a className="brand" href="#top">
        {style === 'terminal' ? (
          <>
            <span className="brand-dot" aria-hidden="true" />
            sai-aditya<span className="brand-path">:~/portfolio</span>
          </>
        ) : (
          'Sai Aditya'
        )}
      </a>

      <nav className="site-nav" aria-label="Main">
        <LayoutGroup id="desktop-nav">{links}</LayoutGroup>
      </nav>

      <div className="header-actions">
        <ThemeMenu />
        <a className="btn btn-primary header-resume" href="/SaiAdityaResume.pdf" download>
          <Icon name="download" size={16} />
          <span>Resume</span>
        </a>
        <button type="button" className="menu-button" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((value) => !value)}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Main"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <LayoutGroup id="mobile-nav">{links}</LayoutGroup>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

export function ToolStrip() {
  const tools = ['Jira', 'Postman', 'Razorpay', 'EaseBuzz', 'Moodle', 'Canvas', 'TestRail', 'Confluence', 'Excel', 'Google OAuth', 'Truecaller', 'ChatGPT', 'Claude', 'Gemini']
  return (
    <div className="tool-strip" aria-label="Tools I use">
      <div className="tool-strip-track">
        {[0, 1].map((copyIndex) => (
          <span key={copyIndex} className="tool-strip-run" aria-hidden={copyIndex === 1}>
            {tools.map((tool) => (
              <span key={tool} className="tool-strip-item">
                <ToolIcon name={tool} size={28} />
                {tool}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

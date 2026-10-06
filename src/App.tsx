import { MotionConfig } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import './styles/site.css'
import './styles/lime.css'
import './styles/terminal.css'
import Header, { ToolStrip } from './sections/Header'
import LimeHero from './sections/LimeHero'
import TerminalHero from './sections/TerminalHero'
import { About, Contact, Experience, Footer, Process, Projects, QaAi, QaLab, Skills } from './sections/Sections'
import { useThemePreferences } from './theme/preferences'

function App() {
  const { style } = useThemePreferences()

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className={`site skin-${style}`}>
        <Header />
        <main id="main">
          {style === 'terminal' ? <TerminalHero /> : <LimeHero />}
          <ToolStrip />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <QaLab />
          <Process />
          <QaAi />
          <Contact />
        </main>
        <Footer />
      </div>
      <Analytics />
    </MotionConfig>
  )
}

export default App

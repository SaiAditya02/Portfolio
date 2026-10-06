import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { createTimeline, stagger, utils } from 'animejs'
import Icon from '../components/Icon'
import portrait from '../assets/hero-profile.png'
import { contact, copy, metrics } from '../data/portfolio'

function LimeHero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // The greeting rises, the italic role wipes in like ink, then the portrait lifts into place.
  useLayoutEffect(() => {
    const hero = ref.current
    if (!hero || reduced) return
    const q = (selector: string) => hero.querySelectorAll(selector)
    utils.set(q('.lh-hi'), { opacity: 0, y: 40 })
    utils.set(q('.lh-role'), { clipPath: 'inset(0 100% 0 0)' })
    utils.set(q('.lh-portrait'), { opacity: 0, y: 70 })
    const timeline = createTimeline({ defaults: { ease: 'out(4)' } })
      .add(q('.lh-hi'), { opacity: 1, y: 0, duration: 900 }, 0)
      .add(q('.lh-role'), { clipPath: 'inset(0 0% 0 0)', duration: 1200, ease: 'inOut(3)' }, 250)
      .add(q('.lh-portrait'), { opacity: 1, y: 0, duration: 1100 }, 400)
      .add(q('.lh-metric'), { opacity: [0, 1], y: [14, 0], duration: 700, delay: stagger(80) }, 900)
    return () => {
      timeline.revert()
    }
  }, [reduced])

  return (
    <section className="lime-hero" id="top" ref={ref} aria-labelledby="hero-title">
      <div className="lh-stage">
        <p className="lh-badge">{copy.microcopy}</p>
        <h1 id="hero-title" className="lh-title">
          <span className="lh-hi">Hi, I&apos;m Sai Aditya</span>
          <span className="lh-role">{copy.role}</span>
        </h1>
        <img className="lh-portrait" src={portrait} alt="Illustrated portrait of Sai Aditya" width={1254} height={1254} />

        <p className="lh-pill">
          <span className="lh-dot" aria-hidden="true" />
          Based in {contact.location}
        </p>

        <div className="lh-blurb">
          <p className="lh-manifesto">
            {copy.manifesto[0]} {copy.manifesto[1]} <span>{copy.manifesto[2]}</span>
          </p>
          <p>{copy.lead}</p>
        </div>

        <p className="lh-trust">
          <span className="lh-faces" aria-hidden="true">
            <span>CRM</span>
            <span>PAY</span>
            <span>LMS</span>
          </span>
          <span>
            Testing that covers <strong>10,000+ students</strong> a year across one pipeline.
          </span>
        </p>

        <a className="btn btn-primary lh-cta" href="#contact">
          <Icon name="arrow" size={16} />
          Start a conversation
        </a>
      </div>

      <div className="lh-below">
        <p className="lh-eyebrow">{copy.eyebrow}</p>
        <ul className="lh-metrics" aria-label="Proof from the resume">
          {metrics.map(({ value, label }) => (
            <li key={label} className="lh-metric">
              <strong>{value}</strong>
              <span>{label}</span>
            </li>
          ))}
        </ul>
        <div className="lh-actions">
          <a className="btn btn-ghost" href="#projects">
            See my work
            <Icon name="arrow" size={16} />
          </a>
          <a className="btn btn-ghost" href="/SaiAdityaResume.pdf" target="_blank" rel="noreferrer">
            View resume
            <Icon name="external" size={16} />
          </a>
          <a className="btn btn-primary" href="/SaiAdityaResume.pdf" download>
            <Icon name="download" size={16} />
            Download resume
          </a>
        </div>
      </div>
    </section>
  )
}

export default LimeHero

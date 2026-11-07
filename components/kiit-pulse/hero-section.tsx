import Image from 'next/image'
import { ArrowDownRight, ArrowUpRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="hero-wrap" aria-labelledby="hero-title">
      <div className="hero-card">
        <div className="hero-art" aria-hidden="true">
          <Image
            src="/kiit-pulse-hero.png"
            alt=""
            fill
            priority
            sizes="(max-width: 760px) 100vw, 60vw"
            className="hero-image"
          />
        </div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="live-dot" aria-hidden="true" />
            KIIT STUDENT ACTIVITY CENTRE
          </div>
          <h1 id="hero-title">Campus life,<br />turned <span>all the way up.</span></h1>
          <p className="hero-description">
            Find your people, follow your curiosity, and never miss the next big thing happening across KIIT.
          </p>
          <div className="hero-actions">
            <a className="button button-lime" href="#events">
              Find your next event <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a className="hero-text-link" href="#societies">
              Meet the societies <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-side-note" aria-hidden="true">
          <Sparkles size={15} /> Made for the in-between moments
        </div>
        <div className="hero-stats" aria-label="31 student societies across four interest areas">
          <span className="stats-number">31</span>
          <span className="stats-copy"><strong>societies</strong><br />one campus, endless ways in</span>
          <span className="stats-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
        </div>
        <span className="hero-index" aria-hidden="true">01 / 04</span>
      </div>
      <div className="hero-underbar">
        <span><span className="underbar-star" aria-hidden="true">✳</span> The campus has a side quest for you.</span>
        <span>Scroll a little <ArrowDownRight size={15} aria-hidden="true" /></span>
      </div>
    </section>
  )
}

import { ArrowUpRight, Heart } from 'lucide-react'
import { lastChecked, officialEventsUrl, officialKsacUrl, officialNoticeUrl } from '@/lib/kiit-data'

export function SourceFooter() {
  return (
    <>
      <section className="about-band" id="about" aria-labelledby="about-title">
        <div className="about-decoration" aria-hidden="true">K</div>
        <div className="about-copy">
          <div className="eyebrow about-eyebrow"><span className="eyebrow-line" /> THE PEOPLE BEHIND THE PULSE</div>
          <h2 id="about-title">Your campus.<br /><span>Your call.</span></h2>
          <p>KSAC brings KIIT students together through societies, workshops, cultural programmes and campus-wide events — making room for talent, leadership and ideas to find their people.</p>
        </div>
        <div className="about-links">
          <a href={officialKsacUrl} target="_blank" rel="noreferrer">KSAC home <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href={officialNoticeUrl} target="_blank" rel="noreferrer">Notice board <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href={officialEventsUrl} target="_blank" rel="noreferrer">KIIT event calendar <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" aria-label="KIIT Pulse, back to top">
          <span className="brand-mark" aria-hidden="true">k</span>
          <span className="brand-word">kiit<span>pulse</span></span>
        </a>
        <p>Made with <Heart size={13} fill="currentColor" aria-label="care" /> for campus life.</p>
        <p className="footer-disclaimer">Independent student guide · Information checked {lastChecked}. Confirm current details with official organizers.</p>
      </footer>
    </>
  )
}

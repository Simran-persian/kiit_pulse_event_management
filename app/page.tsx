import { CampusAssistant } from '@/components/kiit-pulse/campus-assistant'
import { EventsSection } from '@/components/kiit-pulse/events-section'
import { HeroSection } from '@/components/kiit-pulse/hero-section'
import { SiteHeader } from '@/components/kiit-pulse/site-header'
import { SocietiesSection } from '@/components/kiit-pulse/societies-section'
import { SourceFooter } from '@/components/kiit-pulse/source-footer'

export default function Page() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <HeroSection />
      <div className="ticker" aria-label="Explore the many sides of campus life">
        <div className="ticker-track" aria-hidden="true">
          {Array.from({ length: 2 }).map((_, copy) => (
            <span className="ticker-group" key={copy}>
              <span>MAKE SOMETHING</span><i>✳</i><span>MEET YOUR PEOPLE</span><i>✳</i><span>BUILD A SIDE QUEST</span><i>✳</i><span>MAKE SOME NOISE</span><i>✳</i>
            </span>
          ))}
        </div>
      </div>
      <EventsSection />
      <SocietiesSection />
      <SourceFooter />
      <CampusAssistant />
    </main>
  )
}


import { ArrowUpRight } from 'lucide-react'
import { ThemeToggle } from '@/components/kiit-pulse/theme-toggle'

export function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <a className="brand" href="#top" aria-label="KIIT Pulse home">
        <span className="brand-mark" aria-hidden="true">k</span>
        <span className="brand-word">kiit<span>pulse</span></span>
      </a>

      <nav className="main-nav" aria-label="Main navigation">
        <a href="#events">Events</a>
        <a href="#societies">Societies</a>
        <a href="#about">About KSAC</a>
      </nav>

      <a className="header-link" href="https://ksac.kiit.ac.in/" target="_blank" rel="noreferrer">
        <span>Official KSAC</span>
        <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
      </a>
      <ThemeToggle />
    </header>
  )
}

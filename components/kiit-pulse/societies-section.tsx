'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, Search, UsersRound } from 'lucide-react'
import { societies, societyCategories, type Society, type SocietyCategory } from '@/lib/kiit-data'

const categoryStyles: Record<SocietyCategory, string> = {
  'Create & express': 'society-create',
  'Think & communicate': 'society-think',
  'Connect & contribute': 'society-connect',
  'Build & experiment': 'society-build',
}

function SocietyCard({ society, index }: { society: Society; index: number }) {
  return (
    <article className={`society-card ${categoryStyles[society.category]}`} style={{ animationDelay: `${(index % 12) * 35}ms` }}>
      <div className="society-card-top">
        <span className="society-mark" aria-hidden="true">{society.mark}</span>
        <span className="society-category-label">{society.category}</span>
      </div>
      <h3>{society.name}</h3>
      <p>{society.description}</p>
      <span className="society-card-arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
    </article>
  )
}

export function SocietiesSection() {
  const [activeCategory, setActiveCategory] = useState<'All' | SocietyCategory>('All')
  const [query, setQuery] = useState('')
  const visibleSocieties = useMemo(() => {
    const search = query.trim().toLowerCase()
    return societies.filter((society) => {
      const matchesCategory = activeCategory === 'All' || society.category === activeCategory
      const matchesSearch = !search || `${society.name} ${society.category} ${society.description}`.toLowerCase().includes(search)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, query])

  return (
    <section className="section societies-section" id="societies" aria-labelledby="societies-title">
      <div className="section-heading societies-heading">
        <div>
          <div className="eyebrow section-eyebrow"><span className="eyebrow-line" /> FIND YOUR PEOPLE</div>
          <h2 id="societies-title">A little bit of<br /><span>everything, actually.</span></h2>
        </div>
        <div className="society-count-card">
          <UsersRound size={20} aria-hidden="true" />
          <span><strong>{societies.length}</strong><small>student societies</small></span>
          <span className="count-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
        </div>
      </div>

      <div className="society-controls">
        <div className="category-filters" role="group" aria-label="Filter societies by interest area">
          <button type="button" className={`category-filter ${activeCategory === 'All' ? 'active' : ''}`} aria-pressed={activeCategory === 'All'} onClick={() => setActiveCategory('All')}>
            All <span>{societies.length}</span>
          </button>
          {societyCategories.map((category) => {
            const count = societies.filter((society) => society.category === category).length
            return (
              <button type="button" className={`category-filter ${activeCategory === category ? 'active' : ''}`} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)} key={category}>
                {category} <span>{count}</span>
              </button>
            )
          })}
        </div>
        <label className="society-search">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search societies</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your thing…" />
        </label>
      </div>

      <div className="societies-grid" aria-live="polite">
        {visibleSocieties.map((society, index) => <SocietyCard key={society.name} society={society} index={index} />)}
      </div>
      {visibleSocieties.length === 0 && (
        <div className="society-empty" role="status">No societies match that search. Try another name or interest.</div>
      )}
      <div className="society-directory-footer">
        <p>One of these sound like your kind of thing? Check the official KSAC channels for current membership and contact details.</p>
        <a className="button button-outline" href="https://ksac.kiit.ac.in/" target="_blank" rel="noreferrer">
          Explore KSAC <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      <div className="initiative-card">
        <div className="initiative-sticker" aria-hidden="true">EXTRA<br />CREDIT</div>
        <div className="initiative-copy">
          <span className="eyebrow initiative-eyebrow">BEYOND THE SOCIETY LIST</span>
          <h3>K-1000 <span>Student R&amp;D initiative</span></h3>
          <p>A research-and-development initiative within the KIIT student activity ecosystem. Keep an eye on official notices for its next build-a-thon.</p>
        </div>
        <a href="https://ksac.kiit.ac.in/notice/" target="_blank" rel="noreferrer" aria-label="Check official KSAC notices for K-1000 updates">
          <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

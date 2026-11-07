'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, CalendarDays, Check, Clock3, MapPin, Search, X } from 'lucide-react'
import { campusEvents, lastChecked, type CampusEvent, type EventStatus } from '@/lib/kiit-data'

type EventFilter = 'all' | EventStatus
type CategoryFilter = 'All categories' | CampusEvent['category']

const filters: { label: string; value: EventFilter }[] = [
  { label: 'Everything', value: 'all' },
  { label: 'Open now', value: 'open' },
  { label: 'Coming up', value: 'upcoming' },
  { label: 'Closed', value: 'closed' },
]

function EventCard({ event, index, onDetails }: { event: CampusEvent; index: number; onDetails: (event: CampusEvent) => void }) {
  const isOpen = event.status === 'open' && Boolean(event.registrationUrl)
  const statusClass = `status-${event.status}`

  return (
    <article className={`event-card ${statusClass}`} style={{ animationDelay: `${index * 70}ms` }}>
      <div className="event-card-top">
        <span className={`event-type type-${event.category.toLowerCase()}`}>{event.category}</span>
        <span className={`event-status ${statusClass}`}>
          {event.status === 'open' ? <Check size={12} aria-hidden="true" /> : <span className="status-dot" aria-hidden="true" />}
          {event.statusText}
        </span>
      </div>
      <div className="event-main">
        <div className="event-date"><CalendarDays size={15} aria-hidden="true" /> {event.date}</div>
        <h3>{event.title}</h3>
        <p className="event-subtitle">{event.subtitle}</p>
        <p className="event-summary">{event.summary}</p>
      </div>
      <div className="event-details">
        <span><span className="detail-label">HOST</span>{event.host}</span>
        <span><MapPin size={14} aria-hidden="true" /><span>{event.venue}</span></span>
      </div>
      <div className="event-card-actions">
        {isOpen ? (
          <a className="button button-dark event-register" href={event.registrationUrl} target="_blank" rel="noreferrer">
            Register now <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        ) : event.status === 'closed' ? (
          <span className="closed-button">Registration closed</span>
        ) : (
          <span className="closed-button upcoming-button">Registration details to confirm</span>
        )}
        <button className="details-button" type="button" onClick={() => onDetails(event)} aria-label={`View details for ${event.title}`}>
          Event details <ArrowUpRight size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

export function EventsSection() {
  const [activeFilter, setActiveFilter] = useState<EventFilter>('all')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All categories')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openCount = campusEvents.filter((event) => event.status === 'open' && event.registrationUrl).length

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (selectedEvent && !dialog.open) dialog.showModal()
    if (!selectedEvent && dialog.open) dialog.close()
  }, [selectedEvent])

  const filteredEvents = useMemo(() => {
    const search = searchQuery.trim().toLowerCase()
    return campusEvents.filter((event) => {
      const matchesStatus = activeFilter === 'all' || event.status === activeFilter
      const matchesCategory = activeCategory === 'All categories' || event.category === activeCategory
      const searchable = `${event.title} ${event.subtitle} ${event.host} ${event.category} ${event.date}`.toLowerCase()
      return matchesStatus && matchesCategory && (!search || searchable.includes(search))
    })
  }, [activeCategory, activeFilter, searchQuery])

  return (
    <section className="section events-section" id="events" aria-labelledby="events-title">
      <div className="section-heading events-heading">
        <div>
          <div className="eyebrow section-eyebrow"><span className="eyebrow-line" /> WHAT&apos;S HAPPENING</div>
          <h2 id="events-title">Don&apos;t hear about it<br /><span>after it happened.</span></h2>
        </div>
        <div className="events-heading-note">
          <div className="open-count"><span className="open-pulse" aria-hidden="true" /> {openCount} verified open registrations</div>
          <p>Checked {lastChecked}. If a sign-up is live, you&apos;ll find the official link right here.</p>
        </div>
      </div>

      <div className="event-toolbar">
        <div className="event-tools-main">
          <div className="filter-tabs" role="group" aria-label="Filter events by registration status">
            {filters.map((filter) => (
              <button
                className={`filter-tab ${activeFilter === filter.value ? 'active' : ''}`}
                key={filter.value}
                type="button"
                aria-pressed={activeFilter === filter.value}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
                {filter.value === 'open' && <span className="tab-count">{openCount}</span>}
              </button>
            ))}
          </div>
          <div className="event-query-controls">
            <label className="event-search">
              <Search size={16} aria-hidden="true" />
              <span className="sr-only">Search events by title, host, date, or category</span>
              <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search events, dates…" />
            </label>
            <label className="event-category-select">
              <span className="sr-only">Filter events by category</span>
              <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value as CategoryFilter)}>
                <option>All categories</option>
                <option>Hackathon</option>
                <option>Conference</option>
              </select>
            </label>
          </div>
        </div>
        <a className="official-notice-link" href="https://ksac.kiit.ac.in/notice/" target="_blank" rel="noreferrer">
          KSAC notice board <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="events-grid" aria-live="polite">
          {filteredEvents.map((event, index) => <EventCard key={event.id} event={event} index={index} onDetails={setSelectedEvent} />)}
        </div>
      ) : (
        <div className="events-empty" role="status">
          <div className="empty-icon"><Clock3 size={21} aria-hidden="true" /></div>
          <div>
            <h3>{activeFilter === 'open' && openCount === 0 ? 'No confirmed sign-ups are open right now.' : 'No events match those filters.'}</h3>
            <p>{activeFilter === 'open' && openCount === 0 ? 'We don\'t show a registration button unless we can point you to an official, active sign-up. Check the KSAC notice board for the latest announcements.' : 'Try another search or category, or browse the official KSAC notice board for updates.'}</p>
          </div>
          <a className="button button-dark" href="https://ksac.kiit.ac.in/notice/" target="_blank" rel="noreferrer">
            Check notices <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      )}

      <p className="events-source-note">
        Event dates and registration states are a checked snapshot, not a live KSAC feed. Always confirm changes on the official source before making plans.
      </p>

      <dialog className="event-dialog" ref={dialogRef} onClose={() => setSelectedEvent(null)} aria-labelledby="event-dialog-title">
        {selectedEvent && (
          <div className="event-dialog-content">
            <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close event details">
              <X size={18} aria-hidden="true" />
            </button>
            <span className={`event-type type-${selectedEvent.category.toLowerCase()}`}>{selectedEvent.category}</span>
            <span className={`event-status status-${selectedEvent.status}`}>
              <span className="status-dot" aria-hidden="true" /> {selectedEvent.statusText}
            </span>
            <div className="event-date dialog-date"><CalendarDays size={16} aria-hidden="true" /> {selectedEvent.date}</div>
            <h3 id="event-dialog-title">{selectedEvent.title}</h3>
            <p className="event-dialog-subtitle">{selectedEvent.subtitle}</p>
            <p className="event-dialog-summary">{selectedEvent.summary}</p>
            <div className="dialog-detail-grid">
              <div><span>ORGANIZER</span><strong>{selectedEvent.host}</strong></div>
              <div><span>LOCATION</span><strong>{selectedEvent.venue}</strong></div>
            </div>
            <div className="dialog-registration-note">
              {selectedEvent.status === 'open' && selectedEvent.registrationUrl
                ? 'Registration is open. Use the official link to secure your place.'
                : selectedEvent.status === 'closed'
                  ? 'Registration is closed for this edition.'
                  : 'The event is upcoming, but an active registration link has not been confirmed.'}
            </div>
            <div className="dialog-actions">
              {selectedEvent.status === 'open' && selectedEvent.registrationUrl ? (
                <a className="button button-dark" href={selectedEvent.registrationUrl} target="_blank" rel="noreferrer">Register now <ArrowUpRight size={15} aria-hidden="true" /></a>
              ) : null}
              <a className="button button-outline" href={selectedEvent.sourceUrl} target="_blank" rel="noreferrer">Official event source <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}

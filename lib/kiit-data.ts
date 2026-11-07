export type SocietyCategory =
  | 'Create & express'
  | 'Think & communicate'
  | 'Connect & contribute'
  | 'Build & experiment'

export type Society = {
  name: string
  category: SocietyCategory
  description: string
  mark: string
}

export const societyCategories: SocietyCategory[] = [
  'Create & express',
  'Think & communicate',
  'Connect & contribute',
  'Build & experiment',
]

export const societies: Society[] = [
  { name: 'Kalakaar', category: 'Create & express', description: 'Theatre, acting & stagecraft', mark: 'KA' },
  { name: 'Korus', category: 'Create & express', description: 'Choral music & live performance', mark: 'KO' },
  { name: 'Kreative Eye', category: 'Create & express', description: 'Photography & visual storytelling', mark: 'KE' },
  { name: 'Kzarshion', category: 'Create & express', description: 'Fashion, styling & creative expression', mark: 'KZ' },
  { name: 'Keurig', category: 'Create & express', description: 'Creative ideas, people & campus culture', mark: 'KU' },
  { name: 'KIIT Film Society', category: 'Create & express', description: 'Cinema, conversation & film culture', mark: 'KF' },
  { name: 'Kraftovity', category: 'Create & express', description: 'Hands-on art, craft & creative making', mark: 'KR' },
  { name: 'SPIC MACAY', category: 'Create & express', description: 'Classical arts & Indian cultural heritage', mark: 'SM' },
  { name: 'Qutopia', category: 'Think & communicate', description: 'Quizzing, curiosity & knowledge', mark: 'QU' },
  { name: 'Kronicle', category: 'Think & communicate', description: 'Literature, debate & critical thought', mark: 'KR' },
  { name: 'Kalliope', category: 'Think & communicate', description: 'Poetry, spoken word & literature', mark: 'KL' },
  { name: 'KIIT Wordsmith', category: 'Think & communicate', description: 'Writing, storytelling & language', mark: 'KW' },
  { name: 'Khwahishein', category: 'Think & communicate', description: 'Hindi literature, poetry & performance', mark: 'KH' },
  { name: 'TEDx-KU', category: 'Think & communicate', description: 'Ideas worth sharing, from campus voices', mark: 'TX' },
  { name: 'MUN-SOC', category: 'Think & communicate', description: 'Model UN, diplomacy & global issues', mark: 'MU' },
  { name: 'Khwaab', category: 'Connect & contribute', description: 'Social impact & community engagement', mark: 'KB' },
  { name: 'Kamakshi & HeForShe', category: 'Connect & contribute', description: 'Gender equity & student advocacy', mark: 'KH' },
  { name: 'KIIT International Student Society', category: 'Connect & contribute', description: 'International culture & connection', mark: 'IS' },
  { name: 'Kimaya', category: 'Connect & contribute', description: 'Culture, creativity & campus community', mark: 'KI' },
  { name: 'Kraya & Kuber', category: 'Connect & contribute', description: 'Commerce, finance & enterprise', mark: 'KK' },
  { name: 'KIIT Animal & Environment Welfare Society', category: 'Connect & contribute', description: 'Animal welfare & environmental action', mark: 'AE' },
  { name: 'Enactus', category: 'Connect & contribute', description: 'Social entrepreneurship & sustainable ventures', mark: 'EN' },
  { name: 'KSHITIJ', category: 'Connect & contribute', description: 'Outreach, inclusion & community support', mark: 'KS' },
  { name: 'Konnexions', category: 'Build & experiment', description: 'Technology, coding & professional growth', mark: 'KN' },
  { name: 'KIIT Robotics Society', category: 'Build & experiment', description: 'Robotics, automation & hands-on engineering', mark: 'RS' },
  { name: 'KIIT Electrical Society', category: 'Build & experiment', description: 'Electrical engineering & emerging technology', mark: 'ES' },
  { name: 'KIIT Automobile Society', category: 'Build & experiment', description: 'Mobility, vehicles & automotive engineering', mark: 'AS' },
  { name: 'Apogeio', category: 'Build & experiment', description: 'Astronomy, space & the science beyond campus', mark: 'AP' },
  { name: 'KIIT Society for Civil Engineers', category: 'Build & experiment', description: 'Civil engineering, infrastructure & design', mark: 'CE' },
  { name: 'CyberVault', category: 'Build & experiment', description: 'Cybersecurity, ethical computing & digital safety', mark: 'CV' },
  { name: 'IoT Lab', category: 'Build & experiment', description: 'Connected devices & embedded systems', mark: 'IO' },
]

export type EventStatus = 'upcoming' | 'open' | 'closed'

export type CampusEvent = {
  id: string
  title: string
  subtitle: string
  date: string
  dateSort: string
  category: 'Hackathon' | 'Conference'
  host: string
  venue: string
  status: EventStatus
  statusText: string
  summary: string
  sourceUrl: string
  registrationUrl?: string
}

export const campusEvents: CampusEvent[] = [
  {
    id: 'iihtc-2026',
    title: 'IIHTC 2026',
    subtitle: 'Innovations in Technology for Humanity',
    date: '17 Dec 2026 — 19 Feb 2027',
    dateSort: '2026-12-17',
    category: 'Conference',
    host: 'KIIT Deemed to be University',
    venue: 'Campus-6 Auditorium, KIIT',
    status: 'upcoming',
    statusText: 'Upcoming · registration details to confirm',
    summary: 'A global forum on technology for humanitarian action. KIIT lists the event on its official calendar; confirm participation details with the organizer.',
    sourceUrl: 'https://kiit.ac.in/events/',
  },
  {
    id: 'ignithon-2',
    title: 'IGNITHON 2.0',
    subtitle: '12-hour offline hackathon',
    date: '26 Sep 2026',
    dateSort: '2026-09-26',
    category: 'Hackathon',
    host: 'K-1000 · KIIT',
    venue: 'KIIT, Bhubaneswar',
    status: 'closed',
    statusText: 'Event concluded · registration closed',
    summary: 'The 2026 edition has passed. Registration is closed; watch official KIIT and K-1000 channels for a future edition.',
    sourceUrl: 'https://ksac.kiit.ac.in/notice/',
  },
  {
    id: 'hsil-2026',
    title: 'Harvard HSIL Hackathon',
    subtitle: 'Building high-value health systems with AI',
    date: '10–11 Apr 2026',
    dateSort: '2026-04-10',
    category: 'Hackathon',
    host: 'Harvard Health Systems Innovation Lab · KIIT',
    venue: 'KIIT, Bhubaneswar',
    status: 'closed',
    statusText: 'Event concluded · registration closed',
    summary: 'The 2026 hackathon has concluded. The reported registration deadline was 28 Feb 2026; no active sign-up link is available for this edition.',
    sourceUrl: 'https://kiit.ac.in/events/',
  },
  {
    id: 'icdcit-2026',
    title: 'ICDCIT Hackathon 2026',
    subtitle: 'Distributed computing & intelligent technology',
    date: '17 Jan 2026',
    dateSort: '2026-01-17',
    category: 'Hackathon',
    host: 'KIIT · ICDCIT',
    venue: 'KIIT, Bhubaneswar',
    status: 'closed',
    statusText: 'Event concluded · registration closed',
    summary: 'The hackathon took place alongside the 22nd ICDCIT conference. The proposal deadline and event date have both passed.',
    sourceUrl: 'https://kiit.ac.in/events/',
  },
]

export const lastChecked = '7 Nov 2026'
export const officialKsacUrl = 'https://ksac.kiit.ac.in/'
export const officialNoticeUrl = 'https://ksac.kiit.ac.in/notice/'
export const officialEventsUrl = 'https://kiit.ac.in/events/'

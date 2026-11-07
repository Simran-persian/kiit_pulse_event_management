import { campusEvents, lastChecked, societies, type Society } from '@/lib/kiit-data'

const societyStopWords = new Set([
  'what', 'which', 'where', 'when', 'with', 'about', 'campus', 'there', 'kind', 'society', 'societies',
  'clubs', 'club', 'help', 'pick', 'choose', 'recommend', 'suggest', 'find', 'good', 'best', 'for', 'your',
  'me', 'please', 'tell', 'show', 'have', 'exists', 'any', 'like', 'want', 'into', 'the', 'and', 'that',
])

const interests: { terms: string[]; matches: string[] }[] = [
  { terms: ['photo', 'camera', 'visual', 'picture'], matches: ['photography', 'visual'] },
  { terms: ['theatre', 'theater', 'acting', 'drama'], matches: ['theatre', 'acting'] },
  { terms: ['music', 'sing', 'song', 'choir'], matches: ['music', 'choral'] },
  { terms: ['dance', 'dancing'], matches: ['dance'] },
  { terms: ['code', 'coding', 'software', 'program', 'technology', 'tech'], matches: ['technology', 'coding'] },
  { terms: ['robot', 'robotics', 'automation'], matches: ['robotics', 'automation'] },
  { terms: ['write', 'writing', 'poetry', 'literature', 'book', 'reading'], matches: ['writing', 'poetry', 'literature'] },
  { terms: ['debate', 'mun', 'diplomacy', 'quiz', 'quizzing'], matches: ['debate', 'diplomacy', 'quizzing'] },
  { terms: ['volunteer', 'social', 'community', 'outreach', 'environment', 'animal', 'welfare'], matches: ['social impact', 'community', 'outreach', 'environment', 'welfare'] },
  { terms: ['finance', 'business', 'commerce', 'startup', 'entrepreneur'], matches: ['finance', 'commerce', 'enterprise'] },
  { terms: ['fashion', 'style'], matches: ['fashion', 'styling'] },
  { terms: ['film', 'movie', 'cinema'], matches: ['film', 'cinema'] },
  { terms: ['space', 'astronomy', 'stars'], matches: ['astronomy', 'space'] },
  { terms: ['electric', 'electrical'], matches: ['electrical'] },
  { terms: ['car', 'automobile', 'vehicle'], matches: ['automotive', 'vehicles'] },
]

function findSocietyMatches(question: string): Society[] {
  const normalized = question.toLowerCase()
  const terms = new Set(
    normalized.match(/[a-z0-9]+/g)?.filter((term) => term.length > 3 && !societyStopWords.has(term)) ?? [],
  )
  const matchTerms = interests
    .filter((interest) => interest.terms.some((term) => normalized.includes(term)))
    .flatMap((interest) => interest.matches)
  const keywords = [...new Set([...terms, ...matchTerms])]

  return societies
    .map((society) => {
      const searchable = `${society.name} ${society.category} ${society.description}`.toLowerCase()
      const score = keywords.reduce((total, keyword) => total + (searchable.includes(keyword) ? 1 : 0), 0)
      return { society, score }
    })
    .filter(({ score }) => score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, 3)
    .map(({ society }) => society)
}

export function getOfflineCampusAnswer(question: string): string | null {
  const normalized = question.toLowerCase().trim()

  if (/^(hi|hello|hey|hiya|namaste)[!.\s]*$/.test(normalized)) {
    return 'Hey! I can help you find a society, check the campus event snapshot, or get to official KIIT updates. What are you looking for?'
  }

  if (/registration|register|sign.?up|open now|applications?/.test(normalized)) {
    const openEvents = campusEvents.filter((event) => event.status === 'open' && event.registrationUrl)
    if (openEvents.length === 0) {
      return `There are no confirmed open registrations in the KIIT Pulse snapshot checked ${lastChecked}. I only show a sign-up when an official active link is verified. Check the latest KSAC notices: https://ksac.kiit.ac.in/notice/`
    }

    return `These registrations are marked open in the snapshot checked ${lastChecked}:\n${openEvents.map((event) => `${event.title} — ${event.date}: ${event.registrationUrl}`).join('\n')}\nPlease confirm details with the organizer before applying.`
  }

  if (/hackathon|conference|\bevents?\b|what.?s happening|upcoming/.test(normalized)) {
    let listedEvents = campusEvents
    if (/hackathon/.test(normalized)) listedEvents = listedEvents.filter((event) => event.category === 'Hackathon')
    if (/conference/.test(normalized)) listedEvents = listedEvents.filter((event) => event.category === 'Conference')
    if (/upcoming|future|next/.test(normalized)) listedEvents = listedEvents.filter((event) => event.status === 'upcoming' || event.status === 'open')

    if (listedEvents.length === 0) {
      return `I don't have a matching event in the snapshot checked ${lastChecked}. Check the official KIIT event calendar for the latest listings: https://kiit.ac.in/events/`
    }

    const eventLines = listedEvents.map((event) => `${event.title} — ${event.date}. ${event.statusText}.`)
    return `Here's what the KIIT Pulse snapshot shows (checked ${lastChecked}):\\n${eventLines.join('\\n')}\\nConfirm any changes with the official listings: https://kiit.ac.in/events/`
  }

  if (/societ|club|join|photograph|camera|coding|robot|poetry|theatre|theater|volunteer/.test(normalized)) {
    const matches = findSocietyMatches(normalized)
    if (matches.length > 0) {
      return `Based on that interest, take a look at ${matches.map((society) => `${society.name} — ${society.description}`).join('; ')}. Membership details change, so check with KSAC for current recruitment information: https://ksac.kiit.ac.in/`
    }

    const categories = [...new Set(societies.map((society) => society.category))]
    return `KIIT Pulse lists ${societies.length} societies across ${categories.join(', ')}. Tell me a little about what you enjoy—like coding, photography, writing, or volunteering—and I can suggest a few. For current membership updates, check https://ksac.kiit.ac.in/`
  }

  return null
}

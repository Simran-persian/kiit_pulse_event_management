# KIIT Pulse

KIIT Pulse helps students find what is happening around campus. Browse curated events, explore student societies, and ask Pulse for practical answers based on a dated campus information snapshot.

## What you can do

- Browse campus events and see whether they are upcoming, open for registration, or concluded.
- Explore student societies across creative, communication, community, and technology-focused categories.
- Ask Pulse questions about the listed events and societies. The assistant is instructed to stick to the supplied campus snapshot and point to official sources when details are missing.
- Switch between light and dark themes; your preference is saved in a cookie.

> **Information note:** Event and society details are maintained in the repository, not fetched as a live campus feed. Check the linked official source before making plans or registering.

## Tech stack

- [Next.js 16](https://nextjs.org) App Router and [React 19](https://react.dev)
- TypeScript and Tailwind CSS 4
- [Vercel AI SDK](https://ai-sdk.dev) with Vercel AI Gateway for Pulse
- Vercel Analytics in production

## Getting started

This project uses [pnpm](https://pnpm.io). Install the dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

To create and run a production build locally:

```bash
pnpm build
pnpm start
```

The AI assistant uses Vercel AI Gateway. Gateway authentication is provided automatically in v0 previews and Vercel deployments; local development outside those environments may require configuring Gateway access.

## Campus information

The event and society snapshot lives in [`lib/kiit-data.ts`](lib/kiit-data.ts). When updating it:

1. Verify event details and links against an official KIIT or KSAC source.
2. Update `lastChecked` so readers know when the snapshot was reviewed.
3. Mark registration as open only when there is a confirmed official registration URL. Remove or omit the URL when registration is not open.

The assistant also directs students to these official sources:

- [KSAC](https://ksac.kiit.ac.in/)
- [KSAC notices](https://ksac.kiit.ac.in/notice/)
- [KIIT events](https://kiit.ac.in/events/)

## Project structure

```text
app/                    Next.js routes, layout, and chat API
components/kiit-pulse/  Page sections and campus assistant UI
lib/kiit-data.ts        Curated campus events and society snapshot
```

## Continue in v0

This repository is connected to a [v0](https://v0.app) project. Open it to keep building:

[Continue working on KIIT Pulse](https://v0.app/chat/projects/prj_52Ho8ZPOStcbgKX8bhdVPYHHOO25)

# PRD — haykerman.com
**Version:** 1.0  
**Owner:** Hayk Martirosyan  
**Handle:** @TheHaykerman  
**Status:** Draft
---
## 1. Purpose & framing
haykerman.com is not a portfolio. It's a digital home — the place that answers the question "who is this person?" before anyone gets on a call, replies to a DM, or hires you for anything. It needs to feel *authored*, not assembled. The site should feel like Hayk built it for himself and it happens to be public — not built for visitors with Hayk as an afterthought.
Audiences, in rough priority order:
1. **Potential clients** — western companies looking for a senior remote engineer they can trust with real ownership. They need to read competence and taste quickly.
2. **Fellow builders** — indie devs, makers, people who might collaborate, share tools, or just get the vibe.
3. **X followers** — people who found @TheHaykerman and want to know if there's more. There should be more.
4. **Future employers** — full-time remote roles; they need a fuller picture than LinkedIn gives.
5. **Myself** — a place to think in public, track what I'm building, and have a URL worth being proud of.
---
## 2. Core design direction
### 2.1 Aesthetic
**Dark terminal — but human.**
Not a cliché hacker green-on-black screensaver. The terminal aesthetic is the scaffolding, not the personality. Think: dark background (near-black, not pure black — something with warmth or a faint tint), monospace type used *intentionally* (not everywhere — just for code-adjacent moments, timestamps, labels), and a single sharp accent color that feels chosen, not defaulted to.
Reference anchors:
- The specificity of a well-configured Neovim setup
- The restraint of a good README
- The warmth of a handwritten log in a plain notebook
**What it is not:** Matrix rain. Purple gradients. Glassmorphism cards. Neon glow. Generic "developer portfolio" with floating geometric shapes.
### 2.2 Typography
Two fonts, max:
- **Display / headings:** A serif or slab-serif with character (e.g. something in the Playfair / Lora family, or an unexpected choice like DM Serif Display). The contrast between a warm serif and a dark terminal environment is the move — it signals a person, not just a dev.
- **Body:** A monospace or mono-adjacent font for code/labels; a clean humanist sans for prose.
Avoid: Inter, Roboto, Space Grotesk, Geist (overused), anything that screams "I used a template."
### 2.3 Color
- **Background:** `#0e0e0e` or a near-black with a very subtle warm or cool tint (not pure `#000`)
- **Text:** Off-white (`#e8e4dc` range) — not stark white
- **Accent:** One color, used sparingly. Options: amber/ochre, a desaturated teal, a muted rust. Should feel *chosen*, not defaulted. No blue unless it's very specific.
- **Secondary surfaces:** Slightly lighter than background for cards/containers — subtle, not boxy
- **No light mode.** Dark is the default and only mode. It's a design statement, not a laziness.
### 2.4 Motion & texture
- Subtle scan line or grain texture on the background (CSS only, low opacity) — adds physical quality without being try-hard
- Cursor: custom (a blinking terminal cursor `_` or `|` that follows the pointer, subtly)
- Page transitions: minimal — a fast fade or slide, not a production
- Hover states: intentional — underlines that draw, text that shifts color, not scale transforms
- No scroll-jacking. Smooth scroll, that's it.
### 2.5 Layout
- Single column, generous line length (~65–75ch)
- Navigation: minimal — either a fixed left sidebar (desktop) or a sparse top bar with just the logo/name and 4–5 links
- No hero image of Hayk's face (unless he chooses to include it — but it's not required)
- Grid-breaking moments are allowed: a project card that bleeds edge-to-edge, a pull quote that sits at an angle, a timestamp in monospace anchored to the right while the title runs left
---
## 3. Pages & sections
### 3.1 Home / hero
**Goal:** Orient the visitor in under 5 seconds. Who is this, what do they do, why should I keep reading.
**Content:**
- Name: `Hayk Martirosyan` — displayed large, possibly with a subtle typewriter-in effect on first load
- One-line descriptor — something true and specific. Not "Full-Stack Developer." Something like:
  > `engineer. builder. thinking out loud.`
  or a rotating set of 2–3 lines that cycle slowly
- Short bio blurb (2–3 sentences max): craft + care for the work, 9 years of full-stack, currently building things at the intersection of tools and clarity
- Quick-glance links: `Projects` / `Writing` / `Now` / `Contact`
- Optional: a terminal-style "status" block in the corner — e.g.:
  ```
  status:   building ByeCycle
  location: Yerevan, Armenia
  open to:  contracts / collabs
  ```
**Notes:**
- No stock photos. No hero illustration unless it's genuinely custom.
- If there's a photo of Hayk, it should feel candid or intentional — not a LinkedIn headshot.
---
### 3.2 About
**Goal:** The full picture. Not a CV. Not a brag sheet. A person.
**Content structure:**
1. **The work** — 9 years full-stack, 6 at Tidepool Labs (remote, US-based team), technical leadership, full-stack architecture ownership. Core stack: React Native, Next.js, Supabase, Tailwind, Claude API. Currently navigating the shift toward more independent work — contracting, building for himself.
2. **The builder** — Kayoon Studio as informal publishing house. Darack (live on App Store). ByeCycle in development. Silly City. Prompt Coach. A pattern: building things that reduce friction so attention goes back to what matters.
3. **The person** — brief, honest, not performative. Plays guitar (acoustic; learning electric). Engages analytically with film and anime. Based in Yerevan. Thinks in systems. Reaches out less than he should; builds more than most.
4. **Currently** — light section on what he's focused on right now (can be the same as /now, or link to it)
**Notes:**
- Written in first person, direct voice
- No bullet-point résumé style — flowing prose broken by occasional section markers
- This page should feel like meeting Hayk for coffee, not reading a LinkedIn profile
---
### 3.3 Projects
**Goal:** Show range, depth, and intentionality. Every project should communicate *why* it was built, not just what it is.
**Layout:** A curated list — not a grid of cards with screenshots. Each entry has:
- Name + one-line description
- Status badge: `live` / `in development` / `archived` / `paused`
- Short "why I built it" paragraph (2–4 sentences)
- Tech stack (monospace, small)
- Links: repo / live / App Store / writeup
**Projects to include:**
| Project | Status | Notes |
|---|---|---|
| Darack | Live (App Store) | Free media tracker. First public app under Kayoon Studio. |
| ByeCycle | In development | Mental clarity app for resolving open loops. The "open cycle" framing is worth explaining. |
| Silly City | In development | Real-time 3D social neighborhood for a Discord group. Scope: React Three Fiber, Colyseus, Supabase. |
| Silly Quiz | In development | Self-vs-group-perception quiz. Built for the same tight-knit group. |
| Prompt Coach | In development | Claude Code analytics dashboard. Local Express + SQLite. Hook-native architecture. |
| AI Dev Workflow Automation | In progress | Intake Agent → Linear → Watcher/Executor → GitHub PRs via Claude Code SDK. |
**Notes:**
- Kayoon Studio should be referenced but doesn't need its own page — it lives naturally under projects/apps
- "In development" projects should be included — the point is showing *what Hayk is building*, not just what shipped
- Projects can have a "read more" that expands or links to a blog post
---
### 3.4 Apps (Kayoon Studio)
**Goal:** A focused showcase of released/app-store apps, separate from the broader project list.
**Content:**
- Brief intro to Kayoon Studio — informal publishing imprint, apps built for real people with real use cases
- Darack: app icon, description, App Store link, what makes it different
- ByeCycle: coming soon — with the concept explained well enough to generate interest
**Layout:** Clean app-store-style entries. App icon, name, one-liner, platform badges, link.
**Notes:**
- This section grows as apps ship. Keep it sparse and high-quality rather than padded.
- Can be a sub-section of Projects or a standalone page depending on how many apps exist at launch
---
### 3.5 Blog / Writing
**Goal:** Sporadic, substantive, worth reading. Not a content machine.
**Cadence:** Deep dives when there's something worth saying. No obligation to post on a schedule.
**Content pillars** (based on Hayk's natural voice and interests):
1. **Builder logs** — what he's building, decisions made, things that broke, things that clicked
2. **Tool/workflow thinking** — AI dev workflows, Claude Code, the infrastructure of building alone
3. **Contrarian takes** — tech opinion pieces with a point of view (mirrors his X content but longer)
4. **Film/anime analysis** — occasional; analytical lens, not casual reviews
5. **The personal** — selective, rare, but the pieces that make a site feel human
**Format:**
- Each post: title, date (monospace), estimated read time, tag(s), full prose
- No newsletter opt-in at launch unless Hayk wants one
- RSS feed included (technical readers expect it)
- Archive page: chronological list, title + date + 1-line summary
**Notes:**
- Cross-post strategy: X posts are the short form; blog is the long form. Some blog posts should originate from expanded X threads.
- Writing should sound like Hayk — dry, specific, not trying to be inspirational
---
### 3.6 Now
**Goal:** Tell people what's actually happening right now. Not what happened, not what might happen.
**Format:** A single, regularly updated page. Inspired by Derek Sivers' /now page movement.
**Content (living, updated manually):**
- What he's building right now
- What he's reading / watching
- What he's thinking about
- Where he's at professionally (open to contracts? in a role? looking?)
- Last updated: [date] (monospace timestamp, always visible)
**Notes:**
- This page should feel like a status update from a person you follow, not a marketing page
- Low polish is fine here — the value is freshness and honesty
- Should be easy to update (consider a simple markdown file as the source)
---
### 3.7 Contact
**Goal:** Make it easy to reach Hayk without creating noise.
**Content:**
- Short line: what kinds of things he's open to (contracts, collabs, conversations)
- Email: linked directly — no contact form
- X: @TheHaykerman
- GitHub: linked
- LinkedIn: linked (secondary)
**Notes:**
- No contact form. Direct links only. Reduces friction, filters low-effort outreach.
- Optional: a brief note on response time / what he responds to, to set expectations
---
## 4. Technical requirements
### 4.1 Stack (recommended)
- **Framework:** Next.js (App Router) — Hayk knows it well, SSG/ISR for blog, good ecosystem
- **Styling:** Tailwind CSS + custom CSS for the terminal texture/effects
- **Content:** MDX for blog posts (write in markdown, embed components)
- **Deployment:** Vercel (already connected)
- **Analytics:** Plausible or Fathom — privacy-first, no cookie banner
- **Fonts:** Google Fonts or self-hosted via `next/font`
### 4.2 Performance
- Lighthouse score target: 90+ on all metrics
- No heavy JS on initial load — the terminal aesthetic doesn't need a framework's worth of animation
- Images: `next/image`, WebP, lazy loaded
- Blog: statically generated at build time
### 4.3 SEO
- `<meta>` tags and Open Graph for all pages
- Blog posts get individual OG images (can be generated with `@vercel/og`)
- Structured data for articles (JSON-LD)
- `sitemap.xml` + `robots.txt`
- Domain: haykerman.com — no www redirect needed, canonical set
### 4.4 Accessibility
- Semantic HTML throughout
- Keyboard navigable
- Sufficient color contrast even in dark mode (WCAG AA minimum)
- `aria-label` on icon-only links
---
## 5. Content tone of voice
Across all pages, Hayk's voice should be:
- **Direct** — says what it means without hedging
- **Specific** — concrete details over vague generalities ("6 years at Tidepool Labs" not "years of experience")
- **Dry** — wit is present but not performed. The funny line earns its place.
- **Human** — not a brand, not a product, a person who builds things and thinks about them
- **Not humble-braggy** — the work speaks; the copy doesn't oversell it
Things to avoid in copy:
- "Passionate about..." / "I love..." (show, don't tell)
- Buzzword stacking ("full-stack developer specializing in scalable solutions")
- Exclamation points (unless ironic)
- Generic mission statements
---
## 6. Identity signals (must-haves)
These are the details that make haykerman.com feel like *Hayk's site*, not anyone's site:
- **Yerevan, Armenia** — mentioned somewhere. Not hidden.
- **Kayoon Studio** — named and explained.
- **The "open cycles" concept** — ByeCycle's core idea is worth a sentence; it shows how he thinks.
- **Plays guitar** — one line, somewhere. The non-dev detail that humanizes.
- **@TheHaykerman** — X handle prominent; the site and the account should feel like the same person.
- **The /now page** — signals someone actively alive and thinking, not someone who built a site and left.
- **Custom cursor or terminal detail** — one small flourish that says "he built this himself."
---
## 7. Launch scope
### V1 (launch)
- [ ] Home / hero
- [ ] About
- [ ] Projects (all 6 above, even WIP ones)
- [ ] Apps / Kayoon Studio
- [ ] Now page
- [ ] Contact page
- [ ] Basic blog (3–5 seed posts minimum before launch)
- [ ] RSS feed
- [ ] Dark mode (only mode)
- [ ] Mobile responsive
- [ ] Deployed to haykerman.com via Vercel
### V2 (post-launch)
- [ ] OG image generation per blog post
- [ ] Blog archive with tags/filtering
- [ ] Possible: X feed embed or curated posts section
- [ ] Possible: newsletter if blog gets traction
- [ ] Possible: hire me / work together CTA if contracting picks up
---
## 8. Success metrics
This is a personal site, not a product. Success looks like:
- **Qualitative:** When someone reads it, they feel like they know Hayk — competent, opinionated, human
- **Professional:** At least one inbound contract or job conversation referencing the site in 6 months
- **Writing:** At least 3 posts published in the first 3 months
- **Pride:** Hayk actually wants to share the URL
---
## 9. Non-goals
- A light mode (dark only, by design)
- A contact form
- A newsletter at launch
- Animations that get in the way of reading
- Anything that requires a CMS to update (MDX files are enough)
- A "hire me" landing page (it's a human site, not a freelance marketplace listing)
- AI-generated copy anywhere on the site
---
*Last updated: June 2026*

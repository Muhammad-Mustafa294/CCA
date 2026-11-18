# CLAUDE.md

Context for anyone — human or Claude — working in this repo.

## What this is

A **clickable prototype** of a rebuilt `cca.lums.edu.pk`, built by a four-person LUMS student team ("OS-Victims") bidding for a **paid contract** from the LUMS Office of Co-Curricular Activities (CCA) to rebuild their website.

This repo is the prototype we demo. It is **not** the final product. The real build will be WordPress (see *Roadmap*).

- **Live:** https://muhammad-mustafa294.github.io/CCA/
- **Client contact:** Ayesha Arshad, Program Development Associate, CCA (OSA | LUMS)
- **Pitch:** 19 November 2026, 3 PM, LLI Boardroom (MGSHSS). Idea first, then this prototype.
- **Target launch of the real site:** late February 2027

### The team

| Name | Roll | Society | Role |
|---|---|---|---|
| Muhammad Mustafa | 28100414 | TES | Project coordinator, developer |
| Maha Aurangzeb | 28100312 | LCS | Design (UI/UX), developer |
| Khadija Khalid | 28100271 | SPADES | Content and research |
| Zahrah Masood | 28100280 | LES | QA and handover |

## The core idea

**Do not treat this as a website redesign.** The current site isn't failing because it looks dated — it's failing because information only flows *out*, and only when a human retypes it. The actual work of CCA (approving events, booking the auditorium, clearing PR, signing off sponsorships) happens in Outlook, where it has no status, no reference number and no memory across council handovers. The two never connect. That's why the homepage's "Featured Event" is from January.

So the product has two halves that are one idea:

- **Inward** — societies sign in and send CCA a request. Six types: venue booking, PR, event proposal, equipment/logistics, sponsorship/NOC, profile update. Each gets a reference (`CCA-AUD-0413`) and a live status.
- **Outward** — the public site is a *byproduct* of those decisions. CCA approves an event once and it appears on the calendar, the society page and the homepage automatically.

The pitch line: **"Approve once, publish everywhere."**

The objection-killer: **email does not go away.** Every request and decision still emails `cca@lums.edu.pk` and the society with the reference attached. The portal gives that correspondence a spine; it doesn't replace Outlook.

Two demo moments carry the whole pitch:
1. **The clash check** — booking Main Auditorium on 18 Feb, 6–9 PM surfaces LUMUN's existing 17:00–21:00 hold *before* submission. Email cannot do that.
2. **Approve once, publish everywhere** — submit an event in the portal, approve it as staff, switch to the public Events Calendar, it's there.

## What we found in the audit (the evidence base)

Captured 30 October 2026 from the live site. Use these, don't re-derive them:

- The homepage "Featured Event" is LUMUN 2026, **13–15 January** — in a year with 300+ events.
- Searching the society directory for **"chess" returns nothing**, though LUMS Chess Club is listed on the same page. Search matches full names only; no categories.
- **Google PageSpeed: 25/100** on mobile for the homepage (red band).
- **32 of 37** society pages say nothing about how to join. All four we checked still list the 2025–26 council.
- Sponsor strip is still the **theme's placeholder logos**. Society Handbook and Constitution pages are empty. "Let's Talk" opens a box that does nothing.
- Stack: **Drupal 10.2** (end of life Dec 2024) on **PHP 8.1** (end of life Dec 2025).
- Only three of eight menu items fit on a phone; the rest are off-screen with no affordance.

**CCA's own published numbers** (use these, not invented ones): 45+ societies, 300+ annual events/projects, 1000+ event participants, **PKR 2,078,005** raised in sponsorship by societies.

**Tone rule:** never criticise the website. Criticise the *workflow*. Ayesha may have built parts of the current site, and the process is the thing we're actually fixing.

## This codebase

Static. No build step, no framework, no dependencies, no server. Open `index.html` and it runs.

```
index.html    page shell — LUMS chrome, masthead, nav mounts, footer
styles.css    all styling; design tokens live in :root at the top
data.js       ALL content: societies, events, venues, bookings, request types, seed requests/emails
app.js        routing, rendering, the request flow
*.png *.jpg   LUMS crest, slogan, white logo, and photography
```

Files are flat in the repo root (not in `assets/`) because they were uploaded through GitHub's web UI, which can't create folders. Fine at this size. If you restructure into `assets/`, update the four `src`/`href` references in `index.html` plus `PIC[]` and the hero `<img>` in `app.js`.

### How it works

`app.js` is one IIFE. State lives in a single object `S`:

```js
S = { mode, view, p, q, cat, evTab, signed, soc, draft, inbox, sheet }
```

- `S.mode` is the role: `"public" | "portal" | "staff"` (the three buttons in the black bar).
- `S.view` is the screen within that role.
- `render()` picks a `v<Name>()` function, which returns an **HTML string**. Everything is string templating into `innerHTML`; there is no virtual DOM and no framework.
- Events are **delegated** — three global listeners (`input`, `change`, `click`) at the bottom of `app.js` dispatch on `data-*` attributes (`data-go`, `data-mode`, `data-soc`, `data-type`, `data-req`, `data-act`, …). To add an interaction, add a `data-` attribute and a branch in the click handler.
- `data.js` declares top-level `var`s, so the IIFE in `app.js` picks them up off the global scope. `data.js` must load first — it does, in `index.html`.

### Conventions

- **ES5-flavoured vanilla JS** (`var`, `function`, no arrow functions, no template literals). Keep it that way; it's deliberate and keeps the file readable to the whole team.
- `esc()` every interpolated value. Never put raw user/data strings into `innerHTML`.
- Dates are `"YYYY-MM-DD"`. Use `dayOf()` / `fmtD()` — never `new Date(iso)` directly, which parses as UTC and shifts the weekday.
- Colours come from CSS custom properties only. **Do not hardcode hex values in component rules** — it breaks dark mode, which is fully implemented.
- No dependencies. No npm. No build. If a change needs a library, it's probably the wrong change for this prototype.

### Design system — taken from the live LUMS sites, not invented

| Token | Value | Where it's from |
|---|---|---|
| `--brand` | `#2E3192` | Top utility bar, Menu button |
| `--cca` | `#04198B` | Primary buttons, office title |
| `--head` | `#002581` | Headings |
| `--deep` | `#00064B` | Footer |
| `--gold` | `#FFB300` | Secondary buttons, accent rule |
| `--cyan` | `#00CEFF` | Button hairline, "Campus Health" |
| `--band` / `--ink` | `#F2F2F2` / `#333333` | Section bands, body text |

Type is **Noto Sans** with **Noto Sans Display Bold** for headings — the actual LUMS faces. Border radius is **4px**, matching LUMS buttons. Primary buttons are `--cca` with a `--cyan` hairline, exactly like the "For Alumni" buttons on lums.edu.pk.

The crest, the "Learning Without Borders" slogan and all photography are pulled from `cca.lums.edu.pk`. They're the University's own assets, used to show CCA what their site could look like. **Keep the "Prototype — not a live LUMS service" banner** on every screen; it's what makes that honest.

### What's real and what isn't

- **Real:** the design tokens, typography, crest, photos, CCA's statistics, the audit findings, the LUMS information architecture (Home / About Us / Societies & Clubs / Events Calendar / Resources).
- **Mock:** society councils, events, requests, bookings, the email trail, and every person's name except the team's and Ayesha's. Sign-in is a dropdown — **there are no accounts and no passwords, by design.** Don't add real auth to the prototype.
- **State is in memory.** Anything approved during a demo resets on reload. That's intentional — the demo can be run twice.

### Running and testing

```bash
python3 -m http.server 8000     # http://localhost:8000
```

Opening `index.html` directly also works. There are no tests. Before pushing anything, manually walk the six-step path in the **Demo guide** button — especially the clash check and approve-then-publish, because those are the two things that must not break before a demo.

Pushing to `main` redeploys GitHub Pages in about a minute.

## Roadmap — what's actually being proposed to CCA

The prototype is the pitch. The contracted build is different:

- **WordPress**, not static — already cleared by LUMS IST (Adil Sarwar, 29 September 2026). Managed hosting so nobody at CCA maintains a server. This matters: the panel includes an IST representative.
- **Events sync from Notion.** CCA already runs on Notion databases. Plan: societies submit via the Tally form they already use → CCA approves in Notion and flips a "Show on website" toggle → the site picks it up (webhook, with a 15-minute poll as fallback), copying posters across, de-duplicating by Notion page ID, with an approval gate and a field allowlist. Saad (ResLife) is the panel's Notion specialist — expect detailed questions here.
- **The society portal** is the differentiator, and the biggest scope risk. Honest recommendation: ship **AUD booking and event proposals at launch**, the rest by summer. Promising all six types by late February, with four people also carrying coursework, is how student projects die.
- CCA supplies the content and has explicitly asked for something **low-maintenance**.

### Likely questions from the panel

- *Who maintains it after you graduate?* → managed hosting, documentation, trained CCA staff, handover session
- *Does this replace our email?* → no, it mirrors into it
- *Is this IST-approved?* → WordPress cleared 29 Sep 2026
- *Who can log in?* → LUMS accounts, society presidents only, CCA can revoke
- *What if a society posts something wrong?* → nothing goes public without CCA approval (that's the website queue)
- *Cost?* → hosting, domain, and at most ~PKR 22,000/year for the Notion connection

## Working here

- The deadline is real and near. Prefer small, verified changes over refactors.
- Don't add frameworks, build steps or dependencies to this repo.
- Don't invent statistics. CCA's real numbers are above.
- Content changes almost always belong in `data.js` alone.

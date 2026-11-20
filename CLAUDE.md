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

## Current direction (from 20 November 2026)

After the pitch, CCA asked for **a public website only, and for it to look beautiful**: the kind of site people say "woah" at, in **shades of purple**. So:

- The society portal, staff queue, venue picker and email trail are **gone from this prototype**. The portal idea below is kept as history and as a possible later phase, not as current scope.
- The design moved from the LUMS blue chrome to a **purple design system** with a display serif, motion, a loading screen, a 3D highlights carousel and richer society pages (see *Design system*).

## The original core idea (pitch, 19 Nov 2026)

The current site's information only flows *out*, and only when a human retypes it; CCA's real work (approving events, booking rooms, clearing PR and sponsorships) happens in Outlook with no status or reference. The pitched product joined the two: societies send requests through a portal, and the public site is a byproduct of CCA's approvals ("Approve once, publish everywhere"), with every request still mirrored into email. CCA has since narrowed the brief to the public site.

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
index.html    page shell: loader, fixed header, page mount, footer
styles.css    all styling; every colour is a token in :root at the top
data.js       ALL content: societies, events, past events, news, gallery, homepage highlights
app.js        routing, rendering, motion and interactions
img/          lums-white.png (crest), soc/ (society logos), banner/ and photo/ (society photography)
```

### How it works

`app.js` is one IIFE. State lives in a single object `S = { view, p, q, cat, rec, evTab, sheet, gq }`.

- `render()` picks a `v<Name>()` function (`vHome`, `vSocs`, `vSoc`, `vEvents`, `vEvent`, `vAbout`, `vResources`, `vPartner`), which returns an **HTML string** for `#page`.
- Events are **delegated**: global `input`, `click` and `keydown` listeners dispatch on `data-*` attributes (`data-go`, `data-soc`, `data-ev`, `data-cat`, `data-catgo`, `data-rec`, `data-tab`, `data-cf`, `data-toast`). To add an interaction, add a `data-` attribute and a branch in the click handler.
- `data.js` declares top-level `var`s, so the IIFE in `app.js` picks them up off the global scope. `data.js` must load first.
- **Motion**, all disabled under `prefers-reduced-motion`:
  - **Loader:** the crest rises with load progress, then a curtain lifts and the hero zooms in (`boot()` / `ready()`). A CSS safety timer hides the loader after 8s if JS fails, and it only appears when the inline script has added `html.js`.
  - **3D highlights carousel** (`HIGHLIGHTS` in data.js; `cfLayout()`): centre slide large, neighbours smaller and tilted. Each slide uses its own `perspective()` instead of a shared 3D space, so clicks reach the side slides.
  - **WebGL gradient** behind the hero (`fxInit()`), at half resolution, paused when off-screen. The CSS gradient underneath is the fallback.
  - **Smooth wheel scrolling** for mouse users only; it hands control back if anything else scrolls the page.
  - **"What's on"** pins and travels sideways on desktop (`pinLayout()`); native horizontal scroll below 1100px.
  - **Reveals:** words rise on elements with class `words`. Don't reuse `.split`, which is the two-column page layout. Blocks with `rv` ease in, and numbers with `data-to` count up.

### Conventions

- **ES5-flavoured vanilla JS** (`var`, `function`, no arrow functions, no template literals). Keep it that way.
- `esc()` every interpolated value. Never put raw user/data strings into `innerHTML`.
- Dates are `"YYYY-MM-DD"`. Use `dayOf()` / `fmtD()`, never `new Date(iso)` directly.
- Colours come from CSS custom properties only. **Do not hardcode hex values in component rules**; it breaks dark mode. For translucent colours use the `--*-rgb` tokens, e.g. `rgba(var(--p500-rgb),.5)`.
- No dependencies. No npm. No build.

### Design system

| Token | Value | Use |
|---|---|---|
| `--p950` to `--p50` | `#12072B` … `#F7F4FE` | the purple scale: dark surfaces, cards, tints |
| `--gold` | `#FFB300` | primary buttons and small accents (the LUMS gold) |
| `--head` / `--ink` / `--muted` | role tokens | headings, body text, secondary text; redefined for dark mode |
| `--logo-bg` | white in both themes | society logos are designed for white |

Type: **Fraunces** (display serif, italic for emphasis) and **Noto Sans** (the LUMS body face). Radius is 16px, 28px for large cards; buttons are pills. Dark purple surfaces (hero, page heads, numbers band, footer) share one gradient.

The crest and all photography come from `cca.lums.edu.pk`; every photo is credited to the society it belongs to. **Keep the "Prototype · not a live LUMS service" bar** on every screen.

### What's real and what isn't

- **Real:** CCA's statistics, the society names and logos, the photos, the audit findings.
- **Mock:** events, news, society descriptions for the newer entries, emails, Instagram handles and deadlines.

### Running and testing

```bash
python3 -m http.server 8000     # http://localhost:8000
```

There are no automated tests in the repo. Before pushing, check by hand:
- the loader completes
- the carousel works with its buttons, drag, and clicking a side slide
- search for "chess" finds the Chess Club
- a society page renders
- light and dark themes
- a 390px-wide phone screen

Pushing to `main` redeploys GitHub Pages in about a minute. The Vercel copy (`cca-campus-life.vercel.app`) updates with `vercel deploy --prod`.

## Roadmap — what's actually being proposed to CCA

The prototype is the pitch. The contracted build is different:

- **WordPress**, not static — already cleared by LUMS IST (Adil Sarwar, 29 September 2026). Managed hosting so nobody at CCA maintains a server. This matters: the panel includes an IST representative.
- **Events sync from Notion.** CCA already runs on Notion databases. Plan: societies submit via the Tally form they already use → CCA approves in Notion and flips a "Show on website" toggle → the site picks it up (webhook, with a 15-minute poll as fallback), copying posters across, de-duplicating by Notion page ID, with an approval gate and a field allowlist. Saad (ResLife) is the panel's Notion specialist — expect detailed questions here.
- **The society portal** (now out of scope; CCA asked for the public site only) was the differentiator and the biggest scope risk. Honest recommendation: ship **AUD booking and event proposals at launch**, the rest by summer. Promising all six types by late February, with four people also carrying coursework, is how student projects die.
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

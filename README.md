# CCA Campus Life

A working prototype of a rebuilt **cca.lums.edu.pk**, built by Team OS-Victims for the LUMS Office of Co-Curricular Activities.

It is a static site — no build step, no framework, no server. Open `index.html` and it runs.

**Live:** https://muhammad-mustafa294.github.io/cca-website/

---

## What it demonstrates

Three roles, switched from the black bar at the top:

| Role | What it shows |
|---|---|
| **Public site** | Society directory with search-as-you-type and category filters, society profiles, the campus events calendar, event pages, policies, and a "Work with Us" section for sponsors. |
| **Society portal** | A society executive signs in and sends CCA any of six request types — venue booking, PR request, event proposal, equipment and logistics, sponsorship/NOC, profile update — each with a reference number and a live status. |
| **CCA staff** | The request inbox, the venue calendar, and the website queue. Approve, request changes, or decline; the society is emailed either way. |

Two moments worth building the pitch around:

1. **The clash check.** Book the Main Auditorium on 18 February, 6–9 PM, and the form tells you LUMUN already holds it 17:00–21:00 — *before* the request is sent. Email cannot do that.
2. **Approve once, publish everywhere.** Submit an event proposal in the portal, approve it as CCA staff, then switch to the public Events Calendar. It is there. Nothing was retyped.

The **Email trail** button (bottom right) logs every email the system would send, to `cca@lums.edu.pk` and the society. The point: the portal does not replace Outlook, it keeps the record there *and* gives it a status.

## Design

Colours, type, the crest and the photography are taken from the live LUMS sites, not invented:

| Token | Value | Where it comes from |
|---|---|---|
| Brand indigo | `#2E3192` | Top utility bar, Menu button |
| CCA blue | `#04198B` | Primary buttons, section title |
| Heading navy | `#002581` | Headings |
| Footer navy | `#00064B` | Footer |
| Gold | `#FFB300` | Secondary buttons, accent rule |
| Cyan | `#00CEFF` | Button hairline, "Campus Health" |
| Band grey | `#F2F2F2` · text `#333333` | Section bands, body copy |
| Type | Noto Sans / Noto Sans Display Bold | lums.edu.pk |

Buttons use a 4px radius with a cyan hairline border, matching the LUMS homepage.

## Repo layout

```
index.html              page shell: LUMS chrome, header, footer
styles.css   all styling, design tokens at the top in :root
data.js       societies, events, venues, bookings, request types
app.js        routing, rendering, the request flow
/             LUMS crest, slogan, and photography
```

## Changing things

**Content** — almost everything you will want to change lives in `data.js`:

- `SOCIETIES` — add a society. Copy an existing block, change the fields. `pic` is an index into the `PIC` array in `app.js`.
- `EVENTS` — add an event. Dates are `YYYY-MM-DD`; the weekday is worked out for you.
- `VENUES` / `BOOKINGS` — venues and who already holds them. `BOOKINGS` drives the clash check.
- `REQ_TYPES` — the six request types and their reply times.
- `REQUESTS` / `EMAILS` — the sample requests and email trail the demo opens with.

**Colours and spacing** — the `:root` block at the top of `styles.css`. Change a token once and it applies everywhere. Dark mode tokens are in the two blocks directly below it; change both.

**Layout and behaviour** — `app.js`. Each screen is a `v<Name>()` function returning an HTML string. `render()` picks which one to show.

### Running it locally

```bash
git clone https://github.com/Muhammad-Mustafa294/cca-website.git
cd cca-website
python3 -m http.server 8000     # then open http://localhost:8000
```

Opening `index.html` directly works too.

### Pushing a change

```bash
git checkout -b your-change
# edit
git commit -am "Describe the change"
git push -u origin your-change
```

Open a pull request. Merging to `main` redeploys the live site in about a minute.

## Team

| | Roll number | Society |
|---|---|---|
| Muhammad Mustafa | 28100414 | TES |
| Maha Aurangzeb | 28100312 | LCS |
| Khadija Khalid | 28100271 | SPADES |
| Zahrah Masood | 28100280 | LES |

## Note

This is a **prototype**, not a live LUMS service, and the banner at the top says so on every screen. Society names, councils and events are sample content. The data lives in the page, so anything approved during a demo resets on reload — which is useful, because you can run the demo twice.

The LUMS crest, slogan and photographs are the University's own, reproduced here only to show CCA what their site could look like.

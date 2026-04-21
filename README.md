# Bibliò — Design System

> *"Acquista, noleggia, scopri. La tua biblioteca in un click."*

Bibliò is an Italian cultural e-commerce platform that reshapes the book market through a hybrid model: **buy** physical and digital books, **rent** for a flexible 30-day window, and chat with **MyBibliò**, an embedded AI consultant (powered by Claude) that guides every reader past the "paralysis of choice" toward the perfect next read.

This design system encodes the brand's editorial voice, paper-and-ink palette, and component vocabulary so that any surface — marketing site, product catalog, book detail, account area, AI chat — feels unmistakably Bibliò.

---

## Sources

- **Brief:** user-provided design brief (Italian) — included verbatim in `brief.md`.
- **GitHub repo:** `Chirone23/biblio` — *empty at time of import* (no code/assets pulled). The spec and visuals here are derived entirely from the written brief.
- **Stack referenced in brief:** WordPress + custom `WP-Claude-Interface` plugin, Claude 4.5 Haiku via Anthropic API, Open Library & Google Books APIs.

No Figma file was attached. No existing production screens were available. Everything visual in this system is a fresh interpretation of the brief — flag anything that feels off so we can recalibrate.

---

## Content fundamentals

**Language.** Primary language is **Italian** throughout the product. Copy should feel written *by a librarian who reads for pleasure* — knowledgeable, warm, a little opinionated, never salesy.

**Tone.** Editorial and literary. Professional but warm, cultured but accessible. Think of a cultural magazine (think *Internazionale*, *Il Libraio*) rather than a marketplace.

**Voice.**
- Address the reader directly in the informal second person: **"tu"** / **"la tua biblioteca"**.
- Use first-person plural **"noi"** only for the platform's voice ("Abbiamo selezionato…"). MyBibliò speaks as **"io"** — a single consulting persona.
- Short imperatives for CTAs: *Acquista*, *Noleggia*, *Scopri*, *Aggiungi al carrello*, *Chiedi a MyBibliò*.
- Avoid marketing fluff: no "unleash," "amazing," "game-changing." Prefer concrete: *50.000+ titoli*, *30 giorni*, *9,99€/mese*.

**Casing.** Sentence case for headings and buttons (not Title Case). Book titles stay in their natural case and appear in *italics* (serif italic, `.book-title`). Author names are plain.

**Punctuation.** Italian quotation marks «…» for pull-quotes. En-dash (–) for ranges. Price format: **9,99€** (comma decimal, symbol after — Italian convention).

**Emoji.** Used sparingly and purposefully as lightweight iconographic accents inside chat bubbles, empty states, and subscription banners — never in hero headings or formal copy. A short, approved set:
📚 (catalog), 🎯 (recommendation), 📦 (rental shipment), ❤️ (wishlist), ⭐ (ratings), 🛒 (cart), ✨ (MyBibliò / AI), 📖 (reading).

**Example copy, right on tone:**

> **Hero (homepage):** *La tua biblioteca in un click.*
> Acquista, noleggia o fatti guidare da MyBibliò. Oltre 50.000 titoli, consigli personalizzati, spedizione in 48 ore.

> **MyBibliò opener:** *Ciao, sono MyBibliò. Raccontami cosa stai cercando — un genere, un'emozione, anche solo un budget — e trovo il libro giusto per te.*

> **Plus banner:** *Bibliò Plus — 9,99€/mese. 2 noleggi inclusi, spedizione gratuita, zero pubblicità.*

**Error / empty states** stay human:
> *Non abbiamo trovato nulla per "xyz". Prova con un autore, un genere, o chiedi a MyBibliò.*

---

## Visual foundations

### Palette — paper and ink
The system is built on **cream paper** (`#F5F1E8`) and **warm ink** (`#2A2A2A`), lifted by a single **coral** accent (`#C75550`) that carries every call to action. Supporting hues — **navy** (categories, informative), **brown** (rental), **gold** (Plus/Premium) — are used functionally, never decoratively.

- One accent per view. Coral is precious; don't dilute it.
- Surfaces are `#FFFFFF` cards floating on the cream background — *never* pure white pages.
- Dark sections (Plus banners, footers, chat panel header) use `--biblio-ink` with cream type for contrast.

### Type — serif headings, sans body
- **Playfair Display Bold (700)** for display + all UI headings — high-contrast, editorial, authoritative without being "luxury."
- **Lora** (serif) for book titles (italic), pull-quotes, and any long-form prose where Playfair's stroke contrast becomes tiring.
- **Inter** (sans) for all UI, body copy, buttons, meta.
- Generous line-height on body (1.55) and lead (1.7). Tight, balanced headings (1.15) with subtle `-0.02em` tracking.
- An all-caps, widely-tracked micro-eyebrow (`.eyebrow`) in coral marks section starters — use sparingly, once per screen.

### Layout
- 12-column grid, 1200px max content width, 24px gutters on desktop, 16px on mobile.
- **Mobile-first.** Expect ~90% mobile traffic. Single column, generous vertical rhythm (multiples of 8).
- Whitespace is structural. Sections breathe at `--s-8` / `--s-9`.
- Cards stack in a rhythmic 4 / 3 / 2 / 1 column grid as viewport shrinks.

### Imagery
- Book covers are the hero imagery of the entire product — treated with real shadow (`--shadow-book`) and slight perspective tilt in hero placements.
- Editorial photography when used: **warm, natural light**, wood/paper/linen backgrounds, muted saturation. Never cold blue-gray stock.
- No gradient backgrounds, no glassmorphism, no abstract shapes. Texture is allowed: very subtle paper grain at 3–5% opacity on the cream bg is welcome on marketing surfaces.

### Borders & cards
- Borders are **`1px solid #E8E3DB`** — hairline, warm, nearly invisible. Use instead of shadows when a card sits inline in content.
- Shadows are soft and low-opacity, tinted with ink not pure black. Three levels: `--shadow-1` (resting), `--shadow-2` (hover/float), `--shadow-3` (modal, popover). A dedicated `--shadow-book` adds angled depth to book covers.
- **Corner radii:** 4px (inputs), 8px (buttons, chips), 12px (cards), 20px (hero panels, chat bubbles), pill (tags, toggle).

### Animation
- Calm and editorial. Defaults: `240ms` with `cubic-bezier(0.22, 0.8, 0.32, 1)`. No bounces, no elastic springs.
- **Hover:** subtle — shadow elevates from `--shadow-1` to `--shadow-2`, or background shifts one tone warmer (`--biblio-cream-deep`). Coral buttons darken to `--biblio-coral-dark`. No scale on hover.
- **Press:** `transform: translateY(1px)` + shadow compression. No color-change-only presses.
- **Page transitions:** cross-fades on route change. Book cards fade-and-rise (`translateY(8px) → 0`) in staggered 40ms intervals on first paint.
- MyBibliò chat uses a **three-dot typing indicator**, gentle opacity pulses (1.2s loop), and **token streaming** — characters appear as Claude generates them (no "waiting" spinner).

### Transparency & blur
- Used only for MyBibliò's floating chat-launcher scrim (`rgba(42,42,42,0.4)` backdrop when panel is open on mobile) and for sticky nav on scroll (`backdrop-filter: blur(12px)` over 85% cream).
- Never on cards, buttons, or content surfaces.

### Accessibility
- Contrast target: WCAG AA minimum, AAA for body where feasible. Coral-on-cream hits 4.9:1.
- Font size user-controllable (A−, A, A+ toggle in the account/a11y panel — bumps `--t-body` via a `.font-lg`, `.font-xl` root class).
- Dark mode supported via `[data-theme="dark"]` — ink becomes background, cream becomes text, coral stays.
- All icons have `aria-label`; MyBibliò chat panel is screen-reader-first, with landmark roles and a polite live region for streamed responses.

---

## Iconography

Bibliò uses a **mixed iconographic approach**, intentional rather than purist:

1. **Line icons** — [**Lucide**](https://lucide.dev) (CDN: `https://unpkg.com/lucide@latest`) for all UI chrome: navigation, search, cart, user, filters, arrows. Stroke 1.75, `currentColor`. Chosen for its warm, slightly hand-drawn stroke terminals which fit the editorial feel better than sharper systems like Heroicons.
2. **Functional emoji** — a small, curated set used inside content surfaces (chat bubbles, empty states, Plus banner callouts, category chips): 📚 🎯 📦 ❤️ ⭐ 🛒 ✨ 📖. Rendered at native OS resolution; never substituted with custom SVG.
3. **Brand glyphs** — the Bibliò "B" mark and a hand-drawn book illustration sit in `assets/` as SVG.
4. **Unicode** — «» for quotes, – for ranges, … for truncation, → for inline "see more".

**Substitution flag:** Lucide was chosen as the closest available CDN match for the brief's "emoji/illustrated, not purely minimalist" direction. If you have a bespoke Bibliò icon set, drop it in `assets/icons/` and we'll swap references.

**Do not** invent new icon styles, mix Material Icons with Lucide, or render emoji as monochrome SVG.

---

## Index — what's in this folder

| Path | Purpose |
|---|---|
| `README.md` | This file — brand, tone, visual foundations, iconography, index. |
| `SKILL.md` | Agent Skill front-matter — makes this folder usable as a Claude Code skill. |
| `colors_and_type.css` | All design tokens as CSS variables + base element styles. Import this first. |
| `fonts/fonts.css` | Google Fonts import (Playfair Display + Lora + Inter). Swap for local `.woff2` when available. |
| `assets/` | Logo, brand mark, illustrative assets. |
| `preview/` | Small HTML cards that render in the Design System review tab (type, colors, components). |
| `ui_kits/biblio/` | High-fidelity React/JSX recreation of the Bibliò product — homepage, catalog, book detail, account, Plus, **checkout (4-step), onboarding, noleggio-vs-acquisto, mobile frames**, MyBibliò chat. Open `index.html`. |
| `brief.md` | The original user brief, preserved verbatim for reference. |

---

## Caveats & known gaps

- The `Chirone23/biblio` repo was empty — no existing component code or real screens were available. **Everything visual is a first-pass interpretation of the written brief** and should be reviewed against any real Bibliò mocks you have.
- **Fonts** use Google Fonts CDN (Playfair Display for headings, Lora for book titles/quotes, Inter for body). If you license a bespoke serif, drop the `.woff2` into `fonts/` and swap the `@font-face` block.
- **Icons** use Lucide via CDN as a reasonable approximation. Bespoke icons welcome in `assets/icons/`.
- **Photography** not included — book cover placeholders are solid-color panels with `.book-title` typography. Bring real covers via Open Library / Google Books API as the brief suggests.

# CGP Contact Page — Copy & SEO Document (v1)

> **Single source of copy truth** for `design/v1/contact/`. All build agents use the EXACT copy below — no rewording, no additions, no deletions.
> Concept: **"Open A Channel"** — the Forge Comms Console. Voice sequence: boot (home) → matrix (configurator) → dossier (product) → **channel (contact)**.
> Canonical: `https://cgp.sa/contact/` · Output: `design/v1/contact/index.html`

---

## 0. Page Identity

| Property | Value |
|---|---|
| Page | Contact — "Open A Channel" |
| Voice | Forge Comms Console (terminal-as-luxury, mono labels, `SYS_*`) |
| Primary conversion | Commission form (ONE primary action — structured data) |
| Secondary conversion | WhatsApp escape hatch (pre-filled `wa.me` template) |
| Response promise | "within 24 hours" (hero + form microcopy + success) |
| Tone guardrails | Transparency, not pressure. NO urgency words, NO countdowns, NO obligation language beyond "No obligation. No pressure." |

---

## 1. SEO Meta

### Title (54 / 60 chars — exact)
```
Contact CGP | The Bespoke Forge — Riyadh, Saudi Arabia
```

### Meta description (131 / 155 chars — exact)
```
Commission a bespoke water-cooled PC at CGP — The Bespoke Forge, Riyadh. Open a channel to our masters. We respond within 24 hours.
```

### Canonical / OG / Geo
| Property | Value |
|---|---|
| canonical | `https://cgp.sa/contact/` |
| ogImage | `https://cgp.sa/assets/images/hotwheel.webp` (absolute — page lives one level deep) |
| og:type | `website` (default) |
| Geo meta | inherited from `buildHead` (SA / Riyadh) — no per-page override |
| Robots | `noindex, nofollow` until launch (`<!-- TODO: flip to index,follow at launch -->`) |

### Keyword Map

| Target keyword | Placement | How it reads (natural, forge voice) |
|---|---|---|
| contact CGP | Title (exact match) | "Contact CGP \| The Bespoke Forge — Riyadh, Saudi Arabia" |
| bespoke PC | Hero paragraph + Forge Door paragraph | "a bespoke PC, a signature system…" / "Riyadh's bespoke PC atelier" |
| custom water-cooled PC | Meta description + Commission Desk paragraph | "Commission a bespoke water-cooled PC…" / "Whether you dream of a custom water-cooled PC…" |
| commission (a build) | Meta description + hero CTA + Desk heading + schema | "Start Your Commission" / "The Commission Desk" / ContactPage schema |
| Riyadh | Title + hero status strip + Forge Door + schema address | "RIYADH" / "Riyadh, Saudi Arabia" |
| Saudi Arabia | Title + Forge Door + schema `areaServed` | "Riyadh, Saudi Arabia" |
| The Bespoke Forge | Title + hero + footer consistency | brand anchor, exact brand name |
| respond within 24 hours | Meta description + hero status strip + form trust line | "RESPONSE < 24H" / "We respond within 24 hours" |

**Rule:** keywords land exactly where mapped above — nowhere else. No stuffing, no robotic phrasing. If a sentence reads like a keyword list, it is wrong.

---

## 2. Schema JSON-LD (paste into `build.js` → `PAGES.contact.schema`)

`#organization` and `#store` are copied **VERBATIM** from the product entry (`PAGES.product.schema`). The only change to `#store` is the added `contactPoint` property (marked below). NO `AggregateRating` anywhere.

```js
schema: {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://cgp.sa/#organization',
      name: 'CGP',
      url: 'https://cgp.sa/',
      logo: 'https://cgp.sa/logo.png',
      description: 'CGP — The Bespoke Forge. Mastercrafted, water-cooled PC architecture engineered in Riyadh.',
      sameAs: ['https://x.com/cgp', 'https://instagram.com/cgp.sa', 'https://wa.me/966500000000'],
    },
    {
      '@type': ['ComputerStore', 'LocalBusiness'],
      '@id': 'https://cgp.sa/#store',
      name: 'CGP',
      url: 'https://cgp.sa/',
      image: 'https://cgp.sa/assets/images/hotwheel.webp',
      description: 'Bespoke water-cooled PC builds, handcrafted to order in Riyadh, Saudi Arabia.',
      parentOrganization: { '@id': 'https://cgp.sa/#organization' },
      address: { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressRegion: 'Riyadh Province', addressCountry: 'SA' },
      geo: { '@type': 'GeoCoordinates', latitude: 24.7136, longitude: 46.6753 },
      openingHours: 'Su-Th 10:00-22:00',
      priceRange: 'SAR 10,000 - 25,000+',
      // ADDED for contact page (only change to #store):
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: '+966-5X-XXX-XXXX', // TODO: from site settings (real CGP sales number)
        areaServed: 'SA',
        availableLanguage: ['en', 'ar'],
      },
    },
    {
      '@type': 'ContactPage',
      '@id': 'https://cgp.sa/contact/#page',
      url: 'https://cgp.sa/contact/',
      name: 'Contact CGP | The Bespoke Forge — Riyadh, Saudi Arabia',
      description: 'Commission a bespoke water-cooled PC at CGP — The Bespoke Forge, Riyadh. Open a channel to our masters. We respond within 24 hours.',
      mainEntity: { '@id': 'https://cgp.sa/#store' },
      about: { '@id': 'https://cgp.sa/#store' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://cgp.sa/contact/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cgp.sa/' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://cgp.sa/contact/' },
      ],
    },
  ],
},
```

---

## 3. Section Copy

### 3.1 Hero — `// SYS_CONTACT`

| Element | Copy (exact) |
|---|---|
| Eyebrow | `// SYS_CONTACT` |
| H1 (line 1) | `Open A Channel` |
| H1 (line 2, gradient) | `To The Forge.` |
| Paragraph (zinc-400) | `Every legendary build begins with a single transmission. Describe the machine you want — a bespoke PC, a signature system, or something never built before — and our masters will take it from there.` |
| Status strip (mono, 3 items) | `FORGE OPERATIONAL` · `RESPONSE < 24H` · `RIYADH` |
| CTA primary (→ `#commission-desk`) | `Start Your Commission` |
| CTA secondary (→ WhatsApp) | `WhatsApp The Forge` |

**Build notes:**
- Section id: `contact-hero` · heading id: `contact-hero-title` (THE only h1 on the page).
- Secondary CTA href: `https://wa.me/<number>?text=...` — `<!-- TODO: from site settings (WhatsApp number) -->`. Pre-filled template text: `Hello CGP — I'd like to commission a bespoke water-cooled PC.` (build agent URL-encodes).
- Status strip separators: `·` (middle dot), mono micro type, muted color — same pattern as inquiry trust strip.

---

### 3.2 The Commission Desk — `// SYS_COMMISSION_DESK`

| Element | Copy (exact) |
|---|---|
| Eyebrow | `// SYS_COMMISSION_DESK` |
| H2 (line 1) | `The Commission` |
| H2 (line 2, gradient) | `Desk.` |
| Paragraph (zinc-400) | `One transmission is all it takes. Whether you dream of a custom water-cooled PC or a signature system from the archives, a master will review your brief and open a consultation within 24 hours.` |

**"What happens next" — 3-step panel** (mono step labels + one line each):

| Step | Label | One-line copy |
|---|---|---|
| 01 | `REVIEW` | `A master reads your transmission and assesses the build.` |
| 02 | `CONSULTATION` | `A private channel opens to refine hardware, cooling, and materials.` |
| 03 | `BLUEPRINT` | `You receive the full blueprint — components, loop design, and exact pricing.` |

**Form** (terminal frame, split layout — form + 3-step panel):

| Field | Label | Placeholder / Options (exact) |
|---|---|---|
| Name | `Name` | `John Doe` (required, `autocomplete="name"`) |
| Email | `Email` | `john@example.com` (required, `autocomplete="email"`) |
| Phone / WhatsApp | `Phone / WhatsApp (Optional)` | `+966 5X XXX XXXX` (`autocomplete="tel"`) |
| Project type (chips, 4) | `Project Type` | `Custom Water-Cooled Build` · `Gaming Battlestation` · `Workstation / Creator` · `Pre-Built System` |
| Budget (select, 4 ranges) | `Estimated Budget (SAR)` | `10,000 – 15,000 SAR` · `15,000 – 25,000 SAR` · `25,000 – 50,000 SAR` · `50,000+ SAR` |
| Preferred channel (radio, 3) | `Preferred Channel` | `WhatsApp` · `Email` · `Phone` |
| Details | `Project Details` | `Describe the build you have in mind...` (required, textarea) |
| Submit | — | `Transmit Request` |
| Trust line (under submit) | — | `No obligation. No pressure.` |
| Mono trust strip (above form) | — | `Commissions from 10,000 SAR` `//` `We respond within 24 hours` |

**Success state (simple, one line — NO echo summary, NO 3-step success):**
```
// TRANSMISSION RECEIVED — THE MASTERS HAVE BEEN SUMMONED
```
Plus a `Return to Forge` ghost button (consistent with inquiry page pattern). Focus moves to the success panel on submit (`focus()`), `aria-live="polite"`.

**Build notes:**
- Section id: `commission-desk` · heading id: `commission-desk-title`.
- Honeypot field mandatory (spam hygiene, `.cgp-honeypot` pattern from inquiry).
- Visible error messages: `aria-describedby` + `aria-invalid` on invalid fields.
- Simulated success only (mockup — no real submission).

---

### 3.3 The Direct Lines — `// SYS_DIRECT_LINES` (MERGED into §3.2 desk panel)

> **MERGED (2026-09-01):** no longer a standalone section. The channel cards now live INSIDE the "What happens next" steps panel (`aside.cgp-steps-panel` in `desk.html`), directly after the 3-step `<ol>`, stacked vertically.

| Element | Copy (exact) |
|---|---|
| Mono label | `// DIRECT LINES` |
| H3 (inside steps panel) | `The Direct Lines.` |

**Channel cards** (mono label + value + one-line sub-copy + CTA):

| Card | Mono label | Value | Badge | Sub-copy | CTA label |
|---|---|---|---|---|---|
| WhatsApp (primary) | `// CHANNEL_01 — WHATSAPP` | `<!-- TODO: from site settings (WhatsApp number) -->` | `Fastest Response` | `The fastest line to the forge — message us directly, day or night.` | `Open WhatsApp` |
| Phone | `// CHANNEL_02 — PHONE` | `<!-- TODO: from site settings (phone number) -->` | — | `Speak to a master directly during forge hours.` | `Call The Forge` |
| Email | `// CHANNEL_03 — EMAIL` | `<!-- TODO: from site settings (email address) -->` | — | `For detailed briefs, documents, and formal commissions.` | `Write To The Forge` |

**Build notes:**
- Heading: mono label `// DIRECT LINES` + h3 `The Direct Lines.` (class `cgp-direct-lines-title`), placed inside the steps panel AFTER the 3-step `<ol>` — separated by a top border (`.cgp-direct-lines`).
- Cards stacked vertically (`grid-cols-1`, NOT 3-col) with panel-scoped compact overrides (`.cgp-steps-panel .cgp-channel-card`).
- WhatsApp card is visually primary (cyan border/glow, badge chip) — the other two are standard cards.
- WhatsApp card CTA uses the same pre-filled `wa.me` template as the hero secondary CTA.
- Section id `direct-lines` / heading id `direct-lines-title` NO LONGER EXIST — removed with the standalone section (`lines.html` deleted).

---

### 3.4 The Forge Door — `// SYS_FORGE_DOOR`

| Element | Copy (exact) |
|---|---|
| Eyebrow | `// SYS_FORGE_DOOR` |
| H2 (line 1) | `The Forge` |
| H2 (line 2, gradient) | `Door.` |
| Paragraph (zinc-400) | `Some commissions are best discussed face to face — over the machine itself. As Riyadh's bespoke PC atelier, the forge door is open to serious clients, by appointment.` |
| Address line | `Riyadh, Saudi Arabia` + `<!-- TODO: from site settings (full street address) -->` |
| Hours line | `Su-Th · 10:00 — 22:00` |
| Luxury line | `Visits by appointment — the forge floor is not a showroom.` |
| Appointment CTA (→ `#commission-desk`) | `Request An Appointment` |
| Socials row (aria-labels) | `CGP on Instagram` · `CGP on Twitter` · `CGP on WhatsApp` — all `<!-- TODO: from site settings -->` |

**Build notes:**
- Section id: `forge-door` · heading id: `forge-door-title`.
- Stylized inline SVG map (dark, cyan pin, ~2-5KB) — NO Google Maps embed (no-CDN + budget). `<!-- REPLACE WITH CLIENT PHOTOS -->` not needed here; map is decorative.
- Socials row matches footer icon set (Phosphor: `instagram-logo`, `twitter-logo`, `whatsapp-logo`).

---

## 4. Build Notes (for other agents)

### 4.1 `build.js` PAGES entry skeleton
```js
contact: {
  output: 'contact/index.html',
  title: 'Contact CGP | The Bespoke Forge — Riyadh, Saudi Arabia',
  description: 'Commission a bespoke water-cooled PC at CGP — The Bespoke Forge, Riyadh. Open a channel to our masters. We respond within 24 hours.',
  canonical: 'https://cgp.sa/contact/',
  ogImage: 'https://cgp.sa/assets/images/hotwheel.webp', // absolute — page lives one level deep
  schema: { /* §2 above */ },
  css: ['contact/css/contact.css'],
  js: ['main.js'], // form is inline Alpine — no page JS
  sections: {
    header: 'contact/sections/header.html', // page-specific (mirrors WP header-contact.php)
    main: [
      'contact/sections/hero.html',
      'contact/sections/desk.html',
      'contact/sections/door.html',
    ],
    footer: 'shared',
  },
},
```

### 4.2 Footer CTA fix (pre-existing subpage bug)
Shared footer "Summon The Masters" CTA currently points to `#inquiry` — an anchor that does not exist on subpages. Change to `{{CONTACT_URL}}` (new token, resolved in `resolveSection`).

### 4.3 WhatsApp pre-filled template (used in hero secondary CTA + Direct Lines card)
```
https://wa.me/<number>?text=Hello%20CGP%20%E2%80%94%20I%27d%20like%20to%20commission%20a%20bespoke%20water-cooled%20PC.
```
`<number>` = `<!-- TODO: from site settings (WhatsApp number) -->`.

### 4.4 WP migration hooks (for later)
- Form → Contact Form 7 (free) + `wpcf7mailsent` → terminal success panel.
- Contact data → Customizer (`get_theme_mod`).
- JSON-LD → theme-owned in `wp_head`.
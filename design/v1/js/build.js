#!/usr/bin/env node
/**
 * CGP design/v1 multi-page build — zero dependencies (Node built-ins only).
 *
 * The PAGES manifest owns each page's <head> (SEO/OG/schema/assets) and its
 * ordered section list. build.js resolves {{THEME_ASSETS}} and {{PAGE_ASSETS}}
 * per section file via path.relative (never hardcoded), injects sections at
 * the template markers, and runs a strict lint pass that fails the build.
 *
 * Usage (from project root):
 *   node design/v1/js/build.js
 *
 * Markers (re-emitted after injection → idempotent re-runs):
 *   <!-- HEAD -->  <!-- HEADER -->  <!-- SECTIONS -->  <!-- FOOTER -->
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..'); // project root
const DESIGN_DIR = path.join(ROOT, 'design', 'v1');
const THEME_ASSETS_DIR = path.join(ROOT, 'wp-content', 'themes', 'cgp', 'assets');
const MARKERS = { head: '<!-- HEAD -->', header: '<!-- HEADER -->', sections: '<!-- SECTIONS -->', footer: '<!-- FOOTER -->' };

// ---------------------------------------------------------------------------
// PAGES manifest — owns the <head> and section order per page.
// sections.header/footer: 'shared' → shared/sections/<name>.html, or a
// page-specific path (mirrors WP header-{slug}.php overrides).
// ---------------------------------------------------------------------------
const PAGES = {
  home: {
    output: 'index.html', // homepage stays at design/v1/index.html (root)
    title: 'CGP | Bespoke Water-Cooled PC Builds — Riyadh, Saudi Arabia',
    description: 'CGP — The Bespoke Forge. Mastercrafted, water-cooled PC architecture engineered in Riyadh. Extreme performance, handcrafted to order.',
    canonical: 'https://cgp.sa/',
    ogImage: 'assets/images/hotwheel.webp',
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
        },
        {
          '@type': 'Service',
          '@id': 'https://cgp.sa/#service',
          name: 'Custom Water-Cooled PC Building',
          serviceType: 'Custom PC Building',
          description: 'Mastercrafted, water-cooled PC architecture engineered to order — bespoke loops, elite hardware, extreme performance.',
          provider: { '@id': 'https://cgp.sa/#store' },
          areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
        },
      ],
    },
    css: ['home/css/home.css'],
    js: [],
    sections: {
      header: 'shared',
      main: [
        'home/sections/hero.html',
        'home/sections/vision.html',
        'home/sections/showcase.html',
        'home/sections/metrics.html',
        'home/sections/guarantee.html',
        'home/sections/gallery.html',
        'home/sections/shop.html',
        'home/sections/blog.html',
        'home/sections/inquiry.html',
      ],
      footer: 'shared',
    },
  },
};

// ---------------------------------------------------------------------------
// Head generation — manifest owns title/description/canonical/ogImage/schema.
// ---------------------------------------------------------------------------
function buildHead(page) {
  const origin = page.canonical.replace(/\/$/, '');
  const ogImage = origin + '/' + page.ogImage;
  const theme = path.relative(DESIGN_DIR, THEME_ASSETS_DIR).split(path.sep).join('/');
  const css = page.css.map((c) => `  <link rel="stylesheet" href="${c}">`).join('\n');
  const js = page.js.map((s) => `  <script defer src="${s}"></script>`).join('\n');
  return [
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '',
    '  <!-- Primary meta -->',
    `  <title>${page.title}</title>`,
    `  <meta name="description" content="${page.description}">`,
    '  <!-- TODO: flip to index,follow before launch -->',
    '  <meta name="robots" content="noindex, nofollow">',
    '  <meta name="theme-color" content="#050505">',
    '  <!-- TODO: replace with the live URL before launch -->',
    `  <link rel="canonical" href="${page.canonical}">`,
    '',
    '  <!-- Open Graph -->',
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="CGP">',
    `  <meta property="og:title" content="${page.title}">`,
    `  <meta property="og:description" content="${page.description}">`,
    `  <meta property="og:url" content="${page.canonical}">`,
    `  <meta property="og:image" content="${ogImage}">`,
    '  <meta property="og:locale" content="en_SA">',
    '',
    '  <!-- Twitter -->',
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${page.title}">`,
    `  <meta name="twitter:description" content="${page.description}">`,
    `  <meta name="twitter:image" content="${ogImage}">`,
    '',
    '  <!-- Geo (Saudi Arabia — Riyadh) -->',
    '  <meta name="geo.region" content="SA">',
    '  <meta name="geo.placename" content="Riyadh">',
    '  <meta name="geo.position" content="24.7136;46.6753">',
    '  <meta name="ICBM" content="24.7136, 46.6753">',
    '',
    '  <!-- Schema.org JSON-LD (Organization + LocalBusiness + Service) -->',
    '  <script type="application/ld+json">',
    JSON.stringify(page.schema, null, 2),
    '  </script>',
    '',
    '  <!-- Fonts (self-hosted, preload critical weights — family-weight.woff2 convention) -->',
    `  <link rel="preload" href="${theme}/fonts/space-grotesk-700.woff2" as="font" type="font/woff2" crossorigin>`,
    `  <link rel="preload" href="${theme}/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin>`,
    '',
    '  <!-- Styles -->',
    '  <link rel="stylesheet" href="css/tailwind.css?v=2">',
    `  <link rel="stylesheet" href="${theme}/css/tokens.css">`,
    `  <link rel="stylesheet" href="${theme}/css/utilities.css">`,
    `  <link rel="stylesheet" href="${theme}/css/base.css">`,
    `  <link rel="stylesheet" href="${theme}/css/motion.css">`,
    `  <link rel="stylesheet" href="${theme}/vendor/phosphor/style.css">`,
    css,
    '',
    '  <!-- Scripts (deferred) -->',
    `  <script defer src="${theme}/vendor/alpine.min.js"></script>`,
    `  <script defer src="${theme}/js/main.js?v=2"></script>`,
    js,
  ].filter(Boolean).join('\n');
}

// ---------------------------------------------------------------------------
// Section resolution — tokens resolve relative to the OUTPUT page (sections
// are injected into the page, so their relative paths must be page-relative).
// ---------------------------------------------------------------------------
function resolveSection(relPath, pageRoot) {
  const file = path.join(DESIGN_DIR, relPath);
  if (!fs.existsSync(file)) throw new Error(`missing section: ${relPath}`);
  const theme = path.relative(pageRoot, THEME_ASSETS_DIR).split(path.sep).join('/');
  const page = path.relative(pageRoot, pageRoot).split(path.sep).join('/') || '.';
  return fs
    .readFileSync(file, 'utf8')
    .replace(/\{\{THEME_ASSETS\}\}/g, theme)
    .replace(/\{\{PAGE_ASSETS\}\}/g, page);
}

// ---------------------------------------------------------------------------
// Lint pass — strict: any violation fails the build.
// ---------------------------------------------------------------------------
function lint(html, name) {
  const errors = [];
  const h1 = (html.match(/<h1\b/g) || []).length;
  if (h1 !== 1) errors.push(`expected exactly 1 <h1>, found ${h1}`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  if (dupes.length) errors.push(`duplicate IDs: ${dupes.join(', ')}`);
  if (/\{\{(THEME|PAGE)_ASSETS\}\}/.test(html)) errors.push('unresolved {{*_ASSETS}} token');
  const tokenHex = fs.readFileSync(path.join(THEME_ASSETS_DIR, 'css', 'tokens.css'), 'utf8').match(/#[0-9a-fA-F]{6}\b/g) || [];
  for (const hex of [...new Set(tokenHex)]) {
    if (html.includes(hex)) errors.push(`hardcoded hex ${hex} — use var(--cgp-*) or a cgp-* utility`);
  }
  const cdn = html.match(/https?:\/\/[^"'\s]*(?:jsdelivr|unpkg|googleapis|gstatic|cloudflare|jquery|tailwindcss|cdnjs)[^"'\s]*/gi);
  if (cdn) errors.push(`CDN link: ${cdn[0]}`);
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\balt=/.test(img)) errors.push('img without alt attribute');
  }
  const bgs = [...html.matchAll(/<section\b[^>]*class="([^"]*)"/g)].map((m) =>
    m[1].includes('bg-cgp-bg-section') ? 'section' : m[1].includes('bg-cgp-bg-page') ? 'page' : null
  );
  for (let i = 1; i < bgs.length; i++) {
    if (bgs[i] && bgs[i] === bgs[i - 1]) errors.push(`adjacent same-bg sections (${bgs[i]}) at index ${i - 1}-${i}`);
  }
  if (errors.length) {
    console.error(`✗ lint failed (${name}):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Build — marker replacement is idempotent (markers re-emitted).
// ---------------------------------------------------------------------------
function main() {
  const template = fs.readFileSync(path.join(DESIGN_DIR, 'index.html'), 'utf8');
  for (const [name, page] of Object.entries(PAGES)) {
    const pageRoot = path.dirname(path.join(DESIGN_DIR, page.output));
    const header = resolveSection(page.sections.header === 'shared' ? 'shared/sections/header.html' : page.sections.header, pageRoot);
    const footer = resolveSection(page.sections.footer === 'shared' ? 'shared/sections/footer.html' : page.sections.footer, pageRoot);
    const main = page.sections.main.map((s) => resolveSection(s, pageRoot)).join('\n\n');
    lint([header, main, footer].join('\n\n'), name);
    // Cursor-based injection: each marker's region spans from the end of the
    // previous marker to the end of this marker. Static template text between
    // markers (</head>, <body>, skip link, <main>) is extracted fresh each run
    // and re-inserted, so re-runs replace old content instead of appending.
    const parts = { head: buildHead(page), header, sections: main, footer };
    const order = ['head', 'header', 'sections', 'footer'];
    const pad = { head: '\n', header: '', sections: '', footer: '' };
    let out = template;
    const gaps = {
      header: out.slice(out.indexOf(MARKERS.head) + MARKERS.head.length, out.indexOf('</a>', out.indexOf('cgp-skip-link')) + 4) + '\n\n  ',
      sections: out.slice(out.indexOf(MARKERS.header) + MARKERS.header.length, out.indexOf('<main id="main">') + '<main id="main">'.length) + '\n    ',
      footer: out.slice(out.indexOf(MARKERS.sections) + MARKERS.sections.length, out.indexOf('</main>') + '</main>'.length) + '\n\n  ',
    };
    let prevEnd = out.indexOf('<head>') + '<head>'.length;
    for (const key of order) {
      const marker = MARKERS[key];
      const start = out.indexOf(marker, prevEnd);
      if (start === -1) throw new Error(`marker ${marker} missing in template`);
      const end = start + marker.length;
      const insert = pad[key] + (gaps[key] || '') + parts[key] + '\n  ' + marker;
      out = out.slice(0, prevEnd) + insert + out.slice(end);
      prevEnd = prevEnd + insert.length;
    }
    fs.writeFileSync(path.join(DESIGN_DIR, page.output), out, 'utf8');
    console.log(`✓ ${name} → ${page.output} (${page.sections.main.length} sections, lint clean)`);
  }
}

main();

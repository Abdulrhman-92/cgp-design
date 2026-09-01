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
// Cache-busting — auto version from file mtime (never manual ?v=N).
// Every asset gets ?v=<mtime-ms> so the browser refetches ONLY when changed.
// ---------------------------------------------------------------------------
function assetVersion(relPath) {
  const full = path.join(DESIGN_DIR, relPath);
  try {
    return String(fs.statSync(full).mtimeMs).slice(0, 10);
  } catch {
    return '1';
  }
}

// ---------------------------------------------------------------------------
// PAGES manifest — owns the <head> and section order per page.
// sections.header/footer: 'shared' → shared/sections/<name>.html (the unified
// site-wide header/footer), or a page-specific path (mirrors WP header-{slug}.php
// overrides). Optional headerPos/ctaHref configure the shared header per page.
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
    js: ['main.js', 'home/js/home.js'], // 'main.js' = theme assets/js/main.js; '<path>.js' = relative to design/v1
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
  configurator: {
    output: 'configurator/index.html',
    title: 'CGP | Master Configuration Matrix — Build Your Bespoke PC | Riyadh',
    description: 'Configure your bespoke water-cooled PC at CGP — The Bespoke Forge. Select elite hardware, exotic materials, and thermodynamic architecture. Commissioned in Riyadh.',
    canonical: 'https://cgp.sa/configurator/',
    ogImage: 'https://cgp.sa/assets/images/hotwheel.webp', // absolute — page lives one level deep
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
    css: ['configurator/css/configurator.css'],
    js: ['main.js', 'configurator/js/parts-data.js', 'configurator/js/configurator.js'],
    headerPos: 'bottom-24', // mobile: clear the sticky commission summary bar
    ctaHref: '#commission',
    sections: {
      header: 'shared', // unified site-wide header
      main: [
        'configurator/sections/hero.html',
        'configurator/sections/matrix.html',
        'configurator/sections/mobile-bar.html',
        'configurator/sections/commission.html',
      ],
      footer: 'shared',
    },
  },
  shop: {
    output: 'shop/index.html',
    title: 'CGP | The Shop — Pre-Built Systems & Signature Components | Riyadh',
    description: 'Browse CGP pre-built water-cooled systems and signature components — The Bespoke Forge, Riyadh. Every unit pressure-tested and ready for its owner.',
    canonical: 'https://cgp.sa/shop/',
    ogImage: 'https://cgp.sa/assets/images/hotwheel.webp', // absolute — page lives one level deep
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
          '@type': 'ItemList',
          '@id': 'https://cgp.sa/shop/#catalog',
          name: 'CGP Pre-Built Systems & Signature Components',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'The Wraith' },
            { '@type': 'ListItem', position: 2, name: 'The Hotwheel' },
            { '@type': 'ListItem', position: 3, name: 'Titanium Core' },
            { '@type': 'ListItem', position: 4, name: 'Neon Genesis' },
            { '@type': 'ListItem', position: 5, name: 'Project Obsidian' },
            { '@type': 'ListItem', position: 6, name: 'CGP Custom Distro Plate' },
          ],
        },
      ],
    },
    css: ['shop/css/shop.css'],
    js: ['main.js', 'shop/js/shop-data.js', 'shop/js/shop.js'],
    ctaHref: '{{CONFIG_URL}}',
    sections: {
      header: 'shared', // unified site-wide header
      main: [
        'shop/sections/hero.html',
        'shop/sections/featured.html',
        'shop/sections/filters.html',
        'shop/sections/grid.html',
        'shop/sections/upsell.html',
      ],
      footer: 'shared',
    },
  },
  product: {
    output: 'product/index.html',
    title: 'The Hotwheel | CGP Bespoke Water-Cooled PC — Riyadh',
    description: 'The Hotwheel — CGP\'s legendary circular chassis. RTX 5090, Ryzen 9 9950X, dual cryo-loop. 25,000 SAR, forged in Riyadh. Inquire at The Bespoke Forge.',
    canonical: 'https://cgp.sa/product/the-hotwheel/',
    ogImage: 'https://cgp.sa/assets/images/hotwheel.webp', // absolute — page lives one level deep
    ogType: 'product',
    ogPrice: { amount: '25000', currency: 'SAR' },
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
          '@type': 'Product',
          '@id': 'https://cgp.sa/product/the-hotwheel/#product',
          name: 'The Hotwheel',
          description: 'Legendary circular chassis — RTX 5090, Ryzen 9 9950X, dual cryo-loop.',
          image: 'https://cgp.sa/assets/images/hotwheel.webp',
          sku: 'unit-hotwheel',
          brand: { '@id': 'https://cgp.sa/#organization' },
          offers: {
            '@type': 'Offer',
            url: 'https://cgp.sa/product/the-hotwheel/',
            priceCurrency: 'SAR',
            price: '25000',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: { '@id': 'https://cgp.sa/#store' },
            areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://cgp.sa/product/the-hotwheel/#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cgp.sa/' },
            { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://cgp.sa/shop/' },
            { '@type': 'ListItem', position: 3, name: 'The Hotwheel', item: 'https://cgp.sa/product/the-hotwheel/' },
          ],
        },
      ],
    },
    css: ['product/css/product.css'],
    js: ['main.js', 'product/js/product.js'],
    headerPos: 'top-4', // mobile: island pinned to the top above the hero
    ctaHref: '{{CONFIG_URL}}',
    sections: {
      header: 'shared', // unified site-wide header
      main: [
        'product/sections/hero.html',
        'product/sections/sticky-cta.html',
        'product/sections/specs.html',
        'product/sections/forge-log.html',
        'product/sections/related.html',
      ],
      footer: 'shared',
    },
  },
  about: {
    output: 'about/index.html',
    title: 'About CGP | The Bespoke Forge — Masters of Bespoke PC Architecture',
    description: "Meet CGP — The Bespoke Forge. Riyadh's atelier for bespoke water-cooled PCs: our philosophy, our forging process, and the masters behind every machine.",
    canonical: 'https://cgp.sa/about/',
    ogImage: 'https://cgp.sa/assets/images/hotwheel.webp', // absolute — page lives one level deep
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
          '@type': 'AboutPage',
          '@id': 'https://cgp.sa/about/#page',
          url: 'https://cgp.sa/about/',
          name: 'About CGP | The Bespoke Forge — Masters of Bespoke PC Architecture',
          description: "Meet CGP — The Bespoke Forge. Riyadh's atelier for bespoke water-cooled PCs: our philosophy, our forging process, and the masters behind every machine.",
          mainEntity: { '@id': 'https://cgp.sa/#store' },
          about: { '@id': 'https://cgp.sa/#organization' },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://cgp.sa/about/#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cgp.sa/' },
            { '@type': 'ListItem', position: 2, name: 'About', item: 'https://cgp.sa/about/' },
          ],
        },
      ],
    },
    css: ['about/css/about.css'],
    js: ['main.js'], // reveals/magnetic come from theme main.js — no page JS
    sections: {
      header: 'shared', // unified site-wide header
      main: [
        'about/sections/hero.html',
        'about/sections/story.html',
        'about/sections/pillars.html',
        'about/sections/process.html',
        'about/sections/masters.html',
        'about/sections/cta.html',
      ],
      footer: 'shared',
    },
  },
  blog: {
    output: 'blog/index.html',
    title: 'CGP Blog | Notes From The Bespoke Forge — Riyadh, Saudi Arabia',
    description: 'Field notes from CGP — The Bespoke Forge: build diaries, coolant chemistry, loop architecture, and the engineering behind every bespoke water-cooled machine.',
    canonical: 'https://cgp.sa/blog/',
    ogImage: 'https://cgp.sa/assets/images/hotwheel.webp', // absolute — page lives one level deep
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
          '@type': 'Blog',
          '@id': 'https://cgp.sa/blog/#blog',
          url: 'https://cgp.sa/blog/',
          name: 'CGP Blog — Notes From The Bespoke Forge',
          description: 'Build diaries, coolant chemistry, loop architecture, and the engineering behind every bespoke water-cooled machine.',
          publisher: { '@id': 'https://cgp.sa/#organization' },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://cgp.sa/blog/#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cgp.sa/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://cgp.sa/blog/' },
          ],
        },
      ],
    },
    css: ['blog/css/blog.css'],
    js: ['main.js'], // reveals/magnetic come from theme main.js — no page JS
    sections: {
      header: 'shared', // unified site-wide header
      main: [
        'blog/sections/hero.html',
        'blog/sections/featured.html',
        'blog/sections/grid.html',
        'blog/sections/cta.html',
      ],
      footer: 'shared',
    },
  },
  post: {
    output: 'post/index.html',
    title: "Behind The Build: The Hotwheel's Twin Loops | CGP Field Notes",
    description: 'ENTRY_042 — the full build diary of the Hotwheel: two independent cryo loops, a circular distro ring, 14 hardline bends, and the 48-hour leak test that made it ship-worthy.',
    canonical: 'https://cgp.sa/blog/entry-042-hotwheel-twin-loops/',
    ogImage: 'https://cgp.sa/assets/images/hotwheel.webp', // absolute — page lives two levels deep
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
          '@type': 'BlogPosting',
          '@id': 'https://cgp.sa/blog/entry-042-hotwheel-twin-loops/#post',
          url: 'https://cgp.sa/blog/entry-042-hotwheel-twin-loops/',
          headline: "Behind The Build: The Hotwheel's Twin Loops",
          description: 'Two independent cryo loops, a circular distro ring, 14 hardline bends, and the 48-hour leak test — the full diary of ENTRY_042.',
          image: 'https://cgp.sa/assets/images/hotwheel.webp',
          datePublished: '2026-08-20',
          dateModified: '2026-08-20',
          articleSection: 'Build Diary',
          wordCount: 880,
          inLanguage: 'en',
          author: { '@id': 'https://cgp.sa/#organization' },
          publisher: { '@id': 'https://cgp.sa/#organization' },
          isPartOf: { '@id': 'https://cgp.sa/blog/#blog' },
          mainEntityOfPage: 'https://cgp.sa/blog/entry-042-hotwheel-twin-loops/',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://cgp.sa/blog/entry-042-hotwheel-twin-loops/#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cgp.sa/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://cgp.sa/blog/' },
            { '@type': 'ListItem', position: 3, name: "Behind The Build: The Hotwheel's Twin Loops", item: 'https://cgp.sa/blog/entry-042-hotwheel-twin-loops/' },
          ],
        },
      ],
    },
    css: ['post/css/post.css'],
    js: ['main.js', 'post/js/post.js'], // main.js (reveals/magnetic) + dossier behaviors
    sections: {
      header: 'shared', // unified site-wide header
      main: [
        'post/sections/masthead.html',
        'post/sections/dossier.html',
        'post/sections/nextfile.html',
      ],
      footer: 'shared',
    },
  },
  archives: {
    output: 'archives/index.html',
    title: 'CGP Archives | Previously Forged Masterpieces — Riyadh, Saudi Arabia',
    description: 'Browse the CGP archive — every bespoke water-cooled PC forged in Riyadh, photographed and filed: The Hotwheel, Project Obsidian, Titanium Core, and more.',
    canonical: 'https://cgp.sa/archives/',
    ogImage: 'https://cgp.sa/assets/images/hotwheel.webp', // absolute — page lives one level deep
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
          '@type': ['CollectionPage', 'ImageGallery'],
          '@id': 'https://cgp.sa/archives/#page',
          url: 'https://cgp.sa/archives/',
          name: 'CGP Archives | Previously Forged Masterpieces — Riyadh, Saudi Arabia',
          description: 'The permanent record of The Bespoke Forge — every bespoke water-cooled machine, photographed and filed before it ships.',
          about: { '@id': 'https://cgp.sa/#store' },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'The Hotwheel' },
              { '@type': 'ListItem', position: 2, name: 'The Wraith' },
              { '@type': 'ListItem', position: 3, name: 'Project Obsidian' },
              { '@type': 'ListItem', position: 4, name: 'Titanium Core' },
              { '@type': 'ListItem', position: 5, name: 'Neon Genesis' },
              { '@type': 'ListItem', position: 6, name: 'CGP Custom Distro Plate' },
            ],
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://cgp.sa/archives/#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cgp.sa/' },
            { '@type': 'ListItem', position: 2, name: 'Archives', item: 'https://cgp.sa/archives/' },
          ],
        },
      ],
    },
    css: ['archives/css/archives.css'],
    js: ['main.js'], // reveals/magnetic come from theme main.js — no page JS
    sections: {
      header: 'shared', // unified site-wide header
      main: [
        'archives/sections/hero.html',
        'archives/sections/collection.html',
        'archives/sections/ledger.html',
        'archives/sections/cta.html',
      ],
      footer: 'shared',
    },
  },
  contact: {
    output: 'contact/index.html',
    title: 'Contact CGP | The Bespoke Forge — Riyadh, Saudi Arabia',
    description: 'Commission a bespoke water-cooled PC at CGP — The Bespoke Forge, Riyadh. Open a channel to our masters. We respond within 24 hours.',
    canonical: 'https://cgp.sa/contact/',
    ogImage: 'https://cgp.sa/assets/images/hotwheel.webp', // absolute — page lives one level deep
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
    css: ['contact/css/contact.css'],
    js: ['main.js'], // form is inline Alpine — no page JS
    headerPos: 'bottom-24', // mobile: clear the floating dock
    ctaHref: '#commission-desk',
    sections: {
      header: 'shared', // unified site-wide header
      main: [
        'contact/sections/hero.html',
        'contact/sections/desk.html',
        'contact/sections/door.html',
      ],
      footer: 'shared',
    },
  },
};

// ---------------------------------------------------------------------------
// Head generation — manifest owns title/description/canonical/ogImage/schema.
// CSS is CONCATENATED into one theme.css (tokens+base+utilities+motion) to cut
// render-blocking requests from 7 → 3 (tailwind + theme + page).
// ---------------------------------------------------------------------------
function buildHead(page) {
  const origin = page.canonical.replace(/\/$/, '');
  // og:type defaults to website; product pages emit og:price from ogPrice
  const ogType = page.ogType || 'website';
  // ogImage may be absolute (deep pages) or relative (homepage root)
  const ogImage = /^https?:\/\//.test(page.ogImage) ? page.ogImage : origin + '/' + page.ogImage;
  // ALL asset paths resolve relative to the OUTPUT page's directory (pageRoot),
  // not to design/v1 — deep pages (configurator/) need ../ prefixes.
  const pageRoot = path.dirname(path.join(DESIGN_DIR, page.output));
  const rel = (p) => path.relative(pageRoot, p).split(path.sep).join('/');
  const theme = rel(THEME_ASSETS_DIR);
  const css = page.css.map((c) => `  <link rel="stylesheet" href="${rel(path.join(DESIGN_DIR, c))}?v=${assetVersion(c)}">`).join('\n');
  const js = page.js.map((s) => `  <script defer src="${rel(s === 'main.js' ? path.join(THEME_ASSETS_DIR, 'js', 'main.js') : path.join(DESIGN_DIR, s))}"></script>`).join('\n');
  const favicon = rel(path.join(DESIGN_DIR, 'favicon.svg'));
  const tailwindCss = rel(path.join(DESIGN_DIR, 'css', 'tailwind.css'));
  const themeCss = rel(path.join(DESIGN_DIR, 'css', 'theme.css'));
  const bundleJs = rel(path.join(DESIGN_DIR, 'js', 'bundles', page.bundle + '.min.js'));
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
    `  <link rel="icon" type="image/svg+xml" href="${favicon}">`,
    '  <!-- TODO: replace with the live URL before launch -->',
    `  <link rel="canonical" href="${page.canonical}">`,
    `  <link rel="alternate" hreflang="en" href="${page.canonical}">`,
    `  <link rel="alternate" hreflang="x-default" href="${page.canonical}">`,
    '',
    '  <!-- Open Graph -->',
    `  <meta property="og:type" content="${ogType}">`,
    '  <meta property="og:site_name" content="CGP">',
    `  <meta property="og:title" content="${page.title}">`,
    `  <meta property="og:description" content="${page.description}">`,
    `  <meta property="og:url" content="${page.canonical}">`,
    `  <meta property="og:image" content="${ogImage}">`,
    '  <meta property="og:locale" content="en_SA">',
    ...(ogType === 'product' && page.ogPrice
      ? [
          `  <meta property="og:price:amount" content="${page.ogPrice.amount}">`,
          `  <meta property="og:price:currency" content="${page.ogPrice.currency}">`,
        ]
      : []),
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
    '  <!-- Styles (3 requests: tailwind + concatenated theme + page) -->',
    `  <link rel="stylesheet" href="${tailwindCss}?v=${assetVersion('css/tailwind.css')}">`,
    `  <link rel="stylesheet" href="${themeCss}?v=${assetVersion('css/theme.css')}">`,
    `  <link rel="stylesheet" href="${theme}/vendor/phosphor/style.css">`,
    css,
    '',
    '  <!-- Scripts (deferred — ONE bundle per page, minified) -->',
    // Bundle FIRST, Alpine AFTER: Alpine 3.14+ auto-starts on a microtask
    // (queueMicrotask) right after its own script — NOT on DOMContentLoaded.
    // The bundle must register its alpine:init listeners before that microtask
    // runs, or Alpine.data() components are never registered.
    `  <script defer src="${bundleJs}?v=${assetVersion('js/bundles/' + page.bundle + '.min.js')}"></script>`,
    `  <script defer src="${theme}/vendor/alpine.min.js"></script>`,
  ].filter(Boolean).join('\n');
}

// ---------------------------------------------------------------------------
// JS bundle — concat the page's JS files (theme main.js + page js) into ONE
// minified file per page. Rule: a page loads ONLY what it needs, as a single
// bundle. 'main.js' resolves to theme assets/js/main.js; other entries are
// paths relative to design/v1.
// ---------------------------------------------------------------------------
function buildJsBundle(name, page) {
  const files = (page.js || []).map((f) =>
    f === 'main.js' ? path.join(THEME_ASSETS_DIR, 'js', 'main.js') : path.join(DESIGN_DIR, f)
  );
  if (!files.length) return;
  const raw = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n\n');
  // Lightweight minify (safe for our own code — no template literals with //):
  // strip block comments, line comments, blank lines, trim each line.
  const min = raw
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/\n{2,}/g, '\n')
    .replace(/^\s+|\s+$/gm, '')
    .trim();
  const outDir = path.join(DESIGN_DIR, 'js', 'bundles');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, name + '.min.js');
  fs.writeFileSync(outFile, min, 'utf8');
  console.log(`  ✓ js bundle → js/bundles/${name}.min.js (${(min.length / 1024).toFixed(1)} KB)`);
}

// ---------------------------------------------------------------------------
// Concatenate theme CSS (tokens + base + utilities + motion) into one file.
// Source stays in the theme (single source of truth); output is a build artifact.
// ---------------------------------------------------------------------------
function buildThemeCss() {
  const parts = ['tokens.css', 'base.css', 'utilities.css', 'motion.css'];
  const out = parts
    .map((f) => fs.readFileSync(path.join(THEME_ASSETS_DIR, 'css', f), 'utf8'))
    .join('\n\n')
    // Fix relative font paths: theme CSS uses url('../fonts/...') (relative to
    // assets/css/), but the concatenated file lives at design/v1/css/theme.css
    // → re-resolve from the CSS dir (3 levels up), quote optional.
    .replace(/url\(['"]?\.\.\/fonts\//g, `url('${path.relative(path.join(DESIGN_DIR, 'css'), THEME_ASSETS_DIR).split(path.sep).join('/')}/fonts/`);
  fs.writeFileSync(path.join(DESIGN_DIR, 'css', 'theme.css'), out, 'utf8');
}

// ---------------------------------------------------------------------------
// robots.txt — allow all + sitemap placeholder (SEO audit).
// ---------------------------------------------------------------------------
function buildRobotsTxt() {
  const content = [
    'User-agent: *',
    'Allow: /',
    '',
    '# TODO: replace with the live sitemap URL before launch',
    'Sitemap: https://cgp.sa/sitemap.xml',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(DESIGN_DIR, 'robots.txt'), content, 'utf8');
}

// ---------------------------------------------------------------------------
// Section resolution — tokens resolve relative to the OUTPUT page (sections
// are injected into the page, so their relative paths must be page-relative).
// `page` carries optional headerPos/ctaHref for the unified shared header.
// ---------------------------------------------------------------------------
function resolveSection(relPath, page) {
  const pageRoot = path.dirname(path.join(DESIGN_DIR, page.output));
  const file = path.join(DESIGN_DIR, relPath);
  if (!fs.existsSync(file)) throw new Error(`missing section: ${relPath}`);
  const theme = path.relative(pageRoot, THEME_ASSETS_DIR).split(path.sep).join('/');
  // PAGE_ASSETS = relative path from the OUTPUT page to design/v1 root
  // ('.' for homepage, '..' for deep pages) — images live in design/v1/assets/
  const pageAssets = path.relative(pageRoot, DESIGN_DIR).split(path.sep).join('/') || '.';
  // Cross-page link tokens: '' for the homepage itself, relative path otherwise
  const homeRel = path.relative(pageRoot, path.join(DESIGN_DIR, 'index.html')).split(path.sep).join('/');
  const homeUrl = homeRel === 'index.html' ? '' : homeRel;
  const configRel = path.relative(pageRoot, path.join(DESIGN_DIR, 'configurator', 'index.html')).split(path.sep).join('/');
  const configUrl = configRel === 'configurator/index.html' ? 'configurator/index.html' : configRel;
  const shopRel = path.relative(pageRoot, path.join(DESIGN_DIR, 'shop', 'index.html')).split(path.sep).join('/');
  const shopUrl = shopRel === 'shop/index.html' ? 'shop/index.html' : shopRel;
  const productRel = path.relative(pageRoot, path.join(DESIGN_DIR, 'product', 'index.html')).split(path.sep).join('/');
  const productUrl = productRel === 'product/index.html' ? 'product/index.html' : productRel;
  const contactRel = path.relative(pageRoot, path.join(DESIGN_DIR, 'contact', 'index.html')).split(path.sep).join('/');
  const contactUrl = contactRel === 'contact/index.html' ? 'contact/index.html' : contactRel;
  const aboutRel = path.relative(pageRoot, path.join(DESIGN_DIR, 'about', 'index.html')).split(path.sep).join('/');
  const aboutUrl = aboutRel === 'index.html' ? '' : aboutRel; // self-link → '' (stays on /about/)
  const blogRel = path.relative(pageRoot, path.join(DESIGN_DIR, 'blog', 'index.html')).split(path.sep).join('/');
  const blogUrl = blogRel === 'index.html' ? '' : blogRel; // self-link → '' (stays on /blog/)
  const postRel = path.relative(pageRoot, path.join(DESIGN_DIR, 'post', 'index.html')).split(path.sep).join('/');
  const postUrl = postRel === 'index.html' ? '' : postRel; // self-link → '' (stays on the post)
  const archivesRel = path.relative(pageRoot, path.join(DESIGN_DIR, 'archives', 'index.html')).split(path.sep).join('/');
  const archivesUrl = archivesRel === 'index.html' ? '' : archivesRel; // self-link → '' (stays on /archives/)
  // Token map — link tokens first; per-page header tokens resolve against them.
  const tokens = {
    THEME_ASSETS: theme,
    PAGE_ASSETS: pageAssets,
    HOME_URL: homeUrl,
    CONFIG_URL: configUrl,
    SHOP_URL: shopUrl,
    PRODUCT_URL: productUrl,
    CONTACT_URL: contactUrl,
    ABOUT_URL: aboutUrl,
    BLOG_URL: blogUrl,
    POST_URL: postUrl,
    ARCHIVES_URL: archivesUrl,
    HEADER_MOBILE_POS: page.headerPos || 'bottom-6', // shared-header mobile island position
  };
  // CTA_HREF values may reference the link tokens above (e.g. '{{CONFIG_URL}}')
  // — pre-resolve them before adding CTA_HREF to the map.
  tokens.CTA_HREF = Object.entries(tokens).reduce(
    (href, [key, val]) => href.split(`{{${key}}}`).join(val),
    page.ctaHref || (homeUrl ? `${homeUrl}#inquiry` : '#inquiry') // shared-header CTA target
  );
  return Object.entries(tokens).reduce(
    (html, [key, val]) => html.split(`{{${key}}}`).join(val),
    fs.readFileSync(file, 'utf8')
  );
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
  buildThemeCss();
  buildRobotsTxt();
  const template = fs.readFileSync(path.join(DESIGN_DIR, 'template.html'), 'utf8');
  for (const [name, page] of Object.entries(PAGES)) {
    page.bundle = name; // bundle filename = page name
    buildJsBundle(name, page);
    const pageRoot = path.dirname(path.join(DESIGN_DIR, page.output));
    const header = resolveSection(page.sections.header === 'shared' ? 'shared/sections/header.html' : page.sections.header, page);
    const footer = resolveSection(page.sections.footer === 'shared' ? 'shared/sections/footer.html' : page.sections.footer, page);
    const main = page.sections.main.map((s) => resolveSection(s, page)).join('\n\n');
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

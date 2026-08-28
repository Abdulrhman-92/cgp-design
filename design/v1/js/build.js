#!/usr/bin/env node
/**
 * CGP design/v1 build script — zero dependencies (Node built-ins only).
 *
 * Assembles section files into the self-contained design/v1/index.html.
 * fetch() fails on file://, so everything must be inlined at build time.
 *
 * Usage (from project root):
 *   node design/v1/js/build.js
 *
 * Conventions:
 *   - Section files live in design/v1/sections/, one per homepage section.
 *   - {{THEME_ASSETS}} inside section files resolves to
 *     ../../wp-content/themes/cgp/assets (single source of truth).
 *   - The <!-- SECTIONS --> marker in index.html is replaced by the
 *     concatenated sections and re-emitted, so re-running the build is safe
 *     (sections are replaced, never duplicated).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..'); // project root
const DESIGN_DIR = path.join(ROOT, 'design', 'v1');
const INDEX_PATH = path.join(DESIGN_DIR, 'index.html');
const THEME_ASSETS = path.join('..', '..', 'wp-content', 'themes', 'cgp', 'assets');

// Manifest — explicit order, matches the homepage section flow.
const MANIFEST = [
  'sections/header.html',
  'sections/hero.html',
  'sections/vision.html',
  'sections/showcase.html',
  'sections/metrics.html',
  'sections/guarantee.html',
  'sections/gallery.html',
  'sections/shop.html',
  'sections/blog.html',
  'sections/inquiry.html',
  'sections/footer.html',
];

const MARKER = '<!-- SECTIONS -->';

function main() {
  if (!fs.existsSync(INDEX_PATH)) {
    console.error(`✗ ${INDEX_PATH} not found — run from project root`);
    process.exit(1);
  }

  const template = fs.readFileSync(INDEX_PATH, 'utf8');
  if (!template.includes(MARKER)) {
    console.error(`✗ ${MARKER} marker not found in index.html — already built?`);
    process.exit(1);
  }

  // Resolve {{THEME_ASSETS}} in the template head too (styles, scripts, preloads)
  const resolvedTemplate = template.replace(/\{\{THEME_ASSETS\}\}/g, THEME_ASSETS);

  const sections = [];
  for (const file of MANIFEST) {
    const fullPath = path.join(DESIGN_DIR, file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠ skipping missing section: ${file}`);
      continue;
    }
    let html = fs.readFileSync(fullPath, 'utf8');
    html = html.replace(/\{\{THEME_ASSETS\}\}/g, THEME_ASSETS);
    sections.push(html);
  }

  // Idempotent: strip any previously injected sections between <main> and </main>,
  // then inject fresh. Prevents duplication on re-runs.
  const mainOpen = '<main id="main">';
  const mainClose = '</main>';
  const startIdx = resolvedTemplate.indexOf(mainOpen);
  const endIdx = resolvedTemplate.indexOf(mainClose);
  if (startIdx === -1 || endIdx === -1) {
    console.error('✗ <main id="main"> or </main> not found in index.html');
    process.exit(1);
  }
  const head = resolvedTemplate.slice(0, startIdx + mainOpen.length);
  const tail = resolvedTemplate.slice(endIdx);

  const injected = '\n    ' + sections.join('\n\n') + '\n    ' + MARKER + '\n  ';
  const output = head + injected + tail;

  fs.writeFileSync(INDEX_PATH, output, 'utf8');
  console.log(`✓ index.html built (${sections.length} sections)`);
}

main();
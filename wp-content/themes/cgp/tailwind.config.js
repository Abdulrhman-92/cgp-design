/**
 * CGP Tailwind Config — maps docs/design-system.md tokens to utilities.
 * Values are EXACT copies of the token table. Single source: assets/css/tokens.css.
 * Usage: text-cgp-display-1, bg-cgp-accent, font-display, rounded-cgp-2xl,
 *        shadow-cgp-glow-strong, tracking-cgp-03em, p-cgp-6, max-w-cgp-container-lg.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // relative: true → globs resolve from THIS file's dir (wp-content/themes/cgp/),
  // so ../../../design/v1 = project-root/design/v1. Excludes client-prototypes/.
  content: {
    relative: true,
    files: ['../../../design/v1/**/*.html', './**/*.php'],
    // Strip HTML comments before extraction — comment words like "Hotwheel ring"
    // or "static SVG" must not generate .ring/.visible/.static utilities.
    transform: {
      html: (content) => content.replace(/<!--[\s\S]*?-->/g, ' '),
    },
  },
  theme: {
    extend: {
      colors: {
        cgp: {
          'bg-page': '#050505',
          'bg-section': '#09090b',
          'bg-card': '#18181b',
          'bg-card-glass': 'rgba(24, 24, 27, 0.5)',
          'bg-elevated': '#0a0a0a',
          'bg-overlay': 'rgba(0, 0, 0, 0.8)',
          'text-primary': '#f4f4f5',
          'text-heading': '#ffffff',
          'text-secondary': '#a1a1aa',
          'text-muted': '#71717a',
          'text-faint': '#52525b',
          'text-disabled': '#3f3f46',
          accent: '#06b6d4',
          'accent-bright': '#22d3ee',
          'accent-deep': '#0891b2',
          'accent-warm': '#f59e0b',
          border: '#27272a',
          'border-strong': '#3f3f46',
          'border-subtle': '#18181b',
          'border-accent': 'rgba(6, 182, 212, 0.3)',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        // display-1 is responsive via tokens.css: 72px mobile, 128px md+.
        'cgp-display-1': 'var(--cgp-text-display-1)',
        'cgp-display-2': '60px',
        'cgp-display-3': '48px',
        'cgp-display-4': '36px',
        'cgp-h2': '30px',
        'cgp-h3': '24px',
        'cgp-h4': '20px',
        'cgp-lg': '18px',
        'cgp-base': '16px',
        'cgp-sm': '14px',
        'cgp-xs': '12px',
        'cgp-micro': '10px',
        'cgp-nano': '8px',
      },
      spacing: {
        'cgp-1': '4px',
        'cgp-2': '8px',
        'cgp-3': '12px',
        'cgp-4': '16px',
        'cgp-6': '24px',
        'cgp-8': '32px',
        'cgp-10': '40px',
        'cgp-12': '48px',
        'cgp-16': '64px',
        'cgp-20': '80px',
        'cgp-24': '96px',
        'cgp-32': '128px',
      },
      borderRadius: {
        'cgp-full': '9999px',
        'cgp-3xl': '24px',
        'cgp-2xl': '16px',
        'cgp-xl': '12px',
        'cgp-lg': '8px',
        'cgp-sm': '2px',
        'cgp-none': '0',
      },
      maxWidth: {
        'cgp-container-sm': '768px',
        'cgp-container-md': '1152px',
        'cgp-container-lg': '1280px',
        'cgp-container-xl': '1440px',
      },
      boxShadow: {
        'cgp-glow-text': '0 0 20px rgba(6, 182, 212, 0.5)',
        'cgp-glow-soft': '0 0 15px rgba(34, 211, 238, 0.15)',
        'cgp-glow-strong': '0 0 20px rgba(34, 211, 238, 0.6)',
        'cgp-glow-black': '0 20px 40px rgba(0, 0, 0, 0.5)',
      },
      letterSpacing: {
        'cgp-tighter': '-0.05em',
        'cgp-wide': '0.025em',
        'cgp-wider': '0.05em',
        'cgp-widest': '0.1em',
        'cgp-03em': '0.3em',
        'cgp-04em': '0.4em',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },
    },
  },
  plugins: [],
};
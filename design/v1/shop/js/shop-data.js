/**
 * CGP Shop — product catalog (mockup data).
 *
 * WP MIGRATION: replace this file with wc_get_products() loop + product meta.
 * Add a hidden `cost` field per product for margin reporting (never rendered).
 *
 * REPEAT: product card — loop over wc_get_products()
 * REPEAT: spec row — loop over product attributes
 * REPEAT: category pill — loop over wc_get_product_categories()
 * TODO: from site settings — real prices, stock, lead times
 * TODO: sync Distro Plate price with configurator parts-data.js (single source of truth)
 */
window.CGP_SHOP = {
  products: [
    /* ============ Pre-Built Systems ============ */
    {
      id: 'unit-wraith', type: 'prebuilt', name: 'The Wraith', subtitle: 'Ready to ship system',
      price: 18000, priceFrom: false, image: 'wraith.webp', badge: null,
      stock: 'low', leadTime: '1-2 weeks', featured: false, configurable: false,
      specs: [
        { k: 'CPU', v: 'Ryzen 9 9950X' },
        { k: 'GPU', v: 'RTX 5080' },
        { k: 'RAM', v: '64GB DDR5' },
        { k: 'LOOP', v: 'CGP Custom Loop' }
      ]
    },
    {
      id: 'unit-hotwheel', type: 'prebuilt', name: 'The Hotwheel', subtitle: 'Legendary circular chassis',
      price: 25000, priceFrom: false, image: 'hotwheel.webp', badge: 'flagship',
      stock: 'in', leadTime: '3-5 days', featured: true, configurable: false,
      specs: [
        { k: 'CPU', v: 'Ryzen 9 9950X' },
        { k: 'GPU', v: 'RTX 5090' },
        { k: 'RAM', v: '64GB DDR5' },
        { k: 'LOOP', v: 'Dual Cryo-Loop' }
      ]
    },
    {
      id: 'unit-titanium', type: 'prebuilt', name: 'Titanium Core', subtitle: 'Mini-ITX Watercooled',
      price: 14000, priceFrom: false, image: 'titanium-core.webp', badge: 'sff',
      stock: 'in', leadTime: '3-5 days', featured: false, configurable: false,
      specs: [
        { k: 'CPU', v: 'Ryzen 7 9800X3D' },
        { k: 'GPU', v: 'RTX 5080' },
        { k: 'RAM', v: '32GB DDR5' },
        { k: 'LOOP', v: 'Bespoke Distro' }
      ]
    },
    {
      id: 'unit-neon', type: 'prebuilt', name: 'Neon Genesis', subtitle: 'UV Reactive Loop',
      price: 22000, priceFrom: false, image: 'neon-genesis.webp', badge: 'uv',
      stock: 'order', leadTime: '2-3 weeks', featured: false, configurable: false,
      specs: [
        { k: 'CPU', v: 'Core Ultra 9 285K' },
        { k: 'GPU', v: 'RTX 5090' },
        { k: 'RAM', v: '64GB DDR5' },
        { k: 'LOOP', v: 'UV Reactive Loop' }
      ]
    },
    {
      id: 'unit-obsidian', type: 'prebuilt', name: 'Project Obsidian', subtitle: 'Dual Loop / Workstation',
      price: 19000, priceFrom: false, image: 'obsidian.webp', badge: 'workstation',
      stock: 'in', leadTime: '3-5 days', featured: false, configurable: false,
      specs: [
        { k: 'CPU', v: 'Ryzen 9 9950X' },
        { k: 'GPU', v: 'RTX 5080' },
        { k: 'RAM', v: '128GB DDR5' },
        { k: 'LOOP', v: 'Dual Loop' }
      ]
    },

    /* ============ Signature Components ============ */
    {
      id: 'comp-distro', type: 'component', name: 'CGP Custom Distro Plate', subtitle: 'Acrylic / D5 Pump Mount',
      price: 1200, priceFrom: false, image: 'distro-plate.webp', badge: 'new',
      stock: 'in', leadTime: '3-5 days', featured: false, configurable: false,
      specs: [
        { k: 'MATL', v: 'Medical Acrylic' },
        { k: 'PUMP', v: 'D5 Integrated' },
        { k: 'TEST', v: '48h Pressure' }
      ]
    }
  ],

  categories: [
    { id: 'all', name: 'All' },
    { id: 'prebuilt', name: 'Pre-Built Systems' },
    { id: 'component', name: 'Signature Components' }
  ],

  sortOptions: [
    { id: 'featured', name: 'Featured' },
    { id: 'price-asc', name: 'Price: Low to High' },
    { id: 'price-desc', name: 'Price: High to Low' }
  ],

  minimum: 10000 // SAR — bespoke commissions start here
};
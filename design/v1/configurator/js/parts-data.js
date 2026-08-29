/**
 * CGP Configurator — parts catalog (mockup data).
 *
 * WP MIGRATION: replace this file with a CPT/JSON endpoint loaded via
 * wp_localize_script. Add a hidden `cost` field per part for margin
 * reporting (never rendered client-side).
 *
 * REPEAT: part card — loop over CGP_PARTS.parts (WP: CPT/JSON endpoint)
 * REPEAT: option card — loop over CGP_PARTS.options (WP: CPT/JSON endpoint)
 * TODO: from site settings — real prices, stock, lead times
 */
window.CGP_PARTS = {
  parts: [
    /* ============ CPU ============ */
    { id: 'cpu-9950x', category: 'CPU', name: 'AMD Ryzen 9 9950X', price: 3200, description: '16-core / 32-thread flagship', icon: 'cpu', stock: 'in', leadTime: '3-5 days' },
    { id: 'cpu-285k', category: 'CPU', name: 'Intel Core Ultra 9 285K', price: 3100, description: '24-core hybrid architecture', icon: 'cpu', stock: 'in', leadTime: '3-5 days' },
    { id: 'cpu-9800x3d', category: 'CPU', name: 'AMD Ryzen 7 9800X3D', price: 2400, description: '3D V-Cache gaming king', icon: 'cpu', stock: 'low', leadTime: '1-2 weeks' },

    /* ============ GPU (amber accent) ============ */
    { id: 'gpu-5090', category: 'GPU', name: 'NVIDIA RTX 5090', price: 9500, description: '32GB GDDR7 — flagship silicon', icon: 'graphics-card', stock: 'order', leadTime: '2-3 weeks', note: 'requires 1200W+ PSU — master verification included' },
    { id: 'gpu-5080', category: 'GPU', name: 'NVIDIA RTX 5080', price: 5800, description: '16GB GDDR7 — 4K beast', icon: 'graphics-card', stock: 'in', leadTime: '3-5 days' },
    { id: 'gpu-9070xt', category: 'GPU', name: 'AMD Radeon RX 9070 XT', price: 3900, description: '16GB GDDR6 — RDNA 4', icon: 'graphics-card', stock: 'in', leadTime: '3-5 days' },

    /* ============ RAM ============ */
    { id: 'ram-64', category: 'RAM', name: '64GB DDR5 6000 (2×32)', price: 1400, description: 'Corsair Dominator Titanium', icon: 'memory', stock: 'in', leadTime: '3-5 days' },
    { id: 'ram-32', category: 'RAM', name: '32GB DDR5 6400 (2×16)', price: 800, description: 'G.Skill Trident Z5 Royal', icon: 'memory', stock: 'in', leadTime: '3-5 days' },
    { id: 'ram-128', category: 'RAM', name: '128GB DDR5 5600 (4×32)', price: 2800, description: 'Workstation capacity', icon: 'memory', stock: 'order', leadTime: '1-2 weeks' },

    /* ============ Storage ============ */
    { id: 'ssd-4tb', category: 'Storage', name: '4TB NVMe Gen5', price: 2200, description: 'Crucial T705 — 14,000 MB/s', icon: 'hard-drive', stock: 'in', leadTime: '3-5 days' },
    { id: 'ssd-2tb', category: 'Storage', name: '2TB NVMe Gen4', price: 900, description: 'Samsung 990 Pro', icon: 'hard-drive', stock: 'in', leadTime: '3-5 days' },
    { id: 'ssd-combo', category: 'Storage', name: '8TB HDD + 2TB NVMe', price: 1600, description: 'Mass archive + fast OS', icon: 'hard-drive', stock: 'in', leadTime: '3-5 days' },

    /* ============ Motherboard ============ */
    { id: 'mb-x870e', category: 'Motherboard', name: 'ASUS ROG X870E Hero', price: 2800, description: 'AM5 flagship — 20+2 power stages', icon: 'circuit', stock: 'in', leadTime: '3-5 days' },
    { id: 'mb-proart', category: 'Motherboard', name: 'ASUS ProArt X670E', price: 2200, description: 'Creator-grade stability', icon: 'circuit', stock: 'in', leadTime: '3-5 days' },
    { id: 'mb-b650e', category: 'Motherboard', name: 'ASUS ROG Strix B650E-F', price: 1500, description: 'Balanced gaming foundation', icon: 'circuit', stock: 'in', leadTime: '3-5 days' },

    /* ============ Cooling (standard mode) ============ */
    { id: 'cool-nh15', category: 'Cooling', name: 'Noctua NH-D15', price: 600, description: 'Dual-tower air — silent legend', icon: 'snowflake', stock: 'in', leadTime: '3-5 days' },
    { id: 'cool-cgp-air', category: 'Cooling', name: 'CGP Custom Air Tower', price: 900, description: 'Forged heatsink + 3×140mm', icon: 'snowflake', stock: 'in', leadTime: '3-5 days' },
    { id: 'cool-lf420', category: 'Cooling', name: 'Arctic LF III 420', price: 1100, description: '420mm AIO — extreme headroom', icon: 'snowflake', stock: 'low', leadTime: '1-2 weeks' },

    /* ============ Case ============ */
    { id: 'case-hotwheel', category: 'Case', name: 'Gamemax Hotwheel', price: 3500, description: 'The legendary circular chassis', icon: 'desktop-tower', stock: 'order', leadTime: '2-3 weeks', note: 'flagship chassis — CNC mods available' },
    { id: 'case-o11', category: 'Case', name: 'Lian Li O11 Dynamic EVO', price: 1200, description: 'Dual-chamber showcase', icon: 'desktop-tower', stock: 'in', leadTime: '3-5 days' },
    { id: 'case-north', category: 'Case', name: 'Fractal North XL', price: 1400, description: 'Walnut + steel elegance', icon: 'desktop-tower', stock: 'in', leadTime: '3-5 days' },

    /* ============ PSU ============ */
    { id: 'psu-ax1600i', category: 'PSU', name: 'Corsair AX1600i', price: 2400, description: '1600W Titanium — future-proof', icon: 'plug', stock: 'in', leadTime: '3-5 days' },
    { id: 'psu-tx1300', category: 'PSU', name: 'Seasonic Prime TX-1300', price: 1900, description: '1300W Titanium — 12-year warranty', icon: 'plug', stock: 'in', leadTime: '3-5 days' },
    { id: 'psu-thor', category: 'PSU', name: 'ASUS ROG Thor 1200W', price: 1700, description: '1200W Platinum + OLED display', icon: 'plug', stock: 'in', leadTime: '3-5 days' },

    /* ============ Water Loop: Block ============ */
    { id: 'block-cgp-cpu', category: 'Block', name: 'CGP CNC Acrylic CPU Block', price: 1200, description: 'CNC-milled, nickel cold plate', icon: 'cpu', stock: 'in', leadTime: '5-7 days' },
    { id: 'block-ek', category: 'Block', name: 'EK Quantum Velocity²', price: 900, description: 'Precision machined acrylic', icon: 'cpu', stock: 'in', leadTime: '3-5 days' },
    { id: 'block-gpu', category: 'Block', name: 'CGP Full-Cover GPU Block', price: 1800, description: 'Custom-milled per GPU model', icon: 'cpu', stock: 'order', leadTime: '2-3 weeks' },

    /* ============ Water Loop: Pump ============ */
    { id: 'pump-d5', category: 'Pump', name: 'CGP D5 Distro Plate', price: 1500, description: 'Integrated reservoir + D5 pump', icon: 'fan', stock: 'in', leadTime: '5-7 days' },
    { id: 'pump-ek-d5', category: 'Pump', name: 'EK D5 PWM', price: 800, description: 'Variable speed, silent', icon: 'fan', stock: 'in', leadTime: '3-5 days' },
    { id: 'pump-ddc', category: 'Pump', name: 'Laing DDC 4.2', price: 700, description: 'Compact high-pressure', icon: 'fan', stock: 'in', leadTime: '3-5 days' },

    /* ============ Water Loop: Radiator ============ */
    { id: 'rad-360', category: 'Radiator', name: 'CGP 360mm Brass', price: 1100, description: 'Hand-brazed, 45mm thick', icon: 'wind', stock: 'in', leadTime: '5-7 days' },
    { id: 'rad-gts', category: 'Radiator', name: 'Hardware Labs GTS 360', price: 900, description: 'Low-profile high-efficiency', icon: 'wind', stock: 'in', leadTime: '3-5 days' },
    { id: 'rad-480', category: 'Radiator', name: 'CGP 480mm Copper', price: 1400, description: 'Maximum surface area', icon: 'wind', stock: 'order', leadTime: '1-2 weeks' },

    /* ============ Water Loop: Fittings ============ */
    { id: 'fit-comp', category: 'Fittings', name: 'CGP Compression 16mm (×10)', price: 600, description: 'Aerospace-grade seal', icon: 'wrench', stock: 'in', leadTime: '3-5 days' },
    { id: 'fit-rotary', category: 'Fittings', name: 'Bitspower Rotary 90°', price: 450, description: 'Smooth-angle joints', icon: 'wrench', stock: 'in', leadTime: '3-5 days' },
    { id: 'fit-drain', category: 'Fittings', name: 'CGP Drain Valve Kit', price: 350, description: 'Maintenance-first design', icon: 'wrench', stock: 'in', leadTime: '3-5 days' },

    /* ============ Water Loop: Tubing ============ */
    { id: 'tube-acrylic', category: 'Tubing', name: 'CGP Acrylic Hardline 16mm (×6)', price: 400, description: 'Hand-bendable, crystal clear', icon: 'pipe', stock: 'in', leadTime: '3-5 days' },
    { id: 'tube-pmma', category: 'Tubing', name: 'Corsair PMMA 14mm', price: 350, description: 'Precision-cut hardline', icon: 'pipe', stock: 'in', leadTime: '3-5 days' },
    { id: 'tube-zmt', category: 'Tubing', name: 'EK ZMT Softline 10m', price: 300, description: 'Industrial matte black', icon: 'pipe', stock: 'in', leadTime: '3-5 days' },

    /* ============ Water Loop: Coolant ============ */
    { id: 'coolant-cyan', category: 'Coolant', name: 'CGP Cyan Premix 1L', price: 150, description: 'The signature forge color', icon: 'drop', stock: 'in', leadTime: '3-5 days' },
    { id: 'coolant-uv', category: 'Coolant', name: 'CGP UV Reactive 1L', price: 180, description: 'Glows under blacklight', icon: 'drop', stock: 'in', leadTime: '3-5 days' },
    { id: 'coolant-clear', category: 'Coolant', name: 'CGP Clear + Dye Kit', price: 200, description: 'Custom color mixing', icon: 'drop', stock: 'in', leadTime: '3-5 days' }
  ],

  options: [
    /* ============ Aesthetic DNA (single-select) ============ */
    { id: 'dna-fashion', group: 'dna', name: 'Fashion House', price: 2000, description: 'Clean lines, couture finishes, runway presence', icon: 'dress' },
    { id: 'dna-horology', group: 'dna', name: 'Horology', price: 2500, description: 'Gear motifs, brushed metals, mechanical soul', icon: 'clock' },
    { id: 'dna-hypercar', group: 'dna', name: 'Hypercar', price: 2500, description: 'Aggressive angles, aero cues, race-bred', icon: 'car' },
    { id: 'dna-cybernetic', group: 'dna', name: 'Cybernetic', price: 2000, description: 'Circuit patterns, neon accents, future state', icon: 'circuit' },

    /* ============ Exotic Materials (multi-select) ============ */
    { id: 'mat-gold', group: 'materials', name: '24K Gold Plating', price: 4500, description: 'Vapor-deposited on fittings & accents' },
    { id: 'mat-wood', group: 'materials', name: 'Exotic Wood Trims', price: 1800, description: 'Zebrawood or walnut inlays' },
    { id: 'mat-leather', group: 'materials', name: 'Italian Leather Canvas', price: 2200, description: 'Hand-stitched cable sleeves' },
    { id: 'mat-carbon', group: 'materials', name: 'Forged Carbon Fiber', price: 3000, description: 'Aerospace-grade panels' },
    { id: 'mat-marble', group: 'materials', name: 'Carrara Marble Base', price: 2500, description: 'Sculpted stone foundation' },
    { id: 'mat-titanium', group: 'materials', name: 'Machined Titanium', price: 3500, description: 'CNC-milled structural accents' },
    { id: 'mat-sapphire', group: 'materials', name: 'Sapphire Glass', price: 2800, description: 'Scratch-proof viewing panels' },
    { id: 'mat-malachite', group: 'materials', name: 'Malachite Stone', price: 2000, description: 'Deep green mineral inlays' },

    /* ============ Thermodynamic Architecture (single-select) ============ */
    { id: 'arch-cryo', group: 'architecture', name: 'Dual Cryo-Loop', price: 3500, description: 'Separate CPU/GPU circuits — maximum isolation' },
    { id: 'arch-distro', group: 'architecture', name: 'Bespoke Distro', price: 2500, description: 'Custom-milled distribution plate' },
    { id: 'arch-embedded', group: 'architecture', name: 'Embedded Mechanics', price: 3000, description: 'Pumps and reservoirs integrated into chassis' }
  ],

  labor: {
    standard: 1500, // Precision Assembly + OS + Stress Testing
    bespoke: 3500   // Precision Assembly + 48h Pressure Testing
  },

  minimum: 10000 // SAR — bespoke commissions start here
};
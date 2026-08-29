/**
 * CGP Configurator — Alpine store + module (page-level JS).
 *
 * State lives in Alpine.store('cgpConfig') so BOTH the matrix section and the
 * commission section share one source of truth. The thin Alpine.data()
 * 'cgpConfigurator' proxy exposes it as `c` in templates (short + readable).
 *
 * WP MIGRATION: the store maps 1:1 to a commission CPT payload (JSON post
 * meta). Parts data comes from parts-data.js (→ wp_localize_script).
 */
document.addEventListener('alpine:init', function () {
  Alpine.store('cgpConfig', {
    /* ---------- state ---------- */
    mode: 'standard',            // 'standard' | 'bespoke'
    activeCategory: 'CPU',
    selections: {},              // { cpu: 'cpu-9950x', gpu: 'gpu-5090', ... }
    vision: { dna: null, materials: [], architecture: null },
    visionOpen: false,
    summaryOpen: false,          // mobile sticky bar expand
    reduced: false,

    /* ---------- categories (mode-aware) ---------- */
    get categories() {
      var standard = ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'Cooling', 'Case', 'PSU'];
      var water = ['Block', 'Pump', 'Radiator', 'Fittings', 'Tubing', 'Coolant'];
      if (this.mode === 'bespoke') {
        var cats = standard.slice();
        var idx = cats.indexOf('Cooling');
        if (idx !== -1) cats.splice(idx, 1, water[0], water[1], water[2], water[3], water[4], water[5]);
        return cats;
      }
      return standard;
    },

    /* ---------- derived ---------- */
    get partsForCategory() {
      return window.CGP_PARTS.parts.filter(function (p) { return p.category === this.activeCategory; }.bind(this));
    },

    get selectedParts() {
      var self = this;
      return Object.keys(this.selections)
        .map(function (cat) {
          var part = window.CGP_PARTS.parts.find(function (p) { return p.id === self.selections[cat]; });
          return part ? { category: part.category, part: part } : null;
        })
        .filter(function (row) { return row && self.categories.indexOf(row.category) !== -1; });
    },

    get selectedOptions() {
      var self = this;
      var out = [];
      if (this.vision.dna) {
        var dna = window.CGP_PARTS.options.find(function (o) { return o.id === self.vision.dna; });
        if (dna) out.push({ group: 'DNA', option: dna });
      }
      this.vision.materials.forEach(function (id) {
        var m = window.CGP_PARTS.options.find(function (o) { return o.id === id; });
        if (m) out.push({ group: 'Material', option: m });
      });
      if (this.vision.architecture) {
        var arch = window.CGP_PARTS.options.find(function (o) { return o.id === self.vision.architecture; });
        if (arch) out.push({ group: 'Architecture', option: arch });
      }
      return out;
    },

    get labor() {
      return this.mode === 'bespoke' ? window.CGP_PARTS.labor.bespoke : window.CGP_PARTS.labor.standard;
    },

    get laborLabel() {
      return this.mode === 'bespoke'
        ? 'Precision Assembly + 48h Pressure Testing'
        : 'Precision Assembly + OS + Stress Testing';
    },

    get totals() {
      var parts = this.selectedParts.reduce(function (s, row) { return s + row.part.price; }, 0);
      var luxury = this.selectedOptions.reduce(function (s, row) { return s + row.option.price; }, 0);
      return { parts: parts, labor: this.labor, luxury: luxury, total: parts + this.labor + luxury };
    },

    get progress() {
      return this.selectedParts.length;
    },

    get totalCategories() {
      return this.categories.length;
    },

    get sysCheck() {
      var notes = this.selectedParts.filter(function (row) { return row.part.note; }).length;
      return notes === 0
        ? 'FORGE VERIFIED // PASS — 0 CONFLICTS'
        : 'FORGE VERIFIED // PASS — ' + notes + ' MASTER NOTE' + (notes > 1 ? 'S' : '');
    },

    get belowMinimum() {
      return this.totals.total < window.CGP_PARTS.minimum;
    },

    get leadTime() {
      // TODO: from site settings — real forge schedule
      return this.mode === 'bespoke' ? '6-8 weeks' : '3-5 weeks';
    },

    get blueprintText() {
      var lines = this.selectedParts.map(function (row) {
        return row.category.toUpperCase() + ': ' + row.part.name + ' — ' + row.part.price.toLocaleString() + ' SAR';
      });
      this.selectedOptions.forEach(function (row) {
        lines.push(row.group.toUpperCase() + ': ' + row.option.name + ' — ' + row.option.price.toLocaleString() + ' SAR');
      });
      lines.push('LABOR: ' + this.laborLabel + ' — ' + this.labor.toLocaleString() + ' SAR');
      lines.push('ESTIMATED COMMISSION: ' + this.totals.total.toLocaleString() + ' SAR');
      return 'CGP COMMISSION BLUEPRINT\n' + lines.join('\n');
    },

    /* ---------- actions ---------- */
    selectPart(part) {
      this.selections[part.category.toLowerCase()] = part.id;
      this.save();
    },

    removePart(category) {
      delete this.selections[category.toLowerCase()];
      this.save();
    },

    isSelected(part) {
      return this.selections[part.category.toLowerCase()] === part.id;
    },

    toggleMode(mode) {
      if (this.mode === mode) return;
      this.mode = mode;
      // Never clear selections (111.html bug) — just switch visible categories
      if (mode === 'bespoke' && this.activeCategory === 'Cooling') this.activeCategory = 'Block';
      if (mode === 'standard' && this.categories.indexOf(this.activeCategory) === -1) this.activeCategory = 'Cooling';
      this.save();
    },

    selectDNA(id) {
      this.vision.dna = this.vision.dna === id ? null : id;
      this.save();
    },

    toggleMaterial(id) {
      var i = this.vision.materials.indexOf(id);
      if (i === -1) this.vision.materials.push(id);
      else this.vision.materials.splice(i, 1);
      this.save();
    },

    selectArchitecture(id) {
      this.vision.architecture = this.vision.architecture === id ? null : id;
      this.save();
    },

    isDNA(id) { return this.vision.dna === id; },
    hasMaterial(id) { return this.vision.materials.indexOf(id) !== -1; },
    isArchitecture(id) { return this.vision.architecture === id; },

    shareWhatsApp() {
      // TODO: from site settings — real WhatsApp number
      window.open('https://wa.me/?text=' + encodeURIComponent(this.blueprintText), '_blank');
    },

    save() {
      try {
        localStorage.setItem('cgp-blueprint', JSON.stringify({
          mode: this.mode,
          selections: this.selections,
          vision: this.vision
        }));
      } catch (e) { /* private mode — ignore */ }
    },

    load() {
      try {
        var saved = JSON.parse(localStorage.getItem('cgp-blueprint'));
        if (saved) {
          this.mode = saved.mode || 'standard';
          this.selections = saved.selections || {};
          this.vision = saved.vision || { dna: null, materials: [], architecture: null };
        }
      } catch (e) { /* corrupt save — ignore */ }
    }
  });

  /* Thin proxy — exposes the store as `c` in templates */
  Alpine.data('cgpConfigurator', function () {
    return {
      get c() { return Alpine.store('cgpConfig'); }
    };
  });

  /* Load persisted blueprint once (store has no lifecycle hook) */
  Alpine.store('cgpConfig').load();
  Alpine.store('cgpConfig').reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
});
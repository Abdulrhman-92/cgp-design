/**
 * CGP Shop — Alpine store + module (page-level JS).
 *
 * State lives in Alpine.store('cgpShop') — filter + sort + derived lists.
 * Thin Alpine.data('cgpShopPage') proxy exposes it as `s` in templates.
 * Name deliberately distinct from the homepage's cgpShop slider component.
 *
 * WP MIGRATION: client-side filter/sort on a small array is replaced by
 * WooCommerce built-in sorting + category widgets at implementation time.
 */
document.addEventListener('alpine:init', function () {
  Alpine.store('cgpShop', {
    /* ---------- state ---------- */
    category: 'all',
    sort: 'featured',

    /* ---------- derived ---------- */
    get filtered() {
      var self = this;
      var list = window.CGP_SHOP.products.filter(function (p) {
        return self.category === 'all' || p.type === self.category;
      });
      if (this.sort === 'price-asc') list = list.slice().sort(function (a, b) { return a.price - b.price; });
      if (this.sort === 'price-desc') list = list.slice().sort(function (a, b) { return b.price - a.price; });
      return list;
    },

    get counts() {
      var self = this;
      var out = { all: window.CGP_SHOP.products.length, prebuilt: 0, component: 0 };
      window.CGP_SHOP.products.forEach(function (p) {
        if (p.type === 'prebuilt') out.prebuilt++;
        if (p.type === 'component') out.component++;
      });
      return out;
    },

    get featured() {
      return window.CGP_SHOP.products.filter(function (p) { return p.featured; })[0] || null;
    },

    get activeFilters() {
      var n = 0;
      if (this.category !== 'all') n++;
      if (this.sort !== 'featured') n++;
      return n;
    },

    /* ---------- actions ---------- */
    setCategory(id) { this.category = id; },
    setSort(id) { this.sort = id; },
    reset() { this.category = 'all'; this.sort = 'featured'; },

    /* ---------- helpers ---------- */
    stockLabel(stock) {
      return stock === 'in' ? 'READY' : stock === 'low' ? 'LAST UNIT' : 'IN THE FORGE';
    },
    stockClass(stock) {
      return 'cgp-stock-' + stock;
    },
    badgeLabel(badge) {
      return badge ? badge.toUpperCase() : null;
    },
    priceLabel(p) {
      return (p.priceFrom ? 'FROM ' : '') + p.price.toLocaleString() + ' SAR';
    }
  });

  /* Thin proxy — exposes the store as `s` in templates */
  Alpine.data('cgpShopPage', function () {
    return {
      get s() { return Alpine.store('cgpShop'); }
    };
  });
});
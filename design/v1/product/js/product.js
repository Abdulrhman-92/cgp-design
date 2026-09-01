/**
 * CGP Product — Alpine gallery + lightbox component (page-level JS).
 *
 * Exposes `s` in the hero template (x-data="cgpProduct"):
 *   s.images          — 4 gallery entries { src, alt, label }
 *   s.active          — active index (0-3)
 *   s.setActive(i)    — click-driven swap (no timers, no auto-rotate)
 *   s.lightboxIndex   — index shown in the lightbox dialog
 *   s.openLightbox(i) — open the dialog at index i
 *   s.closeLightbox() — close the dialog
 *   s.next() / s.prev() — wrap-around navigation
 *
 * NOTE (verified in browser): Alpine injects its magic properties
 * ($refs, $el, ...) on the ROOT data object only — `this.$refs` is
 * undefined inside methods on the nested `s` object. The lightbox
 * methods therefore live on the root component and `s` delegates to
 * them via the closure, so the template can keep calling s.* methods.
 *
 * WP MIGRATION: replace IMG_BASE with the theme's uploads URL and
 * the placeholder entries with the product gallery (woocommerce
 * product_gallery) — one entry per image, same shape.
 *
 * REPLACE WITH CLIENT PHOTOS — hotwheel.webp is the mockup placeholder.
 */
document.addEventListener('alpine:init', function () {
  /* Shared sticky-bar visibility — the hero's scroll logic writes it,
     the standalone sticky-cta.html section reads it via $store. */
  Alpine.store('cgpSticky', { showStickyBar: false });

  Alpine.data('cgpProduct', function () {
    /* Relative to this page (design/v1/product/index.html) — no build
       tokens in JS; mirrors the shop convention (filenames + a base). */
    var IMG_BASE = '../assets/images/';

    /* Root component object — owns the lightbox methods that touch
       $refs (see note above). `s` delegates to them via the closure. */
    var component = {
      s: {
        /* ---------- state ---------- */
        active: 0,
        lightboxIndex: 0,

        /* ---------- gallery ---------- */
        images: [
          { src: IMG_BASE + 'hotwheel.webp', alt: 'The Hotwheel — front view', label: 'IMG_01 // FRONT' },
          { src: IMG_BASE + 'hotwheel.webp', alt: 'The Hotwheel — dual cryo-loop detail', label: 'IMG_02 // LOOP DETAIL' },
          { src: IMG_BASE + 'hotwheel.webp', alt: 'The Hotwheel — RTX 5090 GPU seat', label: 'IMG_03 // GPU SEAT' },
          { src: IMG_BASE + 'hotwheel.webp', alt: 'The Hotwheel — rear view', label: 'IMG_04 // REAR' }
        ],

        /* ---------- actions ---------- */
        setActive(i) {
          this.active = i;
        },

        openLightbox(i) {
          this.lightboxIndex = i;
          component.openLightbox(i);
        },

        closeLightbox() {
          component.closeLightbox();
        },

        next() {
          this.lightboxIndex = (this.lightboxIndex + 1) % this.images.length;
        },

        prev() {
          this.lightboxIndex = (this.lightboxIndex - 1 + this.images.length) % this.images.length;
        }
      },

      /* ---------- lightbox (root-level: needs $refs) ---------- */
      openLightbox(i) {
        this.$refs.lightbox.showModal();
      },

      closeLightbox() {
        this.$refs.lightbox.close();
      },

      /* ---------- sticky CTA bar (root-level: needs $refs) ----------
         Hidden while the dossier panel is in view; appears once the
         panel's bottom edge scrolls above the viewport top. Passive
         scroll listener + rAF throttle; cleaned up in destroy(). */
      init() {
        var self = this;
        var panel = this.$refs.dossierPanel;
        if (!panel) return;
        var ticking = false;
        var update = function () {
          ticking = false;
          var rect = panel.getBoundingClientRect();
          // Show the bar ONLY once the panel's bottom edge has scrolled
          // above the viewport top (user has fully passed the purchase section).
          Alpine.store('cgpSticky').showStickyBar = rect.bottom <= 0;
        };
        var onScroll = function () {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
          }
        };
        update(); // initial state (handles anchor/refresh mid-page)
        window.addEventListener('scroll', onScroll, { passive: true });
        this._stickyCleanup = function () {
          window.removeEventListener('scroll', onScroll);
        };
      },

      destroy() {
        if (this._stickyCleanup) this._stickyCleanup();
      }
    };

    return component;
  });
});
/**
 * CGP design/v1 — homepage page-level JS.
 *
 * Rule: no inline x-data objects longer than ~5 lines — all state lives in
 * Alpine.data() modules registered here (loaded via the page bundle).
 * Auto-rotate timers MUST check prefers-reduced-motion in their init.
 */
document.addEventListener('alpine:init', function () {
  /* Showcase — interactive Hotwheel schematic (auto-rotate, pause on hover).
     Reduced motion: auto-rotate is skipped entirely; manual selection works. */
  Alpine.data('cgpShowcase', function () {
    return {
      activeNode: 0,
      swapping: false,
      paused: false,
      timer: null,
      nodes: [
        { id: '// NODE 01 : COOLANT LOOP', title: 'Vivid Liquid Cooling', text: 'The vibrant cyan coolant courses through meticulously hand-bent hardline tubing. We prioritize flow rate and aesthetic routing to create a mesmerizing visual centerpiece.' },
        { id: '// NODE 02 : HARDWARE FITTINGS', title: 'Precision Metallic Fittings', text: 'Notice the pristine silver and black compression fittings. Each joint is mechanically secured to prevent leaks, creating sharp, industrial right angles that contrast the circular case.' },
        { id: '// NODE 03 : MOTHERBOARD & GPU', title: 'ROG Elite Hardware', text: 'Built on an Asus ROG foundation. The motherboard and vertically mounted flagship GPU are seamlessly integrated into the water loop with custom CNC-milled acrylic blocks.' },
        { id: '// NODE 04 : THE CHASSIS', title: 'Gamemax Hotwheel', text: 'An unconventional, gravity-defying circular chassis. The open-air frame design combined with dual high-static pressure fans at the base ensures ambient air continuously feeds the radiators.' }
      ],
      init() {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          this.startTimer();
        }
      },
      destroy() {
        clearInterval(this.timer);
      },
      startTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          if (!this.paused) this.selectNode((this.activeNode + 1) % this.nodes.length);
        }, 4000);
      },
      selectNode(i) {
        if (i === this.activeNode) return;
        this.swapping = true;
        // Reset the 4s auto-rotate timer after any manual selection
        this.startTimer();
        setTimeout(() => { this.activeNode = i; this.swapping = false; }, 300);
      }
    };
  });

  /* Shop — horizontal slider (scroll-snap + arrows). Center card = active. */
  Alpine.data('cgpShop', function () {
    return {
      active: 1,
      step(dir) {
        const s = this.$refs.slider;
        const cards = s.querySelectorAll('a');
        if (!cards.length) return;
        const stepW = cards[0].offsetWidth + 24;
        const max = s.scrollWidth - s.clientWidth;
        const target = Math.max(0, Math.min(max, s.scrollLeft + dir * stepW));
        s.scrollTo({ left: target, behavior: 'smooth' });
      },
      onScroll() {
        const s = this.$refs.slider;
        const cards = s.querySelectorAll('a');
        if (!cards.length) return;
        const sRect = s.getBoundingClientRect();
        const center = sRect.left + sRect.width / 2;
        let best = 0, bestDist = Infinity;
        cards.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const cardCenter = r.left + r.width / 2;
          const dist = Math.abs(cardCenter - center);
          if (dist < bestDist) { bestDist = dist; best = i; }
        });
        this.active = best;
      }
    };
  });
});
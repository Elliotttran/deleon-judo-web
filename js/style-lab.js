/* Style lab — a throwaway comparison panel for the skill-experiment branch.
 * Swaps fonts and toggles the redesign skill's effects live, and remembers the
 * choice across pages. The header keeps Inter unless "Header too" is on.
 * Delete this file and its <script> tags to remove it. */
(function () {
  var FONTS = {
    "Inter":           { css: '"Inter"', href: null },
    "Geist":           { css: '"Geist"', href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap" },
    "Satoshi":         { css: '"Satoshi"', href: "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" },
    "Outfit":          { css: '"Outfit"', href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" },
    "Cabinet Grotesk": { css: '"Cabinet Grotesk"', href: "https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap" }
  };
  var HEADLINES = {
    "Same as body":     { css: null, href: null },
    "Instrument Serif": { css: '"Instrument Serif"', href: "https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap", weight: 400 },
    "Fraunces":         { css: '"Fraunces"', href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap", weight: 600 }
  };
  var EFFECTS = [
    ["header",    "Header too",         "Apply the font to the nav pill as well"],
    ["grain",     "Grain overlay",      "Faint film noise over the page (not the header)"],
    ["warm",      "Warm grays",         "Tint the gray panels warm instead of neutral"],
    ["press",     "Press feedback",     "Buttons and arrow links shrink slightly when clicked"],
    ["reveal",    "Staggered reveal",   "Sections fade up in sequence as you scroll"],
    ["spotlight", "Spotlight cards",    "A soft light follows the cursor across cards"],
    ["shadow",    "Tinted card shadow", "Soft shadow under cards (you rejected shadows before)"],
    ["left",      "Left-aligned titles","Break the centered symmetry of section titles"],
    ["weekPanel", "Week in blue panel", "The earlier look: week card floating in a light-blue panel"],
    ["startBlue", "Light blue Start section", "Tint the Start section's background light blue instead of gray"]
  ];
  // From the high-end-visual-design skill. Its nav/hamburger rules are left out
  // on purpose, so the header stays as it is.
  var VIBES = {
    "Current":          null,
    "Editorial luxury": "editorial",
    "Soft structural":  "soft"
  };
  var HIGHEND = []; // the details are now built into the site

  var KEY = "djw-style-lab";
  var state = { font: "Inter", headline: "Same as body", vibe: "Current", fx: {}, open: true };
  try { Object.assign(state, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  var loaded = {};
  function loadFont(href) {
    if (!href || loaded[href]) return;
    loaded[href] = true;
    var l = document.createElement("link");
    l.rel = "stylesheet"; l.href = href;
    document.head.appendChild(l);
  }

  var css = document.createElement("style");
  css.textContent = [
    // Header stays on Inter unless asked otherwise.
    "html:not(.fx-header) .site-header { font-family: \"Inter\", -apple-system, sans-serif; }",
    "html.has-headline :is(h1,h2,h3,h4):not(.site-header *) { font-family: var(--lab-headline); font-weight: var(--lab-headline-weight); letter-spacing: -0.01em; }",

    "html.fx-grain body::after { content: ''; position: fixed; inset: 0; z-index: 40; pointer-events: none; opacity: 0.07;",
    "  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\"); }",

    "html.fx-warm { --panel: #f5f2ee; --panel-deep: #ebe6df; --line: #ece7e1; --muted: #75706a; }",

    "html.fx-press .btn, html.fx-press .link-arrow, html.fx-press .nav-cta { transition: transform 0.12s ease, background 0.2s ease; }",
    "html.fx-press .btn:active, html.fx-press .nav-cta:active { transform: scale(0.96); }",
    "html.fx-press .link-arrow:active { transform: translateY(1px); }",
    "html.fx-press .btn:focus-visible { outline: 2px solid var(--black); outline-offset: 3px; }",

    "html.fx-reveal .lab-reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s cubic-bezier(.2,.7,.2,1); }",
    "html.fx-reveal .lab-reveal.lab-in { opacity: 1; transform: none; }",

    "html.fx-spotlight .card { position: relative; isolation: isolate; }",
    "html.fx-spotlight .card::before { content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: -1; pointer-events: none; opacity: 0; transition: opacity 0.25s;",
    "  background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(163,0,0,0.08), transparent 70%); }",
    "html.fx-spotlight .card:hover::before { opacity: 1; }",

    "html.fx-shadow .card { box-shadow: 0 1px 2px rgba(40,30,20,0.05), 0 12px 32px -12px rgba(40,30,20,0.18); }",

    "html.fx-left .section-title.center, html.fx-left .section-title.center h2, html.fx-left .section-title.center p { text-align: left; margin-left: 0; }",
    "html.fx-left section:not(.callout-section) .link-row { justify-content: flex-start; }",

    // Start section comparisons
    "html.fx-weekPanel .week-panel { background: #edf2fb; border-radius: 20px; padding: clamp(1.25rem, 3vw, 2.5rem); place-items: center; }",
    "html.fx-weekPanel .week-card { max-width: 520px; background: #fff; border-radius: 16px; padding: 1.4rem; box-shadow: 0 1px 2px rgba(20,40,90,.05), 0 12px 30px -14px rgba(20,40,90,.22); }",
    "html.fx-weekPanel .day.off { background: #f6f7f9; }",
    "html.fx-startBlue main > section.alt:first-of-type { background: #eaf0fa; }",

    // High-end skill: vibes
    "html.vibe-editorial { --bg: #fdfbf7; --panel: #f4efe6; --panel-deep: #ebe4d8; --line: #e8e1d5; --muted: #7a7266; --ink: #231f1a; --black: #1c1814; }",
    "html.vibe-editorial body::after { content: ''; position: fixed; inset: 0; z-index: 40; pointer-events: none; opacity: 0.05;",
    "  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\"); }",
    "html.vibe-soft { --bg: #f5f5f6; --panel: #ececee; --panel-deep: #e2e2e5; }",
    "html.vibe-soft .card { background: #fff; box-shadow: 0 2px 4px rgba(20,20,30,0.02), 0 24px 60px -24px rgba(20,20,30,0.14); }",
    "html.vibe-soft section.alt .card { background: #fff; }",

    // High-end skill: components
    "html.fx-bezel .card { box-shadow: 0 0 0 6px rgba(0,0,0,0.028), 0 0 0 7px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.7); }",
    "html.fx-bezel .grid { gap: 1.75rem; }",
    "html.vibe-soft.fx-bezel .card { box-shadow: 0 0 0 6px rgba(0,0,0,0.028), 0 0 0 7px rgba(0,0,0,0.05), 0 24px 60px -24px rgba(20,20,30,0.14); }",

    "html.fx-island .btn { display: inline-flex; align-items: center; gap: 0.75rem; padding-right: 0.4rem; }",
    "html.fx-island .btn::after { content: '\\2197'; display: inline-flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border-radius: 999px;",
    "  background: rgba(255,255,255,0.14); font-size: 0.9rem; transition: transform 0.5s cubic-bezier(0.32,0.72,0,1); }",
    "html.fx-island .btn.btn-outline::after { background: rgba(0,0,0,0.06); }",
    "html.fx-island .btn:hover::after { transform: translate(3px, -1px) scale(1.06); }",

    "html.fx-pills .eyebrow { display: inline-block; border-radius: 999px; padding: 0.3rem 0.75rem; font-size: 0.62rem; letter-spacing: 0.2em; font-weight: 500; background: rgba(163,0,0,0.07); }",
    "html.fx-pills .callout-section.red .eyebrow { background: rgba(255,255,255,0.14); }",
    "html.fx-pills .callout-section.dark .eyebrow { background: rgba(255,204,0,0.12); }",

    "html.fx-cinematic .lab-reveal { transform: translateY(48px); filter: blur(10px); transition: opacity 0.9s cubic-bezier(0.32,0.72,0,1), transform 0.9s cubic-bezier(0.32,0.72,0,1), filter 0.9s cubic-bezier(0.32,0.72,0,1); }",
    "html.fx-cinematic .lab-reveal.lab-in { transform: none; filter: none; }",

    "html.fx-space section { padding: clamp(6rem, 11vw, 10rem) 0; }",
    "html.fx-space .callout-section { padding: clamp(7rem, 13vw, 11rem) 0; }",

    "@media (min-width: 861px) {",
    "  html.fx-bento .grid-3 { grid-template-columns: 1.35fr 1fr; }",
    "  html.fx-bento .grid-3 > :first-child { grid-row: span 2; display: flex; flex-direction: column; justify-content: flex-end; min-height: 22rem; }",
    "  html.fx-bento .grid-3 > :first-child h3 { font-size: 1.6rem; letter-spacing: -0.03em; }",
    "}",

    "html.fx-springs .btn, html.fx-springs .link-arrow, html.fx-springs .card, html.fx-springs .link-arrow::after { transition-duration: 0.5s; transition-timing-function: cubic-bezier(0.32,0.72,0,1); }",
    "html.fx-springs .btn:active { transform: scale(0.98); }",

    // The panel itself — deliberately plain so it doesn't get judged as part of the site.
    ".lab { position: fixed; right: 16px; bottom: 16px; z-index: 100; width: 280px; max-width: calc(100vw - 32px); max-height: calc(100vh - 32px); overflow: auto;",
    "  background: #111; color: #eee; border-radius: 16px; padding: 14px 16px; font: 13px/1.4 -apple-system, system-ui, sans-serif; }",
    ".lab.closed { width: auto; padding: 8px 14px; }",
    ".lab.closed .lab-body { display: none; }",
    ".lab-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; }",
    ".lab-top strong { font-size: 13px; }",
    ".lab button { font: inherit; color: #aaa; background: none; border: 0; cursor: pointer; padding: 2px 0; }",
    ".lab button:hover { color: #fff; }",
    ".lab label.row { display: flex; gap: 8px; align-items: flex-start; padding: 5px 0; cursor: pointer; }",
    ".lab label.row input { margin-top: 2px; accent-color: #a30000; }",
    ".lab small { display: block; color: #888; font-size: 11.5px; }",
    ".lab h4 { margin: 12px 0 4px; font: 600 11px/1 -apple-system, system-ui, sans-serif; letter-spacing: 0.06em; text-transform: uppercase; color: #888; }",
    ".lab .fonts { display: flex; flex-wrap: wrap; gap: 6px; }",
    ".lab .fonts button { color: #ddd; background: #222; border-radius: 999px; padding: 5px 11px; font-size: 13px; }",
    ".lab .fonts button[aria-pressed=true] { background: #fff; color: #111; }",
    ".lab .reset { margin-top: 10px; font-size: 12px; text-decoration: underline; }"
  ].join("\n");
  document.head.appendChild(css);

  function apply() {
    var root = document.documentElement;
    var f = FONTS[state.font] || FONTS.Inter;
    loadFont(f.href);
    root.style.setProperty("--font", f.css + ', -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif');

    var h = HEADLINES[state.headline] || HEADLINES["Same as body"];
    loadFont(h.href);
    root.classList.toggle("has-headline", !!h.css);
    if (h.css) {
      root.style.setProperty("--lab-headline", h.css + ", Georgia, serif");
      root.style.setProperty("--lab-headline-weight", h.weight);
    }

    EFFECTS.concat(HIGHEND).forEach(function (e) { root.classList.toggle("fx-" + e[0], !!state.fx[e[0]]); });
    Object.keys(VIBES).forEach(function (k) { if (VIBES[k]) root.classList.toggle("vibe-" + VIBES[k], state.vibe === k); });
    if (state.fx.cinematic) root.classList.add("fx-reveal");
    if (state.fx.reveal || state.fx.cinematic) setupReveal();
  }

  var revealReady = false;
  function setupReveal() {
    if (revealReady) return;
    revealReady = true;
    var targets = document.querySelectorAll("main section .section-title, main section .grid > *, main section .prose, main section .table-wrap, main section .link-row, .callout-section .wrap > *");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("lab-in");
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) {
      var sibs = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(sibs, 5) * 80 + "ms";
      el.classList.add("lab-reveal");
      io.observe(el);
    });
  }

  document.addEventListener("pointermove", function (ev) {
    if (!state.fx.spotlight) return;
    var card = ev.target.closest && ev.target.closest(".card");
    if (!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty("--mx", ev.clientX - r.left + "px");
    card.style.setProperty("--my", ev.clientY - r.top + "px");
  });

  function build() {
    var el = document.createElement("div");
    el.className = "lab" + (state.open ? "" : " closed");
    el.innerHTML =
      '<div class="lab-top"><strong>Style lab</strong><button data-toggle>' + (state.open ? "Hide" : "Show") + '</button></div>' +
      '<div class="lab-body">' +
        '<h4>Body font</h4><div class="fonts" data-group="font"></div>' +
        '<h4>Headline font</h4><div class="fonts" data-group="headline"></div>' +
        '<h4>Effects</h4><div data-fx></div>' +
        '<h4>High-end skill — vibe</h4><div class="fonts" data-group="vibe"></div>' +
        '<div data-fx-hi></div>' +
        '<button class="reset" data-reset>Reset to current site</button>' +
      '</div>';

    function fontButtons(group, list) {
      var box = el.querySelector('[data-group="' + group + '"]');
      Object.keys(list).forEach(function (name) {
        var b = document.createElement("button");
        b.textContent = name;
        if (list[name] && list[name].css) { loadFont(list[name].href); b.style.fontFamily = list[name].css; }
        b.setAttribute("aria-pressed", state[group] === name);
        b.addEventListener("click", function () {
          state[group] = name; save(); apply();
          box.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        });
        box.appendChild(b);
      });
    }
    fontButtons("font", FONTS);
    fontButtons("headline", HEADLINES);
    fontButtons("vibe", VIBES);

    function fxRows(box, list) { list.forEach(function (e) {
      var row = document.createElement("label");
      row.className = "row";
      row.innerHTML = '<input type="checkbox"' + (state.fx[e[0]] ? " checked" : "") + '><span>' + e[1] + "<small>" + e[2] + "</small></span>";
      row.querySelector("input").addEventListener("change", function (ev) {
        state.fx[e[0]] = ev.target.checked; save();
        // Reveal hides content on first run, so reload to turn it off cleanly.
        if ((e[0] === "reveal" || e[0] === "cinematic") && !ev.target.checked) return location.reload();
        apply();
      });
      box.appendChild(row);
    }); }
    fxRows(el.querySelector("[data-fx]"), EFFECTS);
    fxRows(el.querySelector("[data-fx-hi]"), HIGHEND);

    el.querySelector("[data-toggle]").addEventListener("click", function () {
      state.open = !state.open; save();
      el.classList.toggle("closed", !state.open);
      this.textContent = state.open ? "Hide" : "Show";
    });
    el.querySelector("[data-reset]").addEventListener("click", function () {
      state.font = "Inter"; state.headline = "Same as body"; state.vibe = "Current"; state.fx = {}; save(); location.reload();
    });
    document.body.appendChild(el);
  }

  apply();
  build();
})();

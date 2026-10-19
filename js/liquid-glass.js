/* Liquid glass for the nav pill (and the open mobile menu).
 *
 * Technique adapted from nikdelvin/liquid-glass (MIT, (c) 2025 Nikita Stadnik)
 * https://github.com/nikdelvin/liquid-glass
 *
 * A displacement map is drawn as an SVG: a rounded rectangle whose centre is
 * neutral grey (no displacement) and whose rim ramps towards the corners.
 * That map feeds feDisplacementMap, applied to whatever is *behind* the
 * element via `backdrop-filter: url(...)`, so the page refracts at the edges
 * of the pill and stays clear in the middle - the Apple look. The map is
 * built three times at slightly different strengths and recombined per
 * colour channel for a touch of chromatic aberration.
 *
 * Chromium and Firefox apply SVG filters to a backdrop. Safari does not yet
 * (WebKit bug 245510), so it gets a plain blur + saturate instead.
 *
 * Usage: put `data-liquid-glass` on any element with a border-radius.
 * Optional overrides: data-lg-depth, data-lg-strength, data-lg-aberration,
 * data-lg-blur, data-lg-brightness, data-lg-saturate.
 *
 * Don't nest glass: a backdrop-filter inside another backdrop-filter only
 * sees its parent's contents, not the page (that is why the mobile menu is
 * part of the pill rather than a panel of its own).
 */
(function () {
  "use strict";

  // depth = width of the refracting rim in px (the centre stays clear);
  // strength = how far the rim bends the backdrop; blur = frost.
  // Tuned for a ~58px-tall bar: the rim (inset + feather) must stay well
  // under half the height or the whole bar bends instead of just its edge.
  // saturate 1.6 / aberration 1.5 follow the defaults in PrismalAGSL, a
  // well-starred liquid-glass shader: richer colour through the glass and a
  // slightly more visible RGB fringe at the rim.
  var DEFAULTS = { depth: 5, strength: 30, aberration: 1.5, blur: 7, brightness: 0.98, saturate: 1.6 };

  // Safari parses `backdrop-filter: url()` but does not render SVG filters on
  // a backdrop, so a pure feature test is not enough: exclude WebKit-only UAs.
  var isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
  var supportsUrl = (function () {
    var el = document.createElement("div");
    el.style.cssText = "backdrop-filter: url(#x)";
    return !isSafari && /url\(/.test(el.style.backdropFilter || "");
  })();

  function svgDataUrl(markup) {
    return "data:image/svg+xml;utf8," + encodeURIComponent(markup);
  }

  function displacementMap(w, h, r, depth) {
    return svgDataUrl(
      '<svg height="' + h + '" width="' + w + '" viewBox="0 0 ' + w + " " + h + '" xmlns="http://www.w3.org/2000/svg">' +
        "<style>.mix{mix-blend-mode:screen}</style>" +
        "<defs>" +
          '<linearGradient id="Y" x1="0" x2="0" y1="' + Math.ceil((r / h) * 15) + '%" y2="' + Math.floor(100 - (r / h) * 15) + '%">' +
            '<stop offset="0%" stop-color="#0F0"/><stop offset="100%" stop-color="#000"/></linearGradient>' +
          '<linearGradient id="X" x1="' + Math.ceil((r / w) * 15) + '%" x2="' + Math.floor(100 - (r / w) * 15) + '%" y1="0" y2="0">' +
            '<stop offset="0%" stop-color="#F00"/><stop offset="100%" stop-color="#000"/></linearGradient>' +
        "</defs>" +
        '<rect x="0" y="0" height="' + h + '" width="' + w + '" fill="#808080"/>' +
        '<g filter="blur(2px)">' +
          '<rect x="0" y="0" height="' + h + '" width="' + w + '" fill="#000080"/>' +
          '<rect x="0" y="0" height="' + h + '" width="' + w + '" fill="url(#Y)" class="mix"/>' +
          '<rect x="0" y="0" height="' + h + '" width="' + w + '" fill="url(#X)" class="mix"/>' +
          '<rect x="' + depth + '" y="' + depth + '" height="' + (h - 2 * depth) + '" width="' + (w - 2 * depth) +
            '" fill="#808080" rx="' + r + '" ry="' + r + '" filter="blur(' + depth + 'px)"/>' +
        "</g>" +
      "</svg>"
    );
  }

  function displacementFilter(w, h, r, o) {
    var map = displacementMap(w, h, r, o.depth);
    function channel(scale, matrix, result) {
      return '<feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="' + scale +
             '" xChannelSelector="R" yChannelSelector="G"/>' +
             '<feColorMatrix type="matrix" values="' + matrix + '" result="' + result + '"/>';
    }
    return svgDataUrl(
      '<svg height="' + h + '" width="' + w + '" viewBox="0 0 ' + w + " " + h + '" xmlns="http://www.w3.org/2000/svg"><defs>' +
        '<filter id="displace" color-interpolation-filters="sRGB">' +
          '<feImage x="0" y="0" height="' + h + '" width="' + w + '" href="' + map + '" result="displacementMap"/>' +
          channel(o.strength + o.aberration * 2, "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0", "displacedR") +
          channel(o.strength + o.aberration,     "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0", "displacedG") +
          channel(o.strength,                    "0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0", "displacedB") +
          '<feBlend in="displacedR" in2="displacedG" mode="screen"/>' +
          '<feBlend in2="displacedB" mode="screen"/>' +
        "</filter></defs></svg>"
    ) + "#displace";
  }

  function options(el) {
    var o = {};
    for (var k in DEFAULTS) {
      var v = el.getAttribute("data-lg-" + k);
      o[k] = v === null ? DEFAULTS[k] : parseFloat(v);
    }
    return o;
  }

  function paint(el) {
    var rect = el.getBoundingClientRect();
    var w = Math.round(rect.width), h = Math.round(rect.height);
    if (!w || !h) return; // hidden
    var o = options(el);
    var r = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, h / 2, w / 2);
    if (supportsUrl) {
      el.style.backdropFilter =
        "blur(" + o.blur / 2 + "px) url('" + displacementFilter(w, h, r, o) + "') blur(" + o.blur + "px)" +
        " brightness(" + o.brightness + ") saturate(" + o.saturate + ")";
    } else {
      var fallback = "blur(" + (o.blur * 6) + "px) brightness(" + o.brightness + ") saturate(" + o.saturate + ")";
      el.style.webkitBackdropFilter = fallback;
      el.style.backdropFilter = fallback;
    }
  }

  var els = document.querySelectorAll("[data-liquid-glass]");
  if (!els.length) return;
  Array.prototype.forEach.call(els, function (el) {
    paint(el);
    if ("ResizeObserver" in window) new ResizeObserver(function () { paint(el); }).observe(el);
  });
  window.addEventListener("resize", function () { Array.prototype.forEach.call(els, paint); });
})();

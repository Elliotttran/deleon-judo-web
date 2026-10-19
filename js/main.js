/* DeLeon Judo Club — shared behaviour
 * - Single source of truth for club info, the FAQ list, and the contact block.
 * - Every page includes <section id="faq"> and <section id="contact"> placeholders
 *   that get filled in here, so edits happen in one place.
 */
(function () {
  "use strict";

  // ---------- Club info (edit here) ----------
  var CLUB = {
    name: "DeLeon Judo Club",
    founded: 1970,
    location: {
      name: "Herzog Hall",
      street: "Sonoma-Marin Fairgrounds, 175 Fairgrounds Drive",
      city: "Petaluma, CA 94952",
      mapQuery: "Herzog Hall, Sonoma-Marin Fairgrounds, Petaluma, CA 94952"
    },
    // ---------- Contact details ----------
    // Intentionally left blank. The instructors' personal phone numbers, email
    // address, and mailing address have been removed from the public site; the
    // club's own contact details will be added here later. Until then the
    // contact block renders without those rows and points visitors to the dojo
    // and to Parks & Rec instead — the only two public routes to us.
    // To publish contact details, fill these in; everything else is automatic:
    //   email: "club@example.org",
    //   phones: [{ name: "Head Instructor", number: "(707) 555-0100" }],
    //   mailing: "PO Box 000, Petaluma, CA 94952"
    email: "",
    phones: [],
    // PLACEHOLDER — not a real address. Deliberately written so it cannot be
    // mistaken for a live one. Replace before the site goes public.
    mailing: "PO Box 0000, Petaluma, CA 94952",
    mailingIsPlaceholder: true,
    // ---------- Non-profit status (edit here) ----------
    // The club is a 501(c)(3) tax-exempt charitable organization. The EIN below
    // is rendered anywhere you put <span data-ein></span> — replace the
    // placeholder with the number on the IRS determination letter.
    nonprofit: {
      legalName: "DeLeon Judo Club",
      status: "501(c)(3)",
      ein: "XX-XXXXXXX",
      state: "California",
      // Plain-language summary rendered by <div data-nonprofit></div>
      blurb: "DeLeon Judo Club is a non-profit organization recognized by the IRS as tax-exempt under Section 501(c)(3) of the Internal Revenue Code. We are run entirely by volunteer instructors — nobody draws a salary from the club. Class fees are collected by the City of Petaluma Parks &amp; Recreation Department and go toward mat time, equipment, insurance, and keeping the program affordable for Petaluma families. Contributions to the club are tax-deductible to the extent allowed by law."
    },
    registerUrl: "https://secure.rec1.com/CA/petaluma-ca/catalog",
    parksRecUrl: "https://cityofpetaluma.org/parks-recreation/",
    // National organizations the club belongs to. Rendered anywhere you put
    // <div data-affiliations></div>; data-affiliations="brief" gives the
    // compact strip, which also includes the yudanshakai below.
    affiliations: [
      {
        abbr: "USJF",
        name: "United States Judo Federation",
        url: "https://www.usjf.com/",
        // Logos are the organizations' own marks, saved locally in public/logos/.
        // h = display height in px (they have very different aspect ratios, so we
        // normalise optically by height rather than width).
        logo: { src: "public/logos/usjf.png", w: 2867, h: 1000, height: 40 },
        blurb: "Founded in 1952, the USJF is the oldest national judo organization in the United States and the one that carries the Kodokan tradition in this country. It is organized into regional <em>yudanshakai</em> — black belt associations — that certify rank, sanction tournaments and clinics, and provide club and member insurance. Our students' kyu and dan promotions are certified through the USJF."
      },
      {
        abbr: "USA Judo",
        name: "USA Judo (United States Judo, Inc.)",
        url: "https://www.usajudo.com/",
        logo: { src: "public/logos/usa-judo.png", w: 300, h: 160, height: 52 },
        blurb: "USA Judo is the National Governing Body for the sport, recognized by the U.S. Olympic &amp; Paralympic Committee and the International Judo Federation. It runs the national championships and the pipeline to the national team. Students who want to compete at national or international events hold a USA Judo membership."
      }
    ],
    // Our USJF yudanshakai. Rendered by <div data-yudanshakai></div>.
    // Board seats are current as of August 2026 — check cencojudo.com/about
    // when the boards turn over.
    yudanshakai: {
      abbr: "CENCO",
      name: "Central Coast Judo Association",
      url: "https://cencojudo.com/",
      aboutUrl: "https://cencojudo.com/about/",
      logo: { src: "public/logos/cenco.png", w: 137, h: 131, height: 64 },
      blurb: "CENCO is our <em>yudanshakai</em> — the USJF-affiliated black belt association our club belongs to, made up of ten member clubs. The yudanshakai is where rank is examined and certified, where developmental tournaments and clinics are organized, and where instructors from neighboring clubs train and teach together.",
      leadership: [
        { role: "President, Board of Managers", person: "Sensei Davin Tillman" },
        { role: "Chair, Board of Examiners", person: "Sensei Henry Kaku" }
      ]
    },
    schedule: [
      { day: "Tuesday & Thursday", time: "5:30 – 7:00 pm", who: "All students (ages 6+)" },
      { day: "Monday", time: "5:30 – 7:00 pm", who: "All ages, by appointment" }
    ]
  };

  // ---------- FAQ (edit here) ----------
  var FAQ = [
    {
      q: "How do I sign up?",
      a: "Registration is handled through <strong>Petaluma Parks &amp; Recreation</strong>, not on this website. Visit the <a href=\"" + CLUB.registerUrl + "\" target=\"_blank\" rel=\"noopener\">Parks &amp; Rec online catalog</a> and search for \"Judo.\" You can also register in person at the Parks &amp; Recreation office."
    },
    {
      q: "How much does it cost?",
      a: "Classes are billed as a monthly rate through Petaluma Parks &amp; Recreation. Current pricing is listed in the <a href=\"" + CLUB.registerUrl + "\" target=\"_blank\" rel=\"noopener\">registration catalog</a>. Family discounts are available when multiple family members enroll."
    },
    {
      q: "What ages do you accept?",
      a: "We welcome students <strong>ages 6 and up</strong>. Kids, teens, and adults train in the same club, and beginners of every age are welcome."
    },
    {
      q: "Can I try a class before signing up?",
      a: "Yes. Prospective students and parents are welcome to come watch a class, and we encourage a trial class before committing. Just stop by during a Tuesday or Thursday 5:30 pm class — no appointment needed — and talk to an instructor before or after the session."
    },
    {
      q: "Do I need any experience?",
      a: "No. Most of our students start with zero martial-arts experience. Our Tuesday and Thursday classes are open to all levels, and instructors work with beginners individually on falling safely (ukemi) before anything else."
    },
    {
      q: "What should I wear to my first class?",
      a: "For your first few classes, wear comfortable athletic clothes with no zippers, buttons, or metal — sweatpants and a t-shirt are perfect. Once you decide to continue, you will need a judo gi (uniform). Instructors can help you find one at a reasonable price."
    },
    {
      q: "Is judo safe for kids?",
      a: "Judo is one of the most widely practiced youth sports in the world and is the only martial art in the Olympic Games besides Taekwondo. The first skill every student learns is how to fall safely. Classes are supervised by experienced, certified black-belt instructors, and no striking or kicking is involved."
    },
    {
      q: "What will I actually learn?",
      a: "Every student starts with <em>ukemi</em> — falling safely. From there the curriculum covers <em>nage-waza</em> (throws), <em>katame-waza</em> (pins, and for adults chokes and arm-locks), <em>randori</em> (free practice), <em>kata</em> (prearranged forms), and the Japanese terminology and etiquette that go with them. See <a href=\"classes.html#curriculum\">what we teach</a> for the full breakdown."
    },
    {
      q: "Are you affiliated with a national judo organization?",
      a: "Yes. DeLeon Judo Club is affiliated with the <strong>United States Judo Federation (USJF)</strong> through our yudanshakai, the <strong>Central Coast Judo Association (CENCO)</strong>, and with <strong>USA Judo</strong>, the National Governing Body recognized by the U.S. Olympic &amp; Paralympic Committee. Rank earned here is certified and recognized at any judo club in the country. Two of our instructors serve on the CENCO boards. <a href=\"about.html#affiliations\">More about our affiliations</a>."
    },
    {
      q: "Do you compete in tournaments?",
      a: "Students who want to compete can, but competition is never required. The club regularly attends regional tournaments in Northern California, such as the San Jose Buddhist tournament, and our instructors include certified referees."
    },
    {
      q: "Is the club a non-profit?",
      a: "Yes. DeLeon Judo Club is a non-profit organization recognized as tax-exempt under <strong>Section 501(c)(3)</strong> of the Internal Revenue Code. Our instructors are volunteers. Fees go through Petaluma Parks &amp; Recreation and support mat time, equipment, and the program, and donations to the club are tax-deductible to the extent allowed by law. See our <a href=\"terms.html#nonprofit\">non-profit disclosures</a>."
    },
    {
      q: "Where are classes held?",
      a: CLUB.location.name + ", " + CLUB.location.street + ", " + CLUB.location.city + ". Parking is available on site."
    }
  ];

  // ---------- Helpers ----------
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function telHref(num) { return "tel:+1" + num.replace(/\D/g, ""); }

  // Renders an organisation's logo at its configured height, with the natural
  // dimensions set so the browser reserves the right space before it loads.
  function logoImg(o, cls) {
    if (!o.logo) return "";
    return '<img class="' + (cls || "affil-logo") + '" src="' + o.logo.src +
           '" alt="' + o.name + ' logo" width="' + o.logo.w + '" height="' + o.logo.h +
           '" style="height:' + o.logo.height + 'px" loading="lazy">';
  }

  // ---------- Mobile nav ----------
  var toggle = $(".nav-toggle");
  var nav = $(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Mark current page in nav
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(function (a) {
    var target = a.getAttribute("href").split("/").pop();
    if (target === here) a.setAttribute("aria-current", "page");
  });

  // ---------- Schedule tables (any element with data-schedule) ----------
  document.querySelectorAll("[data-schedule]").forEach(function (tbody) {
    tbody.innerHTML = CLUB.schedule.map(function (s) {
      return "<tr><td><strong>" + s.day + "</strong></td><td>" + s.time + "</td><td>" + s.who + "</td></tr>";
    }).join("");
  });

  // ---------- Week strip (any element with data-week) ----------
  // A Mon–Sun strip built from CLUB.schedule: regular class days in blue,
  // appointment days marked, the rest quiet. A legend lists each session.
  document.querySelectorAll("[data-week]").forEach(function (el) {
    var DAYS = [["Monday", "Mon"], ["Tuesday", "Tue"], ["Wednesday", "Wed"], ["Thursday", "Thu"], ["Friday", "Fri"], ["Saturday", "Sat"], ["Sunday", "Sun"]];
    var isOpen = function (s) { return /all students/i.test(s.who); };
    var start = function (t) { return t.split("–")[0].trim(); };
    var cells = DAYS.map(function (d) {
      var hit = CLUB.schedule.filter(function (s) { return s.day.indexOf(d[0]) > -1; })[0];
      var kind = hit ? (isOpen(hit) ? "class" : "appt") : "off";
      var note = hit ? (isOpen(hit) ? start(hit.time) : "Appt") : "";
      return '<li class="day ' + kind + '"><span class="day-name">' + d[1] + '</span><span class="day-note">' + note + '</span></li>';
    }).join("");
    var rows = CLUB.schedule.filter(isOpen).concat(CLUB.schedule.filter(function (s) { return !isOpen(s); }));
    el.innerHTML =
      '<div class="week-card">' +
        '<ul class="week" aria-hidden="true">' + cells + '</ul>' +
        '<ul class="week-legend">' + rows.map(function (s) {
          var open = isOpen(s);
          var day = s.day.replace("Tuesday", "Tues").replace("Thursday", "Thurs");
          return '<li class="' + (open ? "class" : "appt") + '"><strong><span class="key"></span>' + day + '</strong>' +
                 '<span class="when">' + s.time + '</span><span class="who">' + (open ? "All students, ages 6 and up" : s.who) + '</span></li>';
        }).join("") + '</ul>' +
      '</div>';
  });

  // ---------- Affiliations (any element with data-affiliations) ----------
  // data-affiliations="brief" renders the one-line version used on the home page.
  // data-affiliations="logos" renders a compact stacked list of marks.
  document.querySelectorAll("[data-affiliations]").forEach(function (el) {
    var mode = el.getAttribute("data-affiliations");
    var brief = mode === "brief";
    if (mode === "logos") {
      el.innerHTML = '<ul class="affil-logos">' + CLUB.affiliations.concat([CLUB.yudanshakai]).map(function (o) {
        return '<li title="' + o.name + '">' + logoImg(o) + '</li>';
      }).join("") + "</ul>";
      return;
    }
    el.innerHTML = brief
      ? '<ul class="affil-strip">' + CLUB.affiliations.concat([CLUB.yudanshakai]).map(function (o) {
          return '<li><span class="affil-logo-box">' + logoImg(o) + '</span>' +
                 '<a href="' + o.url + '" target="_blank" rel="noopener">' + o.abbr + "</a> <small>" + o.name + "</small></li>";
        }).join("") + "</ul>"
      : '<div class="cards two">' + CLUB.affiliations.map(function (o) {
          return '<div class="shell" data-reveal><div class="core affil-card"><span class="affil-logo-box">' + logoImg(o) + '</span>' +
                 '<h3>' + o.name + '</h3><p>' + o.blurb + '</p>' +
                 '<div class="push"><a class="link-arrow" href="' + o.url + '" target="_blank" rel="noopener">Visit ' + o.abbr + '</a></div></div></div>';
        }).join("") + "</div>";
  });

  // ---------- Yudanshakai block (any element with data-yudanshakai) ----------
  document.querySelectorAll("[data-yudanshakai]").forEach(function (el) {
    var y = CLUB.yudanshakai;
    el.innerHTML =
      '<div class="grid-12">' +
        '<div class="shell span-7" data-reveal><div class="core affil-card">' +
          '<span class="affil-logo-box">' + logoImg(y) + '</span>' +
          '<p>' + y.blurb + '</p>' +
          '<div class="push"><a class="link-arrow" href="' + y.url + '" target="_blank" rel="noopener">Visit ' + y.abbr + '</a></div>' +
        '</div></div>' +
        '<div class="shell span-5" data-reveal><div class="core">' +
          '<h3>DeLeon on the CENCO boards</h3>' +
          '<ul class="board-list">' +
            y.leadership.map(function (l) {
              return '<li><strong>' + l.person + '</strong><small>' + l.role + '</small></li>';
            }).join("") +
          '</ul>' +
          '<p class="push"><small>Board rosters are published at <a href="' + y.aboutUrl + '" target="_blank" rel="noopener">cencojudo.com</a>.</small></p>' +
        '</div></div>' +
      '</div>';
  });

  // ---------- Legal-page contents (any element with data-toc) ----------
  // Lists the numbered h2s of the .legal text beside it.
  document.querySelectorAll("[data-toc]").forEach(function (el) {
    var heads = el.parentNode.querySelectorAll(".legal h2[id]");
    if (!heads.length) return;
    el.innerHTML = '<p>On this page</p><ol>' + Array.prototype.map.call(heads, function (h) {
      return '<li><a href="#' + h.id + '">' + h.textContent.replace(/^\d+\.\s*/, "") + '</a></li>';
    }).join("") + '</ol>';
  });

  // ---------- Shared FAQ section ----------
  var faqSection = $("section#faq");
  if (faqSection) {
    var limit = parseInt(faqSection.getAttribute("data-limit") || "0", 10);
    var items = limit > 0 ? FAQ.slice(0, limit) : FAQ;
    var isFull = limit === 0;
    var faqTitle = faqSection.hasAttribute("data-notitle") ? "" :
      '<div class="section-title" data-reveal><h2>Questions, answered.</h2>' +
      '<p>' + (isFull ? "Everything you need to know before your first class." : "The ones we hear most from new families.") + '</p>' +
      (isFull ? "" : '<div class="actions"><a class="link-arrow" href="faq.html">See all FAQs</a></div>') + '</div>';
    faqSection.innerHTML =
      '<div class="wrap' + (faqTitle ? " faq-split" : "") + '">' + faqTitle +
        '<div class="faq-list">' +
          items.map(function (f) {
            return '<details class="faq-item" data-reveal><summary>' + f.q + '</summary><div class="faq-body"><p>' + f.a + '</p></div></details>';
          }).join("") +
        '</div>' +
      '</div>';
  }

  // ---------- Shared contact section ----------
  var contactSection = $("section#contact");
  if (contactSection) {
    // Phone and email rows only render when those details are filled in above.
    var phones = CLUB.phones.map(function (p) {
      return '<li><span>Phone</span><span><a href="' + telHref(p.number) + '">' + p.number + '</a><br><small>' + p.name + '</small></span></li>';
    }).join("");
    var emailRow = CLUB.email
      ? '<li><span>Email</span><span><a href="mailto:' + CLUB.email + '">' + CLUB.email + '</a></span></li>'
      : "";
    // With no phone or email published, tell people how to actually reach us.
    var inPersonRow = (!CLUB.email && !CLUB.phones.length)
      ? '<li><span>Visit</span><span>Come by any <strong>Tuesday or Thursday, 5:30 pm</strong> class at Herzog Hall — no appointment needed. Instructors are happy to talk before or after class.</span></li>'
      : "";
    // Mail row renders only when an address is set, and is flagged loudly while
    // the address is still the placeholder.
    var mailRow = CLUB.mailing
      ? '<li><span>Mail</span><span>' + CLUB.mailing +
        (CLUB.mailingIsPlaceholder ? ' <strong class="placeholder-flag">Placeholder — not a real address</strong>' : "") +
        '</span></li>'
      : "";
    var mapSrc = "https://www.google.com/maps?q=" + encodeURIComponent(CLUB.location.mapQuery) + "&output=embed";
    contactSection.innerHTML =
      '<div class="wrap">' +
        '<div class="section-title" data-reveal><h2>Find the dojo.</h2><p>The best way to reach us is in person — come watch a class and meet the instructors.</p></div>' +
        '<div class="contact-grid">' +
          '<div class="shell" data-reveal><div class="core">' +
            '<ul class="contact-list">' +
              '<li><span>Dojo</span><span><strong>' + CLUB.location.name + '</strong><br>' + CLUB.location.street + '<br>' + CLUB.location.city + '</span></li>' +
              '<li><span>Classes</span><span>' + CLUB.schedule.map(function (s) { return s.day + " " + s.time + " <small>(" + s.who + ")</small>"; }).join("<br>") + '</span></li>' +
              inPersonRow +
              phones +
              emailRow +
              '<li><span>Registration</span><span>Through the City of Petaluma Parks &amp; Recreation Department — search "Judo" in the <a href="' + CLUB.registerUrl + '" target="_blank" rel="noopener">online catalog</a>.</span></li>' +
              mailRow +
            '</ul>' +
            '<div class="actions"><a class="btn" href="' + CLUB.registerUrl + '" target="_blank" rel="noopener">Register via Parks &amp; Rec</a></div>' +
            '<p class="muted contact-note">DeLeon Judo Club is a 501(c)(3) non-profit organization (EIN ' + CLUB.nonprofit.ein + '). All registration and payment is handled by the City of Petaluma Parks &amp; Recreation Department.</p>' +
          '</div></div>' +
          '<div class="shell" data-reveal><iframe class="core map-embed" loading="lazy" title="Map to ' + CLUB.location.name + '" src="' + mapSrc + '" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
        '</div>' +
      '</div>';
  }

  // Register-link buttons anywhere: <a data-register>
  document.querySelectorAll("[data-register]").forEach(function (a) {
    a.href = CLUB.registerUrl; a.target = "_blank"; a.rel = "noopener";
  });

  // ---------- Non-profit disclosures ----------
  document.querySelectorAll("[data-ein]").forEach(function (el) { el.textContent = CLUB.nonprofit.ein; });
  document.querySelectorAll("[data-legal-name]").forEach(function (el) { el.textContent = CLUB.nonprofit.legalName; });
  document.querySelectorAll("[data-nonprofit]").forEach(function (el) {
    el.innerHTML = "<p>" + CLUB.nonprofit.blurb + "</p>";
  });

  // ---------- Hero photo clusters (edit here) ----------
  // Groups of photos from public/hero/ cycle behind the home-page headline.
  // Each photo rises for its whole lifetime — fading and popping in as it
  // starts, fading out still rising — then the next group takes over. Each
  // photo names a slot; slots are positions in the hero box as percentages
  // (x/y = top-left corner, w = width, ar = aspect ratio) and stay clear of
  // the centre column where the copy sits. Mix left and right slots in every
  // group so both sides fill. Sizes deliberately vary a lot: L1/R1/L4/R5 are
  // big (corners, clear of the copy), L2/L5/R2 are small; give every group a mix.
  var HERO_SLOTS = {
    L1: { x: 2,  y: 6,  w: 19, ar: "4/3" },
    L2: { x: 14, y: 34, w: 7,  ar: "3/4" },
    L3: { x: 3,  y: 40, w: 10, ar: "4/3" },
    L4: { x: 6,  y: 62, w: 15, ar: "3/4" },
    L5: { x: 22, y: 84, w: 8,  ar: "1/1" },
    R1: { x: 78, y: 5,  w: 20, ar: "4/3" },
    R2: { x: 71, y: 32, w: 7,  ar: "1/1" },
    R3: { x: 85, y: 42, w: 12, ar: "3/4" },
    R4: { x: 74, y: 66, w: 9,  ar: "4/3" },
    R5: { x: 80, y: 78, w: 17, ar: "4/3" }
  };
  var HERO_GROUPS = [
    [["05", "L1"], ["17", "R2"], ["14", "L4"], ["21", "R4"], ["16", "L2"]],
    [["09", "R1"], ["07", "L1"], ["10", "L3"], ["13", "R3"], ["22", "L5"], ["03", "R4"]],
    [["01", "L4"], ["12", "R1"], ["06", "L5"], ["11", "R2"], ["18", "L3"], ["15", "R3"]],
    [["19", "R1"], ["08", "L3"], ["04", "R4"], ["20", "L1"], ["02", "R5"], ["03", "L2"]]
  ];
  // life = how long each photo is on screen (ms); stagger must match the
  // animation-delay step in css/styles.css.
  var HERO_TIMING = { life: 6500, stagger: 160, gap: 150 };

  var heroPhotos = $("[data-hero-photos]");
  if (heroPhotos && HERO_GROUPS.length) {
    var heroSrc = function (p) { return "public/hero/" + p[0] + ".jpg"; };
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var preloadGroup = function (group) {
      return Promise.all(group.map(function (p) {
        return new Promise(function (resolve) {
          var img = new Image();
          img.onload = img.onerror = resolve;
          img.src = heroSrc(p);
        });
      }));
    };

    var renderGroup = function (group) {
      heroPhotos.innerHTML = group.map(function (p, i) {
        var s = HERO_SLOTS[p[1]];
        return '<figure class="hero-photo" style="--x:' + s.x + '%;--y:' + s.y + '%;--w:' + s.w +
               '%;--ar:' + s.ar + ';--i:' + i + ';--life:' + HERO_TIMING.life + 'ms">' +
               '<img src="' + heroSrc(p) + '" alt="" decoding="async"></figure>';
      }).join("");
    };

    var showHeroGroup = function (i) {
      var group = HERO_GROUPS[i];
      preloadGroup(group).then(function () {
        renderGroup(group);
        if (reduceMotion || HERO_GROUPS.length < 2) return;
        var next = (i + 1) % HERO_GROUPS.length;
        preloadGroup(HERO_GROUPS[next]);
        var groupLength = HERO_TIMING.life + (group.length - 1) * HERO_TIMING.stagger + HERO_TIMING.gap;
        setTimeout(function waitForNext() {
          // Don't cycle in a background tab; pick up again when it's visible.
          if (document.hidden) { setTimeout(waitForNext, 1000); return; }
          showHeroGroup(next);
        }, groupLength);
      });
    };
    showHeroGroup(0);
  }

  // ---------- Scroll reveal ----------
  // [data-reveal] elements rise and un-blur once as they enter the viewport.
  // Siblings stagger. Content stays visible without JS or with reduced motion,
  // because the hidden state only applies under html.reveal-on.
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("reveal-on");
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        revealIO.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.hasAttribute("data-reveal"); });
      el.style.setProperty("--d", Math.min(sibs.indexOf(el), 4) * 90 + "ms");
      revealIO.observe(el);
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

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
      name: "Kenilworth Teen Center",
      street: "150 Fairgrounds Drive",
      city: "Petaluma, CA 94954",
      mapQuery: "Kenilworth Teen Center, 150 Fairgrounds Dr, Petaluma, CA 94954"
    },
    mailing: "2015 Caulfield Lane, Petaluma, CA 94954",
    email: "hkaku@sbcglobal.net",
    phones: [
      { name: "Sensei Henry Kaku (Head Instructor)", number: "(707) 486-4576" },
      { name: "Sensei Davin Tillman (Assistant Head Instructor)", number: "(707) 774-2798" }
    ],
    registerUrl: "https://secure.rec1.com/CA/petaluma-ca/catalog",
    parksRecUrl: "https://cityofpetaluma.org/parks-recreation/",
    schedule: [
      { day: "Monday", time: "5:30 – 7:00 pm", who: "Experienced students" },
      { day: "Tuesday & Thursday", time: "5:30 – 7:00 pm", who: "All students (ages 6+)" },
      { day: "Tuesday & Thursday", time: "7:00 – 8:30 pm", who: "By appointment only" }
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
      a: "Yes. Prospective students and parents are welcome to come watch a class, and we encourage a trial class before committing. Contact one of the instructors below or just stop by during a Tuesday or Thursday 5:30 pm class."
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
      q: "Do you compete in tournaments?",
      a: "Students who want to compete can, but competition is never required. The club regularly attends regional tournaments in Northern California, such as the San Jose Buddhist tournament, and our instructors include certified referees."
    },
    {
      q: "Is the club a non-profit?",
      a: "Yes. DeLeon Judo Club is a non-profit organization run by volunteer instructors. Fees go through Petaluma Parks &amp; Recreation and support mat time, equipment, and the program."
    },
    {
      q: "Where are classes held?",
      a: CLUB.location.name + ", " + CLUB.location.street + ", " + CLUB.location.city + " — on the Sonoma-Marin Fairgrounds. Parking is available on site."
    }
  ];

  // ---------- Helpers ----------
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function telHref(num) { return "tel:+1" + num.replace(/\D/g, ""); }

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

  // ---------- Shared FAQ section ----------
  var faqSection = $("#faq");
  if (faqSection) {
    var limit = parseInt(faqSection.getAttribute("data-limit") || "0", 10);
    var items = limit > 0 ? FAQ.slice(0, limit) : FAQ;
    var isFull = limit === 0;
    faqSection.innerHTML =
      '<div class="wrap">' +
        (faqSection.hasAttribute("data-notitle") ? "" :
          '<div class="section-title"><h2>Frequently Asked Questions</h2>' +
          '<p>' + (isFull ? "Everything you need to know before your first class." : "Quick answers to the most common questions.") + '</p></div>') +
        '<div class="faq-list">' +
          items.map(function (f) {
            return '<details class="faq-item"><summary>' + f.q + '</summary><div class="faq-body"><p>' + f.a + '</p></div></details>';
          }).join("") +
        '</div>' +
        (isFull ? "" : '<p style="margin-top:1.25rem"><a class="btn btn-outline" href="faq.html">See all FAQs</a></p>') +
      '</div>';
  }

  // ---------- Shared contact section ----------
  var contactSection = $("#contact");
  if (contactSection) {
    var phones = CLUB.phones.map(function (p) {
      return '<li><span>Phone</span><span><a href="' + telHref(p.number) + '">' + p.number + '</a><br><small>' + p.name + '</small></span></li>';
    }).join("");
    var mapSrc = "https://www.google.com/maps?q=" + encodeURIComponent(CLUB.location.mapQuery) + "&output=embed";
    contactSection.innerHTML =
      '<div class="wrap">' +
        '<div class="section-title"><h2>Contact Us</h2><p>Questions? Want to watch a class? Reach out — we\'d love to meet you.</p></div>' +
        '<div class="contact-grid">' +
          '<div>' +
            '<ul class="contact-list">' +
              '<li><span>Dojo</span><span><strong>' + CLUB.location.name + '</strong><br>' + CLUB.location.street + '<br>' + CLUB.location.city + '</span></li>' +
              '<li><span>Classes</span><span>' + CLUB.schedule.map(function (s) { return s.day + " " + s.time + " <small>(" + s.who + ")</small>"; }).join("<br>") + '</span></li>' +
              phones +
              '<li><span>Email</span><span><a href="mailto:' + CLUB.email + '">' + CLUB.email + '</a></span></li>' +
              '<li><span>Mail</span><span>' + CLUB.mailing + '</span></li>' +
            '</ul>' +
            '<p><a class="btn btn-gold" href="' + CLUB.registerUrl + '" target="_blank" rel="noopener">Register via Petaluma Parks &amp; Rec</a></p>' +
            '<p class="muted" style="font-size:0.9rem;margin:0">DeLeon Judo Club is a non-profit. All registration and payment is handled by the City of Petaluma Parks &amp; Recreation Department.</p>' +
          '</div>' +
          '<div><iframe class="map-embed" loading="lazy" title="Map to ' + CLUB.location.name + '" src="' + mapSrc + '" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
        '</div>' +
      '</div>';
  }

  // Register-link buttons anywhere: <a data-register>
  document.querySelectorAll("[data-register]").forEach(function (a) {
    a.href = CLUB.registerUrl; a.target = "_blank"; a.rel = "noopener";
  });

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

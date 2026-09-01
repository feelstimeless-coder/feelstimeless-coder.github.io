/* ============================================================
   FEELS TIMELESS — shared app script
   Header/footer injection, theme, nav, reveal, gallery lightbox,
   review system, booking system (multi-traveler, localStorage).
   ============================================================ */

const FT = {
  email: "info@feelstimeless.com",
  phone1: "+256 770 691 883",
  phone2: "+256 777 826 781",
  phone3: "+256 708 483 536",
  phone1raw: "+256770691883",
  phone2raw: "+256777826781",
  phone3raw: "+256708483536",
  whatsapp: "256770691883",
  location: "Nakawa, Kampala, Uganda · Online planners 24/7",
};

/* Logo mark: concentric striped arch sun (echoes the Feels Timeless logo) */
const ARCH = (cls = "") => `
<svg class="${cls}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="currentColor" stroke-width="5">
    <path d="M100 12 V104"/>
    <path d="M85 13.3 V110 a15 15 0 0 0 30 0 V13.3" fill="none"/>
    <path d="M70 16.8 V110 a30 30 0 0 0 60 0 V16.8" fill="none" opacity=".95"/>
    <path d="M55 23 V110 a45 45 0 0 0 90 0 V23" fill="none" opacity=".9"/>
    <path d="M40 32.4 V110 a60 60 0 0 0 120 0 V32.4" fill="none" opacity=".85"/>
    <path d="M25 47 V110 a75 75 0 0 0 150 0 V47" fill="none" opacity=".8"/>
  </g>
</svg>`;

const ICONS = {
  phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M12 2l2.9 6.26 6.86.63-5.18 4.55 1.53 6.72L12 16.67 5.89 20.16l1.53-6.72L2.24 8.89l6.86-.63L12 2z"/></svg>',
  wa: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>',
  ig: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  fb: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  x: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  tk: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>',
};

const NAV = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["services.html", "Experiences"],
  ["destinations.html", "Destinations"],
  ["events.html", "Events"],
  ["gallery.html", "Gallery"],
  ["reviews.html", "Reviews"],
  ["contact.html", "Contact"],
];

function renderChrome() {
  const page = document.body.dataset.page || "";
  const header = `
  <div class="topbar">
    <div class="wrap">
      <a href="tel:${FT.phone1raw}">${ICONS.phone} ${FT.phone1}</a>
      <a class="hide-m" href="tel:${FT.phone2raw}">${ICONS.phone} ${FT.phone2}</a>
      <a class="hide-m" href="mailto:${FT.email}">${ICONS.mail} ${FT.email}</a>
      <span class="spacer"></span>
      <a href="about.html#location">${ICONS.pin} ${FT.location}</a>
    </div>
  </div>
  <div class="wrap navrow">
    <a class="brand" href="index.html" aria-label="Feels Timeless home">
      <span style="color:var(--olive)">${ARCH()}</span>
      <span class="word"><b>Feels</b><span>Timeless</span></span>
    </a>
    <nav class="main" id="mainnav">
      <button class="iconbtn navclose" aria-label="Close menu">✕</button>
      ${NAV.map(([href, label]) => `<a href="${href}" class="${page === href ? "active" : ""}">${label}</a>`).join("")}
      <a href="booking.html" class="cta ${page === "booking.html" ? "active" : ""}">Book a trip</a>
    </nav>
    <button class="iconbtn" id="themeToggle" aria-label="Toggle dark mode"></button>
    <button class="iconbtn burger" id="burger" aria-label="Open menu">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
  </div>`;
  document.querySelector("header.site").innerHTML = header;

  const footer = `
  <div class="wrap">
    <div class="top">
      <div>
        <div class="logo"><span style="color:var(--olive)">${ARCH()}</span><b>Feels Timeless</b></div>
        <p>A modern travel company based in Nakawa, Kampala — crafting safaris, beach escapes, festivals and city getaways across East Africa and beyond. Our planners are online 24/7; we handle everything on the ground. Travel that feels timeless.</p>
        <div class="socials">
          <a href="https://www.instagram.com/feels_2.3" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.ig}</a>
          <a href="https://www.tiktok.com/@feels_timeless" target="_blank" rel="noopener" aria-label="TikTok">${ICONS.tk}</a>
        </div>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="about.html">About us</a></li>
          <li><a href="services.html">Experiences</a></li>
          <li><a href="destinations.html">Destinations</a></li>
          <li><a href="events.html">Events &amp; festivals</a></li>
          <li><a href="gallery.html">Trip gallery</a></li>
        </ul>
      </div>
      <div>
        <h4>Travelers</h4>
        <ul>
          <li><a href="booking.html">Book a trip</a></li>
          <li><a href="booking.html#mybookings">My bookings</a></li>
          <li><a href="reviews.html">Reviews</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Get in touch</h4>
        <ul class="contact">
          <li>${ICONS.pin}<span>${FT.location}</span></li>
          <li>${ICONS.phone}<span><a href="tel:${FT.phone1raw}">${FT.phone1}</a><br><a href="tel:${FT.phone2raw}">${FT.phone2}</a><br><a href="tel:${FT.phone3raw}">${FT.phone3}</a></span></li>
          <li>${ICONS.mail}<a href="mailto:${FT.email}">${FT.email}</a></li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <span>© <span id="yr"></span> Feels Timeless Ltd. All rights reserved.</span>
      <span>Made with love in Kampala 🇺🇬</span>
    </div>
  </div>`;
  document.querySelector("footer.site").innerHTML = footer;
  document.getElementById("yr").textContent = new Date().getFullYear();

  const fab = document.createElement("a");
  fab.className = "whatsapp-fab";
  fab.href = `https://wa.me/${FT.whatsapp}?text=${encodeURIComponent("Hello Feels Timeless! I'd like to plan a trip.")}`;
  fab.target = "_blank";
  fab.rel = "noopener";
  fab.setAttribute("aria-label", "Chat on WhatsApp");
  fab.innerHTML = ICONS.wa;
  document.body.appendChild(fab);

  // nav behavior
  const nav = document.getElementById("mainnav");
  document.getElementById("burger").addEventListener("click", () => nav.classList.add("open"));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a") || e.target.closest(".navclose")) nav.classList.remove("open");
  });

  // theme
  const toggle = document.getElementById("themeToggle");
  const sun = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moon = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const setIcon = () => { toggle.innerHTML = document.documentElement.dataset.theme === "dark" ? sun : moon; };
  setIcon();
  toggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("ft-theme", next);
    setIcon();
  });
}

/* ============================ FIREBASE ============================ */
/* Enabled when assets/js/firebase-config.js sets window.FIREBASE_CONFIG
   and the compat SDK scripts are on the page. Falls back to localStorage. */
let FTDB = null;
function initFirebase() {
  if (window.FIREBASE_CONFIG && window.firebase && firebase.initializeApp) {
    try {
      firebase.initializeApp(window.FIREBASE_CONFIG);
      FTDB = firebase.firestore();
    } catch (e) {
      console.warn("Firebase init failed, using local storage:", e);
      FTDB = null;
    }
  }
}

/* Compress a picked image to a small JPEG data URL (fits Firestore's 1MB doc limit) */
function compressImage(file, maxDim = 1000) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      let q = 0.72;
      let out = c.toDataURL("image/jpeg", q);
      while (out.length > 300 * 1024 && q > 0.35) {
        q -= 0.1;
        out = c.toDataURL("image/jpeg", q);
      }
      URL.revokeObjectURL(img.src);
      res(out);
    };
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });
}

/* image fallback: olive placeholder with arch mark if a web image fails */
const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='800' height='600' fill='#a9b15e'/><g stroke='#fbfaf5' stroke-width='7' fill='none' opacity='.7' transform='translate(300,180) scale(1)'><path d='M100 12 V104'/><path d='M85 13 V110 a15 15 0 0 0 30 0 V13'/><path d='M70 17 V110 a30 30 0 0 0 60 0 V17'/><path d='M55 23 V110 a45 45 0 0 0 90 0 V23'/><path d='M40 32 V110 a60 60 0 0 0 120 0 V32'/></g></svg>`
);
function guardImages() {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      if (img.src !== PLACEHOLDER) img.src = PLACEHOLDER;
    }, { once: true });
  });
}

/* ambient video bands: play only while on screen (autoplay can be blocked until nudged) */
function initVideoBands() {
  const vids = document.querySelectorAll(".vband video");
  if (!vids.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { v.play().catch(() => {}); }
      else { v.pause(); }
    });
  }, { threshold: 0.2 });
  vids.forEach((v) => io.observe(v));
}

/* scroll reveal */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* shared lightbox (gallery figures + review photos) */
let LB = null;
function ensureLightbox() {
  if (LB) return LB;
  LB = document.createElement("div");
  LB.className = "lightbox";
  LB.innerHTML = `<button class="iconbtn x" aria-label="Close">✕</button><img alt=""><div class="cap"></div>`;
  document.body.appendChild(LB);
  LB.addEventListener("click", (e) => {
    if (e.target === LB || e.target.closest(".x")) LB.classList.remove("open");
  });
  return LB;
}
function openLightbox(src, cap = "") {
  const lb = ensureLightbox();
  lb.querySelector("img").src = src;
  lb.querySelector(".cap").textContent = cap;
  lb.classList.add("open");
}
function initLightbox() {
  document.querySelectorAll(".gal figure").forEach((f) =>
    f.addEventListener("click", () =>
      openLightbox(f.querySelector("img").src, f.querySelector("figcaption")?.textContent || "")));
}

/* ============================ REVIEWS ============================ */
const SEED_REVIEWS = [
  { name: "Amina Nakato", trip: "Zanzibar Beach Escape", stars: 5, date: "2026-06-14", text: "From the first WhatsApp message to the flight home, everything was smooth. The dhow cruise at sunset was pure magic — Feels Timeless thought of every detail." },
  { name: "Brian Okello", trip: "Nairobi City + Giraffe Centre", stars: 5, date: "2026-06-02", text: "Booked for my whole team of 8 from work. One invoice, one itinerary, zero stress. Feeding giraffes with my colleagues is a memory we still talk about in the office." },
  { name: "Shreya Patel", trip: "Murchison Falls Safari", stars: 4, date: "2026-05-21", text: "Great guides who genuinely love wildlife. The boat ride to the base of the falls was breathtaking. Would have loved one more day — that's on me for booking short!" },
  { name: "Daniel Ssemwanga", trip: "Coastal Villa Getaway", stars: 5, date: "2026-05-10", text: "They found us a private villa with a chef for less than a hotel would cost. Breakfast on the veranda every morning. This is how group trips should feel." },
  { name: "Grace Atim", trip: "Honeymoon — Diani Beach", stars: 5, date: "2026-04-19", text: "My husband and I didn't lift a finger. Flowers in the room, private dinner on the beach, seamless transfers. Timeless indeed." },
  { name: "Kevin Mugisha", trip: "Jinja Adventure Weekend", stars: 4, date: "2026-04-02", text: "Rafting the Nile with this crew was unforgettable. Pickup from Kampala was right on time. Solid value for a weekend adventure." },
];
const R_KEY = "ft-reviews";
const localReviews = () => {
  try { return JSON.parse(localStorage.getItem(R_KEY) || "[]"); } catch { return []; }
};
/* Cloud-first: Firestore reviews (shared by everyone) + seeds; local fallback */
async function getReviews() {
  if (FTDB) {
    try {
      const snap = await FTDB.collection("reviews").orderBy("created", "desc").limit(100).get();
      const cloud = snap.docs.map((d) => {
        const r = d.data();
        return { ...r, date: r.created?.toDate ? r.created.toDate().toISOString().slice(0, 10) : (r.date || new Date().toISOString().slice(0, 10)) };
      });
      return [...cloud, ...SEED_REVIEWS];
    } catch (e) {
      console.warn("Firestore read failed, using local reviews:", e);
    }
  }
  return [...localReviews(), ...SEED_REVIEWS];
}
async function saveReview(entry) {
  if (FTDB) {
    const doc = { ...entry, created: firebase.firestore.FieldValue.serverTimestamp() };
    delete doc.date;
    await FTDB.collection("reviews").add(doc);
    return "cloud";
  }
  const mine = localReviews();
  mine.unshift(entry);
  localStorage.setItem(R_KEY, JSON.stringify(mine));
  return "local";
}
const starsRow = (n) =>
  `<span class="stars" aria-label="${n} out of 5 stars">${Array.from({ length: 5 }, (_, i) =>
    `<span style="${i < n ? "" : "opacity:.25"}">${ICONS.star}</span>`).join("")}</span>`;

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function reviewCard(r) {
  const initials = esc(r.name).split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const date = new Date(r.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  const photos = Array.isArray(r.photos) && r.photos.length
    ? `<div class="rphotos">${r.photos.map((p) => `<img src="${p}" alt="Traveler photo from ${esc(r.trip)}" loading="lazy">`).join("")}</div>`
    : "";
  return `<article class="review-card reveal">
    <div class="head">
      <div class="avatar">${initials}</div>
      <div class="who"><b>${esc(r.name)}</b><span>${date} · Verified traveler</span></div>
    </div>
    ${starsRow(r.stars)}
    <p>“${esc(r.text)}”</p>
    ${photos}
    <span class="trip-chip">${esc(r.trip)}</span>
  </article>`;
}

function renderReviewSummary(mount, rs) {
  const avg = rs.reduce((a, r) => a + r.stars, 0) / rs.length;
  const counts = [5, 4, 3, 2, 1].map((s) => rs.filter((r) => r.stars === s).length);
  mount.innerHTML = `
    <div>
      <div class="big">${avg.toFixed(1)}</div>
      ${starsRow(Math.round(avg))}
      <div style="font-size:13.5px;color:var(--ink-soft);margin-top:6px">${rs.length} traveler reviews</div>
    </div>
    <div class="bars">
      ${counts.map((c, i) => `<div class="bar"><span>${5 - i} stars</span><div class="track"><div class="fill" style="width:${(c / rs.length) * 100}%"></div></div><span>${c}</span></div>`).join("")}
    </div>`;
}

function initReviewsPage() {
  const list = document.getElementById("reviewList");
  if (!list) return;
  const summary = document.getElementById("reviewSummary");
  const paint = async () => {
    const rs = await getReviews();
    list.innerHTML = rs.map(reviewCard).join("");
    renderReviewSummary(summary, rs);
    list.querySelectorAll(".rphotos img").forEach((img) =>
      img.addEventListener("click", () => openLightbox(img.src, img.alt)));
    initReveal();
  };
  paint();

  // photo picking + compression (max 3)
  let pendingPhotos = [];
  const photoInput = document.getElementById("rphotos");
  const preview = document.getElementById("photoPreview");
  const paintPreview = () => {
    preview.innerHTML = pendingPhotos.map((p, i) =>
      `<span class="pv"><img src="${p}" alt="Photo ${i + 1}"><button type="button" data-i="${i}" aria-label="Remove photo">✕</button></span>`).join("");
  };
  if (photoInput) {
    photoInput.addEventListener("change", async () => {
      for (const file of [...photoInput.files].slice(0, 3 - pendingPhotos.length)) {
        try { pendingPhotos.push(await compressImage(file)); } catch { /* skip unreadable file */ }
      }
      photoInput.value = "";
      paintPreview();
    });
    preview.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (b) { pendingPhotos.splice(+b.dataset.i, 1); paintPreview(); }
    });
  }

  // star input
  let chosen = 5;
  const starInput = document.getElementById("starInput");
  const paintStars = () => {
    starInput.querySelectorAll("button").forEach((b, i) => b.classList.toggle("on", i < chosen));
  };
  starInput.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<button type="button" data-v="${i + 1}" aria-label="${i + 1} stars">${ICONS.star.replace('width="17" height="17"', 'width="30" height="30"')}</button>`).join("");
  starInput.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) { chosen = +b.dataset.v; paintStars(); }
  });
  paintStars();

  document.getElementById("reviewForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target;
    const entry = {
      name: f.rname.value.trim().slice(0, 60),
      trip: f.rtrip.value,
      text: f.rtext.value.trim().slice(0, 1200),
      stars: chosen,
      photos: pendingPhotos,
      date: new Date().toISOString().slice(0, 10),
    };
    if (!entry.name || !entry.text) return;
    const btn = f.querySelector('button[type="submit"]');
    const n = document.getElementById("reviewNotice");
    btn.disabled = true;
    try {
      const where = await saveReview(entry);
      f.reset();
      chosen = 5; paintStars();
      pendingPhotos = []; paintPreview();
      await paint();
      n.textContent = where === "cloud"
        ? "Webale nyo! Your review and photos are now live for everyone to see."
        : "Webale nyo! Your review has been published below.";
    } catch (err) {
      console.warn("Review save failed:", err);
      n.textContent = "Hmm, we couldn't publish that just now — please try again in a moment.";
    }
    btn.disabled = false;
    n.classList.add("show");
    setTimeout(() => n.classList.remove("show"), 6000);
  });
}

/* ============================ BOOKINGS ============================ */
const B_KEY = "ft-bookings";
const getBookings = () => { try { return JSON.parse(localStorage.getItem(B_KEY) || "[]"); } catch { return []; } };

function travelerRow(first = false) {
  const row = document.createElement("div");
  row.className = "traveler-row";
  row.innerHTML = `
    <input type="text" placeholder="Full name" class="t-name" required>
    <select class="t-type">
      <option>Adult</option><option>Child</option><option>Staff member</option>
    </select>
    <input type="text" placeholder="Phone / email (optional)" class="t-contact">
    <button type="button" class="rm" aria-label="Remove traveler" ${first ? 'style="visibility:hidden"' : ""}>✕</button>`;
  row.querySelector(".rm").addEventListener("click", () => row.remove());
  return row;
}

function initBookingPage() {
  const form = document.getElementById("bookingForm");
  if (!form) return;
  const travelers = document.getElementById("travelers");
  travelers.appendChild(travelerRow(true));
  document.getElementById("addTraveler").addEventListener("click", () => travelers.appendChild(travelerRow()));

  // preselect destination from ?trip= query
  const pre = new URLSearchParams(location.search).get("trip");
  if (pre) {
    const sel = form.bdest;
    [...sel.options].forEach((o) => { if (o.value === pre) sel.value = pre; });
  }

  const paintList = () => {
    const mount = document.getElementById("bookingList");
    const items = getBookings();
    mount.innerHTML = items.length
      ? items.map((b, i) => `
        <div class="booking-item reveal in">
          <div>
            <b>${b.dest}</b>
            <div class="sub2">${b.date || "Flexible dates"} · ${b.people.length} traveler${b.people.length > 1 ? "s" : ""} — ${b.people.map((p) => p.name).join(", ")}</div>
          </div>
          <span class="status">${b.status}</span>
        </div>`).join("")
      : `<p class="sub">No bookings yet — your requested trips will appear here.</p>`;
  };
  paintList();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const people = [...travelers.querySelectorAll(".traveler-row")].map((r) => ({
      name: r.querySelector(".t-name").value.trim(),
      type: r.querySelector(".t-type").value,
      contact: r.querySelector(".t-contact").value.trim(),
    })).filter((p) => p.name);
    if (!people.length) return;
    const booking = {
      dest: form.bdest.value,
      date: form.bdate.value,
      budget: form.bbudget.value,
      org: form.borg.value.trim(),
      notes: form.bnotes.value.trim(),
      contactName: form.bname.value.trim(),
      contactPhone: form.bphone.value.trim(),
      people,
      status: "Requested",
      created: new Date().toISOString(),
    };
    const all = getBookings();
    all.unshift(booking);
    localStorage.setItem(B_KEY, JSON.stringify(all));
    paintList();

    // hand off to the team by email
    const body = [
      `New trip request — ${booking.dest}`,
      `Lead contact: ${booking.contactName} (${booking.contactPhone})`,
      booking.org ? `Company / group: ${booking.org}` : "",
      `Preferred date: ${booking.date || "Flexible"}`,
      `Budget: ${booking.budget}`,
      `Travelers (${people.length}):`,
      ...people.map((p) => ` - ${p.name} (${p.type}${p.contact ? ", " + p.contact : ""})`),
      booking.notes ? `Notes: ${booking.notes}` : "",
    ].filter(Boolean).join("\n");
    const n = document.getElementById("bookingNotice");
    n.innerHTML = `✅ Booking request saved! Send it to our team to confirm:
      <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap">
        <a class="btn sm" href="mailto:${FT.email}?subject=${encodeURIComponent("Trip request — " + booking.dest)}&body=${encodeURIComponent(body)}">Send by email</a>
        <a class="btn sm ghost" target="_blank" rel="noopener" href="https://wa.me/${FT.whatsapp}?text=${encodeURIComponent(body)}">Send on WhatsApp</a>
      </div>`;
    n.classList.add("show");
    form.reset();
    travelers.innerHTML = "";
    travelers.appendChild(travelerRow(true));
    n.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* home page: featured reviews strip */
async function initHomeReviews() {
  const mount = document.getElementById("homeReviews");
  if (!mount) return;
  const rs = await getReviews();
  mount.innerHTML = rs.slice(0, 3).map(reviewCard).join("");
  mount.querySelectorAll(".rphotos img").forEach((img) =>
    img.addEventListener("click", () => openLightbox(img.src, img.alt)));
  initReveal();
}

/* gallery page: latest traveler photos from cloud reviews */
async function initTravelerPhotos() {
  const mount = document.getElementById("travelerPhotos");
  if (!mount || !FTDB) return;
  const rs = await getReviews();
  const shots = rs.flatMap((r) => (Array.isArray(r.photos) ? r.photos.map((p) => ({ p, by: r.name, trip: r.trip })) : [])).slice(0, 12);
  if (!shots.length) return;
  mount.closest("section").style.display = "";
  mount.innerHTML = shots.map((s) =>
    `<figure><img src="${s.p}" alt="Photo by ${esc(s.by)} — ${esc(s.trip)}" loading="lazy"><figcaption>${esc(s.by)} · ${esc(s.trip)}</figcaption></figure>`).join("");
  mount.querySelectorAll("figure").forEach((f) =>
    f.addEventListener("click", () => openLightbox(f.querySelector("img").src, f.querySelector("figcaption").textContent)));
}

/* SEO: structured data injected at runtime (Google renders JS) */
function injectJsonLd(obj) {
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(obj);
  document.head.appendChild(s);
}
function initSchema() {
  const page = document.body.dataset.page || "index.html";
  const BASE = "https://www.feelstimeless.com";
  const names = { "index.html": "Home", "about.html": "About", "services.html": "Experiences", "destinations.html": "Destinations", "events.html": "Events & Festivals", "gallery.html": "Gallery", "reviews.html": "Reviews", "booking.html": "Book a Trip", "contact.html": "Contact" };
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: BASE + "/" }];
  if (page !== "index.html" && names[page]) {
    items.push({ "@type": "ListItem", position: 2, name: names[page], item: `${BASE}/${page}` });
  }
  injectJsonLd({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items });
}
async function initReviewSchema() {
  const page = document.body.dataset.page;
  if (page !== "reviews.html") return;
  try {
    const rs = await getReviews();
    if (!rs.length) return;
    const avg = (rs.reduce((a, r) => a + r.stars, 0) / rs.length).toFixed(1);
    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Feels Timeless",
      "url": "https://www.feelstimeless.com/",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": avg, "reviewCount": String(rs.length), "bestRating": "5" },
      "review": rs.slice(0, 3).map((r) => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": r.name },
        "datePublished": r.date,
        "reviewRating": { "@type": "Rating", "ratingValue": String(r.stars), "bestRating": "5" },
        "reviewBody": r.text,
      })),
    });
  } catch { /* schema is best-effort */ }
}

/* boot */
document.addEventListener("DOMContentLoaded", () => {
  initFirebase();
  renderChrome();
  initHomeReviews();
  initReviewsPage();
  initBookingPage();
  initTravelerPhotos();
  initVideoBands();
  initSchema();
  initReviewSchema();
  initLightbox();
  guardImages();
  initReveal();
});

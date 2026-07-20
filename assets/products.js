/* ==========================================================================
   TacticalPrints — product catalog (PLACEHOLDER DATA)
   Swap image placeholders for real photos and edit prices/copy before launch.
   ========================================================================== */

const CATEGORIES = {
  airsoft:  { label: "Airsoft & Loadout",   sub: "Field gear & attachments",      color: "#4b5320" },
  edc:      { label: "EDC & Useful Stuff",  sub: "Desk, keychain & toolkit prints", color: "#3a3f2b" },
  bookmarks:{ label: "Bookmarks",           sub: "The originals — still around",  color: "#5c4326" },
  chess:    { label: "Novelty Chess",       sub: "18+ · adult humor sets",        color: "#6b1f1a" }
};

// Builds a self-contained SVG placeholder (no external image hosting needed).
// Swap PRODUCTS[i].img for a real photo path/URL whenever you have one.
function placeholderImg(catKey, seed = 0) {
  const cat = CATEGORIES[catKey] || CATEGORIES.edc;
  const bg = cat.color;
  const icons = {
    airsoft: `<path d="M100 40 L100 160 M40 100 L160 100" stroke="#ff6a00" stroke-width="3" opacity="0.55"/><circle cx="100" cy="100" r="46" stroke="#ff6a00" stroke-width="3" fill="none" opacity="0.55"/><circle cx="100" cy="100" r="10" fill="#ff6a00" opacity="0.55"/>`,
    edc: `<rect x="60" y="70" width="80" height="60" rx="4" stroke="#ff6a00" stroke-width="3" fill="none" opacity="0.55"/><circle cx="100" cy="100" r="16" stroke="#ff6a00" stroke-width="3" fill="none" opacity="0.55"/>`,
    bookmarks: `<path d="M75 40 h50 v120 l-25 -22 l-25 22 z" stroke="#ff6a00" stroke-width="3" fill="none" opacity="0.55"/>`,
    chess: `<path d="M90 150 h20 v10 h-20 z M85 140 h30 v10 h-30 z M95 90 q0 -30 5 -30 q5 0 5 30 v40 h-10 z" stroke="#ff6a00" stroke-width="3" fill="none" opacity="0.55"/>`
  };
  const icon = icons[catKey] || icons.edc;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 200 200">
    <defs>
      <pattern id="hatch${seed}" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#000" stroke-opacity="0.15" stroke-width="4"/>
      </pattern>
    </defs>
    <rect width="200" height="200" fill="${bg}"/>
    <rect width="200" height="200" fill="url(#hatch${seed})"/>
    ${icon}
    <text x="100" y="182" font-family="Oswald, sans-serif" font-size="9" fill="#eae7dc" fill-opacity="0.7" text-anchor="middle" letter-spacing="1">PHOTO COMING SOON</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const PRODUCTS = [
  // ---------------- AIRSOFT ----------------
  { id: "as-01", name: "Modular Rail Clip Set (3pc)", category: "airsoft", price: 9.50, desc: "Snap-on 20mm rail clips for pouches and accessories. PETG, field tested.", badge: "Bestseller" },
  { id: "as-02", name: "Speedloader Funnel Adapter", category: "airsoft", price: 6.00, desc: "Fits most 12g / mid-cap mags. Speeds up reloads between rounds." },
  { id: "as-03", name: "Muzzle Dust Cover", category: "airsoft", price: 4.50, desc: "Keeps grit out of the barrel between games. Available in 14mm CCW/CW." },
  { id: "as-04", name: "Hop-Up Adjustment Tool", category: "airsoft", price: 5.00, desc: "No more digging for an allen key mid-match. Clips to your belt." },
  { id: "as-05", name: "Low-Profile Sling Mount", category: "airsoft", price: 8.00, desc: "QD-compatible sling attachment point, reinforced infill.", badge: "New" },
  { id: "as-06", name: "BB Shell Casing Display Rack", category: "airsoft", price: 12.00, desc: "Wall-mount rack for the empties you actually want to keep." },

  // ---------------- EDC / USEFUL ----------------
  { id: "edc-01", name: "Cable Management Clip Pack", category: "edc", price: 5.50, desc: "Keep desk cables from turning into a rat's nest. Set of 6." },
  { id: "edc-02", name: "Folding Phone Stand", category: "edc", price: 7.00, desc: "Flat-pack, pocket-sized, actually holds your phone at an angle that works." },
  { id: "edc-03", name: "Keychain Multi-Tool", category: "edc", price: 6.50, desc: "Bottle opener, flathead, box cutter hook — one solid piece.", badge: "Bestseller" },
  { id: "edc-04", name: "Desk Cable & Pen Organizer", category: "edc", price: 11.00, desc: "Because your desk doesn't have to look like a crime scene." },
  { id: "edc-05", name: "EDC Pouch Belt Clip", category: "edc", price: 4.00, desc: "Universal MOLLE-compatible clip for small pouches and multitools." },
  { id: "edc-06", name: "Headphone Stand", category: "edc", price: 9.00, desc: "Weighted base, minimal footprint, keeps your cans off the desk." },

  // ---------------- BOOKMARKS (legacy line, still around) ----------------
  { id: "bm-01", name: "Skulls Bookmark", category: "bookmarks", price: 3.50, desc: "The one that started it all. Lots of skulls, obviously." },
  { id: "bm-02", name: "Steampunk Bookmark", category: "bookmarks", price: 3.50, desc: "Gears, cogs, and a bit of brass-toned filament." },
  { id: "bm-03", name: "Fantasy & Floral Bookmark", category: "bookmarks", price: 3.50, desc: "Vines, blooms, and a little bit of magic." },
  { id: "bm-04", name: "Post-Apocalyptic Bookmark", category: "bookmarks", price: 3.50, desc: "For readers who like their aesthetics a little end-of-the-world." },

  // ---------------- NOVELTY CHESS (18+) ----------------
  { id: "ch-01", name: "Novelty Chess Set — Full Board", category: "chess", price: 45.00, desc: "Yes, that kind of novelty set. Adults-only humor, full 32-piece board.", badge18: true },
  { id: "ch-02", name: "Novelty Pawns (Set of 8)", category: "chess", price: 14.00, desc: "Replacement / expansion pawns for the full set above.", badge18: true },
  { id: "ch-03", name: "Standard Chess Set — Tactical Edition", category: "chess", price: 38.00, desc: "For people who just want a nice chess set. Olive & orange finish, no jokes." },
];

// ---- helper: attach image URLs lazily so CATEGORIES/PRODUCTS above stay readable ----
PRODUCTS.forEach((p, i) => { if (!p.img) p.img = placeholderImg(p.category, i); });

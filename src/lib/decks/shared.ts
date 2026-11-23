import type { Deck } from "./types";

// Facts shared by every Geromball Grounds nobar deck.
// Sources: Fadil (soft opening, rundown, screens, capacity) and the 31 Oct Geromball x Djarum event deck (zones, branding spots).
export const venue: Deck["venue"] = {
  place: "Selawaktu Cafe, Tebet, Jakarta Selatan",
  screen: "Layar proyektor 120 cm di Zona D, ditambah 4 TV di Zona A, B, dan C",
  capacity: "105 kursi, ditambah area berdiri di belakang",
  facilities: "2 toilet dan 2 wastafel",
  // Seat counts per zone are left out: the 31 Oct deck's zone numbers were estimates (total 124); the real capacity is 105.
  zones: [
    { id: "A", kind: "Indoor", screen: "1 TV", smoking: true },
    { id: "B", kind: "Indoor", screen: "2 TV", smoking: false },
    { id: "C", kind: "Semi-indoor", screen: "1 TV", smoking: true },
    { id: "D", kind: "Outdoor, stage area", screen: "Layar proyektor 120 cm", smoking: true },
  ],
  photos: [
    { label: "Papan nama dan layar Geromball Grounds", src: "/deck/grounds/papan-nama.webp" },
    { label: "Area duduk nobar", src: "/deck/grounds/area-duduk.webp" },
    { label: "Area dalam dengan TV dan bingkai pemain", src: "/deck/grounds/area-dalam.webp" },
    { label: "Neon sign Geromball Grounds", src: "/deck/grounds/neon-sign.webp" },
    { label: "Area indoor dan coffee bar", src: "/deck/grounds/area-indoor.webp" },
  ],
};

export const caseStudy: Deck["caseStudy"] = {
  match: "Chelsea vs Man United",
  seats: 105,
  lines: [
    "Soft opening Geromball Grounds pada Sabtu, 31 Oktober 2026 dipakai untuk nobar Chelsea vs Man United.",
    "Semua 105 kursi reserved terisi, dan banyak penonton lain ikut menonton sambil berdiri di belakang.",
  ],
  photos: [
    { label: "Penonton berdatangan sebelum kick off", src: "/deck/grounds/penonton-datang.webp", video: "/deck/grounds/penonton-datang.mp4" },
    { label: "Game football.games Hexagon bersama audiens sebelum kick off", src: "/deck/grounds/gamifikasi-host.webp" },
    { label: "Keramaian saat nobar Chelsea vs Man United", src: "/deck/grounds/nobar-keramaian.webp", video: "/deck/grounds/nobar-keramaian.mp4" },
  ],
};

export const rundown = (brand: string, m: Deck["match"]): Deck["rundown"] => [
  { step: "Opening gate", time: m.gateOpen, detail: "Penonton masuk ke venue." },
  { step: "Gamifikasi bersama audiens", time: m.eventStart, detail: `Dua game bersama penonton, Kahoot dan football.games Hexagon, berisi CTA ${brand}.`, cta: true },
  { step: "Live Pojok Debat", detail: `Pojok Debat live di depan penonton, berisi CTA ${brand}.`, cta: true },
  { step: "Kick off nobar", time: m.kickoff, detail: "Babak pertama ditonton bareng di layar proyektor dan 4 TV." },
  { step: "Half time", detail: `Live komentator membahas babak pertama, berisi CTA ${brand}.`, cta: true },
  { step: "Second half", detail: "Babak kedua sampai peluit akhir." },
  { step: "Closing event", detail: "Penutupan acara." },
];

// Branding spots from the 31 Oct event deck; exact placement is agreed with each brand later.
export const brandingSpots = (brand: string) => ({
  name: "Titik branding",
  detail: `2 layar digital (TV dan proyektor) dan 3 spot vertikal untuk X-banner atau box. Penempatan branding dan produk ${brand} kita diskusikan lebih lanjut.`,
});

export const brandingPhoto = { label: "Titik branding di Geromball Grounds: layar proyektor, TV, dan spot vertikal", src: "/deck/grounds/titik-branding.webp" };

export const contacts: Deck["contacts"] = [
  { name: "Alfano Fadil", role: "Senior Business Development", whatsapp: "6287700023151", email: "alfanofadil@geromball.com" },
];

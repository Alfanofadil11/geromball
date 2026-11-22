import type { Deck } from "./types";

// Facts shared by every Geromball Grounds nobar deck.
// Sources: Fadil (soft opening Chelsea vs Man United, Nov 2026; rundown) and the Rexona proposal (venue).
export const venue: Deck["venue"] = {
  place: "Selawaktu Cafe, Tebet, Jakarta Selatan",
  screen: "Layar 120 inci",
  capacity: "105 kursi reserved, ditambah area berdiri di belakang",
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
    "Soft opening Geromball Grounds dipakai untuk nobar Chelsea vs Man United.",
    "Semua 105 kursi reserved terisi, dan banyak penonton lain ikut menonton sambil berdiri di belakang.",
  ],
  photos: [
    { label: "Penonton berdatangan sebelum kick off", src: "/deck/grounds/penonton-datang.webp", video: "/deck/grounds/penonton-datang.mp4" },
    { label: "Gamifikasi bersama audiens sebelum kick off", src: "/deck/grounds/gamifikasi-host.webp" },
    { label: "Keramaian saat nobar Chelsea vs Man United", src: "/deck/grounds/nobar-keramaian.webp", video: "/deck/grounds/nobar-keramaian.mp4" },
  ],
};

export const rundown = (brand: string, m: Deck["match"]): Deck["rundown"] => [
  { step: "Opening gate", time: m.gateOpen, detail: "Penonton masuk ke venue." },
  { step: "Gamifikasi bersama audiens", time: m.eventStart, detail: `Games bersama penonton, berisi CTA ${brand}.`, cta: true },
  { step: "Live Pojok Debat", detail: `Pojok Debat live di depan penonton, berisi CTA ${brand}.`, cta: true },
  { step: "Kick off nobar", time: m.kickoff, detail: "Babak pertama ditonton bareng di layar 120 inci." },
  { step: "Half time", detail: `Live komentator membahas babak pertama, berisi CTA ${brand}.`, cta: true },
  { step: "Second half", detail: "Babak kedua sampai peluit akhir." },
  { step: "Closing event", detail: "Penutupan acara." },
];

export const contacts: Deck["contacts"] = [
  { name: "Alfano Fadil", role: "Senior Business Development", whatsapp: "6287700023151", email: "alfanofadil@geromball.com" },
];

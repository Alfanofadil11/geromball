import { brandingPhoto, brandingSpots, caseStudy, contacts, venue } from "./shared";
import type { Deck } from "./types";

const match: Deck["match"] = { home: "Chelsea", away: "Liverpool", day: "Sabtu", date: "5 Desember 2026", kickoff: "19.30 WIB", eventStart: "17.00 WIB", gateOpen: "16.00 WIB" };

export const djarumNobar: Deck = {
  slug: "djarum-nobar",
  client: "Djarum Super",
  agency: "Geromball",
  // sha256("DJNB-GRMB-1205")
  codeSha256: "9bc8590b09041a90f337ab6748640fb9ff03d4fe67ca41352057227b16abdfea",
  // Djarum Super red, picked by eye; confirm with the brand guide.
  clientColor: { fill: "#b3121f", onDark: "#ff8a8a" },
  match,
  cover: { line: "Nobar Djarum Super di Geromball Grounds", banner: "/proposal/geromball-hero.webp" },
  venue,
  // The 31 Oct soft opening was a Geromball x Djarum nobar.
  caseStudy: {
    ...caseStudy,
    lines: [
      "Soft opening Geromball Grounds pada Sabtu, 31 Oktober 2026 adalah nobar Chelsea vs Man United bersama Djarum Super.",
      caseStudy.lines[1],
    ],
  },
  // Times follow the 31 Oct event deck (same 19.30 kick off); crew call and final preparation are internal and left out.
  rundown: [
    { step: "Open gate", time: "16.00", detail: "Penonton masuk ke venue." },
    { step: "Fun Session #1", time: "17.00–18.00", detail: "MC membuka acara, ngobrol dengan penonton, lalu game Kahoot.", cta: true },
    { step: "ISOMA", time: "18.00–18.30", detail: "Istirahat, sholat Maghrib, makan." },
    { step: "Fun Session #2", time: "18.30–19.00", detail: "Game football.games Hexagon bersama penonton.", cta: true },
    { step: "Ngobrol pre-match", time: "19.00–19.25", detail: "Geromball ngobrol bola bersama penonton.", cta: true },
    { step: "Babak pertama", time: "19.30–20.15", detail: "Nobar dan live reaction." },
    { step: "Djarum Session", time: "20.15–20.30", detail: "Half time: bahas babak pertama dan sesi bebas dari Djarum Super.", cta: true },
    { step: "Babak kedua", time: "20.30–21.15", detail: "Nobar dan live reaction." },
    { step: "Bahas after-match", time: "21.15–21.45", detail: "Ngobrol setelah pertandingan sampai selesai." },
  ],
  brand: {
    title: "Djarum Super di venue dan di layar",
    lead: "Djarum Super hadir di empat segmen acara yang membawa CTA Djarum Super, dan nobar juga tayang sebagai Live Reaction di YouTube Geromball.",
    points: [
      { name: "Fun Session", detail: "Kahoot dan football.games Hexagon bersama penonton membawa CTA Djarum Super." },
      { name: "Ngobrol pre-match", detail: "Geromball ngobrol bola bersama penonton, berisi CTA Djarum Super." },
      { name: "Djarum Session", detail: "Half time: bahas babak pertama dan sesi bebas dari Djarum Super." },
      { name: "Live Reaction YouTube", detail: "Confirmed bisa berjalan bersamaan dengan nobar." },
      brandingSpots("Djarum Super"),
    ],
    photo: brandingPhoto,
  },
  live: {
    title: "Nobar dan Live Reaction YouTube",
    badge: "Confirmed",
    lead: "Nobar di Geromball Grounds bisa berjalan bersamaan dengan Live Reaction di YouTube Geromball.",
  },
  tbc: ["Penempatan branding dan produk Djarum Super"],
  contacts,
};


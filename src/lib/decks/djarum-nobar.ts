import { caseStudy, contacts, rundown, venue } from "./shared";
import type { Deck } from "./types";

const match: Deck["match"] = { home: "Chelsea", away: "Liverpool", day: "Sabtu", date: "5 Desember 2026", kickoff: "19.30 WIB", eventStart: "18.30 WIB", gateOpen: "15.30 WIB" };

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
  caseStudy,
  rundown: rundown("Djarum Super", match),
  brand: {
    title: "Djarum Super di venue dan di layar",
    lead: "Djarum Super hadir di tiga segmen acara yang membawa CTA Djarum Super, dan seluruh acara ditayangkan live di YouTube Geromball.",
    points: [
      { name: "Gamifikasi", detail: "Games dan kuis membawa CTA Djarum Super." },
      { name: "Live Pojok Debat", detail: "Talent menyampaikan CTA Djarum Super sebelum kick off." },
      { name: "Half time", detail: "Live komentator menyampaikan CTA Djarum Super." },
      { name: "Live Reaction YouTube", detail: "Nobar dimirror sebagai Live Reaction di channel YouTube Geromball." },
    ],
    photo: { label: "Talent Geromball memandu games di depan penonton", src: "/deck/grounds/gamifikasi-host.webp" },
  },
  live: {
    title: "Nobar yang juga tayang live di YouTube",
    lead: "Acara di Geromball Grounds disiarkan sebagai Live Reaction di YouTube Geromball, jadi penonton di rumah ikut menonton bareng penonton di venue. Angka di bawah dari sesi Live Reaction Geromball terakhir.",
    stats: [
      { value: "167 rb", label: "views" },
      { value: "7.537", label: "penonton bersamaan tertinggi" },
      { value: "3.552", label: "rata-rata penonton bersamaan" },
      { value: "20,2 rb", label: "jam tonton" },
    ],
    photo: { label: "Setup kamera dan streaming di Geromball Grounds" },
  },
  tbc: ["Materi brand Djarum Super untuk venue dan siaran live", "Judul dan jadwal tayang Live Reaction di YouTube"],
  contacts,
};


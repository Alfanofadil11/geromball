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
    lead: "Djarum Super hadir di tiga segmen acara yang membawa CTA Djarum Super, dan nobar juga tayang sebagai Live Reaction di YouTube Geromball.",
    points: [
      { name: "Gamifikasi", detail: "Games dan kuis membawa CTA Djarum Super." },
      { name: "Live Pojok Debat", detail: "Talent menyampaikan CTA Djarum Super sebelum kick off." },
      { name: "Half time", detail: "Live komentator menyampaikan CTA Djarum Super." },
      { name: "Live Reaction YouTube", detail: "Confirmed bisa berjalan bersamaan dengan nobar." },
    ],
    photo: { label: "Talent Geromball memandu games di depan penonton", src: "/deck/grounds/gamifikasi-host.webp" },
  },
  live: {
    title: "Nobar dan Live Reaction YouTube",
    badge: "Confirmed",
    lead: "Nobar di Geromball Grounds bisa berjalan bersamaan dengan Live Reaction di YouTube Geromball.",
  },
  tbc: ["Materi brand Djarum Super untuk venue dan siaran live"],
  contacts,
};


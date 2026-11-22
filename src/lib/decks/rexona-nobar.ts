import { caseStudy, contacts, rundown, venue } from "./shared";
import type { Deck } from "./types";

// Kick off 00.30 WIB on Sunday 13 Dec, so the gate opens and the event starts on Saturday night.
const match: Deck["match"] = { home: "Man City", away: "Chelsea", day: "Minggu", date: "13 Desember 2026", kickoff: "00.30 WIB", eventStart: "Sabtu 12 Des, 23.30 WIB", gateOpen: "Sabtu 12 Des, 20.30 WIB" };

export const rexonaNobar: Deck = {
  slug: "rexona-nobar",
  client: "Rexona",
  agency: "Geromball",
  // sha256("RXNB-GRMB-1213")
  codeSha256: "73799c09946127452889266cdef0d84e8720e98537673e903d657bedc55fbb76",
  clientColor: { fill: "#123a8c", onDark: "#8fb0ff" },
  match,
  cover: { line: "Nobar Rexona di Geromball Grounds", banner: "/proposal/geromball-hero.webp" },
  venue,
  caseStudy,
  rundown: rundown("Rexona", match),
  brand: {
    title: "Rexona di setiap sudut acara",
    lead: "Rexona hadir di venue dan di tiga segmen acara yang membawa CTA Rexona.",
    points: [
      { name: "Tiket masuk", detail: "Setiap penonton masuk dengan paket kopi dan 1 Rexona Men." },
      { name: "Poster dan booth", detail: "Materi Rexona dipasang di area venue." },
      { name: "Gamifikasi", detail: "Games dan kuis membawa CTA Rexona." },
      { name: "Live Pojok Debat", detail: "Talent menyampaikan CTA Rexona sebelum kick off." },
      { name: "Half time", detail: "Live komentator menyampaikan CTA Rexona." },
    ],
    photo: { label: "Gamifikasi saat soft opening, segmen yang akan membawa CTA Rexona", src: "/deck/grounds/gamifikasi-audiens.webp" },
  },
  ticket: {
    price: "Rp 25 rb",
    gets: ["1 kopi", "1 Rexona Men"],
    note: "Di soft opening, reservasi hanya mendapat kopi. Untuk nobar Rexona, tiket Rp 25 rb mendapat kopi dan 1 Rexona Men.",
  },
  tbc: ["Jumlah produk Rexona Men untuk penonton", "Materi poster dan booth dari tim Rexona"],
  contacts,
};


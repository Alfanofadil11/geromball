import type { Proposal } from "./types";

// Source: Notion "Rexona x Geromball Full Season" (Document Hub, last edited 3 Nov 2026).
// Every number below is from that page. Derived values (sums, counts) are computed in the page.
export const rexona: Proposal = {
  slug: "rexona",
  client: "Rexona",
  agency: "Geromball",
  title: "Rexona Big Match Series 2027",
  lede: "Rexona hadir di 13 pertandingan terbesar Januari sampai Juni 2027, dari Man United vs Liverpool sampai Final Liga Champions di Madrid.",
  prepared: "Disiapkan Geromball untuk Rexona, November 2026",
  source: "notion.so/3fe3e29f19f9811191f1cd1c9fadb7d3",
  // sha256("RXNA-GRMB-2027")
  codeSha256: "0392f059febf79b7651e1499091020686c620f95428d28e39f040dbd13cf3b1a",
  // Rexona navy. rexona.com blocked a plain fetch, so this shade is picked by eye; confirm with the brand guide.
  clientColor: { fill: "#123a8c", ink: "#123a8c", wash: "#e8eefb", onDark: "#8fb0ff" },

  ideas: [
    { big: "13", unit: "big match", line: "Setiap laga punya Live Reaction atau nobar bersama Rexona, dan laga pilihan juga punya video sebelum match dan review hari Senin." },
    { big: "1,65 jt", unit: "views", line: "Total guarantee views dari 27 video YouTube panjang. 41 shorts diperkirakan menambah 4,1 jt views di luar guarantee." },
    { big: "Rp 1,2 M", unit: "paket lengkap", line: "Harga spesial dari harga normal Rp 1,695 M, dengan eksklusivitas kategori deodoran." },
  ],

  matchday: [
    { when: "Pekan sebelum match", what: "Creative Video bersama Rexona", role: "Membangun hype menuju laga" },
    { when: "Hari H", what: "Live Reaction presented by Rexona, atau nobar di Geromball Grounds", role: "Menemani fans selama pertandingan" },
    { when: "Senin setelah match", what: "Pojok Debat Review bersama Rexona", role: "Membahas hasil pertandingan" },
  ],

  matches: [
    { name: "Man United vs Liverpool", date: "Sab, 23 Jan 2027", month: 1, why: "Rivalitas dengan basis fans terbesar di Indonesia", review: true, creative: "Guess The Fake Fan: 5 fans MU, 1 fans Liverpool" },
    { name: "Play-off Liga Champions", date: "23–24 Feb 2027", month: 2, why: "Tim besar yang tersandung bertarung untuk tiket 16 besar", review: true },
    { name: "16 Besar Liga Champions Leg 1", date: "9–10 Mar 2027", month: 3, why: "Fase gugur dimulai", creative: "Guess The Fake Fan: edisi 16 Besar" },
    { name: "16 Besar Liga Champions Leg 2", date: "16–17 Mar 2027", month: 3, why: "Penentuan delapan tim terbaik Eropa" },
    { name: "Man City vs Man United", date: "Sab, 20 Mar 2027", month: 3, why: "Manchester Derby", review: true, creative: "1v6: 1 fans City vs 6 fans United" },
    { name: "Perempat Final Liga Champions Leg 1", date: "6–7 Apr 2027", month: 4, why: "Delapan tim terbaik Eropa" },
    { name: "Perempat Final Liga Champions Leg 2", date: "13–14 Apr 2027", month: 4, why: "Penentuan tiket semifinal", review: true },
    { name: "Semifinal Liga Champions Leg 1", date: "27–28 Apr 2027", month: 4, why: "Empat tim tersisa" },
    { name: "Arsenal vs Tottenham", date: "Sab, 1 Mei 2027", month: 5, why: "North London Derby di ujung perebutan gelar", creative: "Guess The Fake Fan: 5 fans Arsenal, 1 fans Tottenham" },
    { name: "Semifinal Liga Champions Leg 2", date: "4–5 Mei 2027", month: 5, why: "Penentuan tiket final", nobar: true },
    { name: "El Clasico", date: "Min, 9 Mei 2027", month: 5, why: "Real Madrid vs Barcelona, bisa jadi penentu gelar La Liga", nobar: true, review: true, creative: "1v6: 1 fans Madrid vs 6 fans Barcelona" },
    { name: "Pekan terakhir Liga Inggris", date: "Min, 30 Mei 2027", month: 5, why: "Penentuan juara dan degradasi", review: true },
    { name: "Final Liga Champions", date: "Min, 6 Jun 2027, ±02.00 WIB", month: 6, why: "Laga terbesar musim ini, di Madrid", nobar: true, review: true, final: true, creative: "Dream Team: edisi Final" },
  ],
  matchNote: "Tanggal mengikuti jadwal resmi musim 2026/27 dan bisa bergeser karena jadwal siaran TV.",

  live: {
    stats: [
      { value: "167 rb", label: "views" },
      { value: "7.537", label: "penonton bersamaan tertinggi (peak CCU)" },
      { value: "3.552", label: "rata-rata penonton bersamaan" },
      { value: "20,2 rb", label: "jam tonton" },
    ],
    funnel: [
      { phase: "Sebelum match", items: ["1 IG Feed", "1 IG Story", "Pengumuman di Telegram (6.000 member)", "Pengumuman di YouTube Community"] },
      { phase: "Saat match", items: ["1 video highlight, diunggah ke IG Reels, TikTok dan YouTube Shorts"] },
      { phase: "Setelah match", items: ["Minimal 10 klip dari clipper komunitas Geromball"] },
    ],
  },

  podcast: {
    line: "Pojok Debat tayang 3 kali seminggu. Rexona hadir di 11 episode: 7 Review hari Senin setelah big match dan 4 episode reguler di pekan yang lebih sepi.",
    integration: [
      { name: "Digital asset", scope: "Aset visual Rexona di lingkungan episode" },
      { name: "Product placement", scope: "Produk di set sepanjang episode" },
      { name: "Adlib", scope: "Host menyebut Rexona, 3 × 30 detik per episode" },
      { name: "Midroll", scope: "Iklan Rexona 30 detik di tengah episode" },
      { name: "TVC in-frame", scope: "TVC Rexona tayang di dalam frame" },
      { name: "Squeeze frame", scope: "Layar mengecil dan iklan Rexona tampil di sampingnya, 2 kali per 30 menit" },
      { name: "Studio rebranding", scope: "Studio mengikuti identitas Rexona, talent memakai merchandise Rexona" },
    ],
  },

  creative: [
    { name: "Guess The Fake Fan", format: "Talent menebak fans asli di antara Geromboys, dan satu di antaranya fake fan.", proof: "Referensi format: versi bola dari SPORTbible mencapai 1,5 jt views" },
    { name: "1v6", format: "Satu fans dengan statement berani melawan enam fans lain.", proof: "Rata-rata 123 rb views dan ±1.000 komentar per episode, dari 3 episode" },
    { name: "Dream Team", format: "Talent menyusun tim terbaik dari pemain yang pernah bermain dengan satu pemain atau pelatih.", proof: "9 episode, 853 rb views, tertinggi 191 rb (CR7)" },
  ],

  shorts: {
    line: "Pesan utama Rexona dimasukkan ke tengah seri shorts Geromball yang sudah berjalan. Setiap shorts diunggah ke tiga platform.",
    creative: 20,
    highlight: 21,
    platforms: ["IG Reels", "TikTok", "YouTube Shorts"],
  },

  clippers: [
    { month: "Jul 2026", views: 35_800_000, clips: 662 },
    { month: "Agu 2026", views: 23_900_000, clips: 499 },
    { month: "Sep 2026", views: 25_900_000, clips: 674 },
  ],

  grounds: {
    place: "Selawaktu Cafe, Tebet, Jakarta Selatan",
    screen: "Layar 120 inci",
    capacity: "100–150 pengunjung per sesi",
    sessions: ["Semifinal Liga Champions Leg 2", "El Clasico", "Final Liga Champions"],
    rundown: ["Nobar big match", "Pojok Debat live di depan penonton", "Kuis dan Q&A bersama talent", "Roasting talent saat half time", "Poster, booth dan sampling produk Rexona di venue"],
  },

  builder: {
    items: [
      { id: "live", name: "Live Reaction", detail: "Siaran live YouTube saat big match bersama talent Geromball, Rexona sebagai title sponsor", unitPrice: 50_000_000, qty: 10, guaranteeViews: 50_000, longForm: true },
      { id: "pojok", name: "Pojok Debat", detail: "Podcast debat Geromball dengan full brand integration Rexona", unitPrice: 35_000_000, qty: 11, guaranteeViews: 50_000, longForm: true },
      { id: "creative", name: "Creative Video", detail: "Video YouTube sebelum match: 3 Guess The Fake Fan, 2 1v6, 1 Dream Team", unitPrice: 35_000_000, qty: 6, guaranteeViews: 100_000, longForm: true },
      { id: "nobar", name: "Nobar di Geromball Grounds", detail: "Semifinal Liga Champions Leg 2, El Clasico, Final Liga Champions", unitPrice: 65_000_000, qty: 3 },
      { id: "cshorts", name: "Creative Shorts", detail: "Shorts orisinal Geromball dengan pesan Rexona, diunggah ke 3 platform", unitPrice: 15_000_000, qty: 20, expectedViews: 100_000 },
      { id: "hshorts", name: "Highlight Shorts", detail: "Potongan dari setiap Pojok Debat dan Live Reaction, diunggah ke 3 platform", unitPrice: 5_000_000, qty: 21, expectedViews: 100_000 },
    ],
    specialPrice: 1_200_000_000,
    bonusFull: ["Title sponsor Live Reaction", "Eksklusivitas kategori deodoran selama kontrak"],
    clippersPerLongForm: 10,
  },

  proof: {
    numbers: [
      { value: "789 rb+", label: "followers dan subscribers (TikTok 453 rb, YouTube 240 rb, Instagram 96 rb)" },
      { value: "83–90%", label: "audiens berusia 18–34 tahun" },
      { value: "45+", label: "brand sudah bekerja sama dengan Geromball" },
    ],
    cases: [
      { brand: "by.U", format: "Tebak 10", views: 3_400_000 },
      { brand: "Durex", format: "Tebak Duel", views: 2_200_000 },
      { brand: "Stadeo × Bank BRI", format: "Combine Eleven", views: 1_700_000 },
      { brand: "Bromen", format: "TicTacToe", views: 1_500_000 },
      { brand: "EA FC", format: "TicTacToe", views: 903_100 },
      { brand: "JiWater", format: "TicTacToe", views: 670_000 },
    ],
    highlight: { brand: "Djarum Super × Podcast Geromball", line: "Podcast Geromball bersama Djarum Super mencapai 1,05 jt views dari 9 episode" },
  },

  contacts: [
    { name: "Alfano Fadil", role: "Senior Business Development", whatsapp: "6287700023151", email: "alfanofadil@geromball.com" },
    { name: "Abdullah", role: "Direktur Geromball" },
  ],

  tbc: {
    client: ["Laga play-off, 16 besar dan perempat final yang dipilih setelah undian"],
    agency: ["Kalender final, kami susun bersama Rexona setelah deal", "Penyesuaian konten kalau jadwal laga bergeser karena jadwal siaran TV", "Pembagian penyediaan produk sampling, booth dan poster di Geromball Grounds"],
  },

  images: {
    live: "/proposal/rexona/live.webp",
    studio: { src: "/proposal/rexona/studio.webp", note: "Contoh integrasi brand di studio Pojok Debat, bersama Djarum Super" },
    creative: { "1v6": "/proposal/rexona/1v6.webp", "Dream Team": "/proposal/rexona/dream-team.webp" },
    proof: { src: "/proposal/rexona/djarum.webp", alt: "Thumbnail 9 episode podcast Geromball bersama Djarum Super" },
    grounds: "/proposal/rexona/grounds.webp",
  },

  acceptEmail: "alfanofadil@geromball.com",

  nextSteps: [
    { who: "client", step: "Rexona memilih paket dan mengirim penerimaan dari halaman ini" },
    { who: "agency", step: "Geromball mengirim kontrak dan menyusun kalender bersama Rexona" },
    { who: "client", step: "Rexona memilih laga fase gugur setelah undian Liga Champions" },
  ],
};

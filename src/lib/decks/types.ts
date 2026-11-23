// A nobar deck: what a Geromball Grounds event looks like for a brand that already signed.
// No prices. Photos without `src` render as a labelled slot until Fadil sends them.

// `video` (mp4) plays muted on loop in place of the photo; `src` is its poster frame.
export type Photo = { label: string; src?: string; video?: string };

export type Deck = {
  slug: string;
  client: string;
  agency: string;
  codeSha256: string; // sha256 of the access code
  clientColor: { fill: string; onDark: string };
  // kickoff in WIB; the event starts 1 hour before, the gate opens 4 hours before.
  match: { home: string; away: string; day: string; date: string; kickoff: string; eventStart: string; gateOpen: string };
  cover: { line: string; banner: string };
  venue: {
    place: string;
    screen: string;
    capacity: string;
    facilities: string;
    zones: { id: string; kind: string; screen?: string; smoking: boolean }[];
    photos: Photo[];
  };
  caseStudy: { match: string; seats: number; lines: string[]; photos: Photo[] };
  rundown: { step: string; detail: string; time?: string; cta?: boolean }[];
  brand: { title: string; lead: string; points: { name: string; detail: string }[]; photo?: Photo };
  live?: { title: string; lead: string; badge?: string; stats?: { value: string; label: string }[]; photo?: Photo };
  ticket?: { price: string; gets: string[]; note: string; status?: string };
  tbc: string[];
  contacts: { name: string; role?: string; whatsapp?: string; email?: string }[];
};

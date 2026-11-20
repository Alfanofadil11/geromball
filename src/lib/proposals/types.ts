// One proposal website = one data file of this shape. The page (src/app/(proposal))
// only renders it; every number here must come from the source proposal (see `source`).

export type Reading = "blog" | "short" | "long";

export type Contact = {
  name: string;
  role?: string;
  whatsapp?: string; // digits only, with country code
  email?: string;
};

export type BuilderItem = {
  id: string;
  name: string;
  detail: string;
  unitPrice: number; // rupiah, the source's per-content price
  qty: number; // the source package quantity, also the maximum
  min?: number;
  guaranteeViews?: number; // per content, from the source's target table
  expectedViews?: number; // per content, labelled "expected", not a guarantee
  longForm?: boolean; // counts toward clippers (10 per long-form episode in the source)
};

export type Match = {
  name: string;
  date: string; // as the reader should read it
  month: number; // 1–6, for the timeline strip
  why: string;
  nobar?: boolean;
  review?: boolean; // Pojok Debat Monday review after this match
  creative?: string; // the creative video that warms up this match
  final?: boolean;
};

export type Proposal = {
  slug: string;
  client: string;
  agency: string;
  title: string;
  lede: string;
  prepared: string; // date line
  source: string; // where the numbers come from, for the team (not shown)
  codeSha256: string; // sha256 of the access code; the code itself is never stored
  clientColor: { fill: string; ink: string; wash: string; onDark: string };
  ideas: { big: string; unit: string; line: string }[]; // the 3 ideas
  matchday: { when: string; what: string; role: string }[];
  matches: Match[];
  matchNote: string;
  live: {
    stats: { value: string; label: string }[];
    funnel: { phase: string; items: string[] }[];
  };
  podcast: { line: string; integration: { name: string; scope: string }[] };
  creative: { name: string; format: string; proof: string }[];
  shorts: { line: string; creative: number; highlight: number; platforms: string[] };
  clippers: { month: string; views: number; clips: number }[];
  grounds: { place: string; screen: string; capacity: string; sessions: string[]; rundown: string[] };
  builder: {
    items: BuilderItem[];
    specialPrice: number; // only for the full source package
    bonusFull: string[]; // bonuses the source lists for the full package
    clippersPerLongForm: number;
  };
  proof: {
    numbers: { value: string; label: string }[];
    cases: { brand: string; format: string; views: number }[];
    highlight: { brand: string; line: string };
  };
  contacts: Contact[];
  tbc: { client: string[]; agency: string[] };
  acceptEmail: string;
  nextSteps: { who: "client" | "agency"; step: string }[];
};

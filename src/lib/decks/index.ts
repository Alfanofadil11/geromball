import { djarumNobar } from "./djarum-nobar";
import { rexonaNobar } from "./rexona-nobar";
import type { Deck } from "./types";

const DECKS: Record<string, Deck> = { [rexonaNobar.slug]: rexonaNobar, [djarumNobar.slug]: djarumNobar };

export function getDeck(slug: string): Deck | null {
  return DECKS[slug] ?? null;
}

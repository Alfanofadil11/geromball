import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getDeck } from "@/lib/decks";
import { accessCookie, hasAccess } from "@/lib/proposals/access";
import Gate from "../../proposal/[slug]/Gate";
import { unlockDeck } from "./actions";
import DeckView from "./DeckView";

type Props = { params: Promise<{ slug: string }> };

// The link preview stays one plain line, like the proposals.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getDeck((await params).slug);
  if (!d) return { title: "Deck" };
  const title = `${d.client} × ${d.agency}`;
  const description = `Nobar ${d.client} di Geromball Grounds.`;
  return { title, description, openGraph: { title, description, images: [] }, twitter: { card: "summary", title, description } };
}

export default async function DeckPage({ params }: Props) {
  const { slug } = await params;
  const d = getDeck(slug);
  if (!d) notFound();
  const open = hasAccess(slug, (await cookies()).get(accessCookie(slug))?.value);
  return open ? (
    <DeckView d={d} />
  ) : (
    <Gate client={d.client} agency={d.agency} title={`Nobar ${d.client} di Geromball Grounds`} button="Buka deck" unlock={unlockDeck.bind(null, slug)} />
  );
}

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { accessCookie, getProposal, hasAccess } from "@/lib/proposals/access";
import Gate from "./Gate";
import ProposalView from "./ProposalView";

type Props = { params: Promise<{ slug: string }> };

// Rule 18: the link preview is one plain line, no price, scope or counts.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProposal((await params).slug);
  if (!p) return { title: "Proposal" };
  const title = `${p.client} × ${p.agency}`;
  const description = `Proposal ${p.agency} untuk ${p.client}.`;
  return { title, description, openGraph: { title, description, images: [] }, twitter: { card: "summary", title, description } };
}

export default async function ProposalPage({ params }: Props) {
  const { slug } = await params;
  const p = getProposal(slug);
  if (!p) notFound();
  const open = hasAccess(slug, (await cookies()).get(accessCookie(slug))?.value);
  // The proposal data only reaches the browser after the code is accepted.
  return open ? <ProposalView p={p} /> : <Gate slug={slug} client={p.client} agency={p.agency} />;
}

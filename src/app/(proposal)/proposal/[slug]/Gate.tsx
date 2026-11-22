"use client";

import { useActionState } from "react";

type Unlock = (prev: string | null, form: FormData) => Promise<string | null>;

// Shared by proposals (/proposal/[slug]) and decks (/deck/[slug]); the page passes its bound unlock action.
export default function Gate({ client, agency, title, button = "Buka proposal", unlock }: { client: string; agency: string; title?: string; button?: string; unlock: Unlock }) {
  const [error, action, pending] = useActionState(unlock, null);
  return (
    <main className="gate">
      <div className="gate-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.png" alt={agency} className="gate-logo" />
        <p className="gate-co">
          {agency} <span>×</span> <b className="rx-text-dark">{client}</b>
        </p>
        <h1 className="display">{title ?? `Proposal untuk ${client}`}</h1>
        <form action={action} className="gate-form">
          <label htmlFor="code">Kode akses</label>
          <input id="code" name="code" autoComplete="off" autoCapitalize="characters" spellCheck={false} placeholder="XXXX-XXXX-XXXX" required autoFocus />
          {error && <p className="gate-err" role="alert">{error}</p>}
          <button className="btn btn-light" disabled={pending}>{pending ? "Memeriksa…" : button}</button>
        </form>
        <p className="gate-hint">Kode akses 12 karakter dikirim terpisah dari link ini.</p>
      </div>
    </main>
  );
}

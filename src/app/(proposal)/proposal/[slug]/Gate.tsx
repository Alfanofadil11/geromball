"use client";

import { useActionState } from "react";
import { unlock } from "./actions";

export default function Gate({ slug, client, agency }: { slug: string; client: string; agency: string }) {
  const [error, action, pending] = useActionState(unlock.bind(null, slug), null);
  return (
    <main className="gate">
      <div className="gate-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.png" alt={agency} className="gate-logo" />
        <p className="gate-co">
          {agency} <span>×</span> <b className="rx-text-dark">{client}</b>
        </p>
        <h1 className="display">Proposal untuk {client}</h1>
        <form action={action} className="gate-form">
          <label htmlFor="code">Kode akses</label>
          <input id="code" name="code" autoComplete="off" autoCapitalize="characters" spellCheck={false} placeholder="XXXX-XXXX-XXXX" required autoFocus />
          {error && <p className="gate-err" role="alert">{error}</p>}
          <button className="btn btn-light" disabled={pending}>{pending ? "Memeriksa…" : "Buka proposal"}</button>
        </form>
        <p className="gate-hint">Kode akses 12 karakter dikirim terpisah dari link ini.</p>
      </div>
    </main>
  );
}

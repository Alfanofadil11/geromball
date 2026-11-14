"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="mt-6 space-y-3">
      <label className="block text-sm text-ink-soft">
        Password
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="mt-1.5 w-full rounded-full border border-line bg-subtle px-4 py-2.5 text-ink outline-none focus:border-ink/40"
        />
      </label>
      {error && <p className="text-sm text-bad">{error}</p>}
      <button disabled={pending} className="w-full rounded-full bg-invert px-3 py-2.5 font-medium text-on-invert disabled:opacity-50">
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}

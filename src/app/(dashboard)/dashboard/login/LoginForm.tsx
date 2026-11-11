"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="mt-6 space-y-3">
      <label className="block text-sm">
        Password
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="mt-1 w-full rounded-md border border-card-border bg-background px-3 py-2 outline-none focus:border-white/40"
        />
      </label>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button disabled={pending} className="w-full rounded-md bg-white px-3 py-2 font-medium text-black disabled:opacity-50">
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}

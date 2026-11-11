import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-card-border bg-card p-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-wide">Dashboard Geromball</h1>
        <p className="mt-1 text-sm text-muted">Analytics konten YouTube. Khusus tim internal.</p>
        <LoginForm />
      </div>
    </div>
  );
}

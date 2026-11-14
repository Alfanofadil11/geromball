import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm rounded-[32px] bg-surface p-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.png" alt="Geromball" className="h-16 w-16 rounded-full bg-white object-contain p-1" />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Dashboard Geromball</h1>
        <p className="mt-1 text-sm text-faint">Analytics konten YouTube. Khusus tim internal.</p>
        <LoginForm />
      </div>
    </div>
  );
}

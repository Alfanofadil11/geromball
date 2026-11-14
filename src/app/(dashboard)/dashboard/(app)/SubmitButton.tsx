"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingText,
  className,
  title,
}: {
  children: React.ReactNode;
  pendingText?: React.ReactNode;
  className?: string;
  title?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} title={title} aria-label={title} className={`${className ?? ""} disabled:opacity-50`}>
      {pending ? (pendingText ?? "Menyimpan…") : children}
    </button>
  );
}

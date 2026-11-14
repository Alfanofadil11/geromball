"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconGrid, IconMoon, IconSliders, IconSun, IconTag } from "./icons";

const ITEMS = [
  { href: "/dashboard", label: "Ringkasan", Icon: IconGrid },
  { href: "/dashboard/tagging", label: "Tagging", Icon: IconTag },
  { href: "/dashboard/kelola", label: "Kelola", Icon: IconSliders },
];

function isActive(path: string, href: string) {
  return href === "/dashboard" ? path === href || path.startsWith("/dashboard/ip") : path.startsWith(href);
}

/** The pill tabs in the top bar. */
export function TopNav() {
  const path = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto rounded-full bg-surface p-1.5 text-sm">
      {ITEMS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`whitespace-nowrap rounded-full px-4 py-2 transition-colors ${
            isActive(path, href) ? "bg-invert text-on-invert" : "text-ink-soft hover:bg-subtle hover:text-ink"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

/** The icon rail on the left. */
export function SideNav() {
  const path = usePathname();
  return (
    <nav className="flex flex-col items-center gap-2 rounded-full bg-surface p-1.5">
      {ITEMS.map(({ href, label, Icon }) => (
        <Link
          key={href}
          href={href}
          title={label}
          aria-label={label}
          className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
            isActive(path, href) ? "bg-invert text-on-invert" : "text-ink-soft hover:bg-subtle hover:text-ink"
          }`}
        >
          <Icon />
        </Link>
      ))}
    </nav>
  );
}

/** Light/dark switch; remembered in a cookie so the server renders the right theme next time. */
export function ThemeToggle() {
  const set = (theme: "light" | "dark") => {
    document.documentElement.dataset.theme = theme;
    document.cookie = `gb_theme=${theme}; path=/; max-age=31536000; samesite=lax`;
  };
  const btn = "grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-subtle hover:text-ink";
  return (
    <div className="flex flex-col items-center gap-2 rounded-full bg-surface p-1.5">
      <button type="button" onClick={() => set("light")} title="Mode terang" aria-label="Mode terang" className={`${btn} in-data-[theme=light]:bg-invert in-data-[theme=light]:text-on-invert`}>
        <IconSun />
      </button>
      <button type="button" onClick={() => set("dark")} title="Mode gelap" aria-label="Mode gelap" className={`${btn} in-data-[theme=dark]:bg-invert in-data-[theme=dark]:text-on-invert`}>
        <IconMoon />
      </button>
    </div>
  );
}

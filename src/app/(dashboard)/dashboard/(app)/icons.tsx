// Small stroke icons (24px grid, currentColor), so the dashboard needs no icon package.
type P = { className?: string };
const base = (className = "h-5 w-5") => ({
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const IconGrid = ({ className }: P) => (
  <svg {...base(className)}><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /></svg>
);
export const IconTag = ({ className }: P) => (
  <svg {...base(className)}><path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-6.2 6.2a1.5 1.5 0 0 1-2.1 0Z" /><circle cx="8" cy="8" r="1.3" /></svg>
);
export const IconSliders = ({ className }: P) => (
  <svg {...base(className)}><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg>
);
export const IconSun = ({ className }: P) => (
  <svg {...base(className)}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" /></svg>
);
export const IconMoon = ({ className }: P) => (
  <svg {...base(className)}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
);
export const IconRefresh = ({ className }: P) => (
  <svg {...base(className)}><path d="M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16M20 20v-4h-4" /></svg>
);
export const IconLogout = ({ className }: P) => (
  <svg {...base(className)}><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l-4-4 4-4M6 12h10" /></svg>
);
export const IconSearch = ({ className }: P) => (
  <svg {...base(className)}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
);
export const IconArrowUp = ({ className = "h-3 w-3" }: P) => (
  <svg {...base(className)} strokeWidth={2.4}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
);
export const IconArrowDown = ({ className = "h-3 w-3" }: P) => (
  <svg {...base(className)} strokeWidth={2.4}><path d="M12 5v14M6 13l6 6 6-6" /></svg>
);
export const IconPlus = ({ className = "h-4 w-4" }: P) => (
  <svg {...base(className)}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconFilm = ({ className }: P) => (
  <svg {...base(className)}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m10 9.5 4.5 2.5-4.5 2.5Z" /></svg>
);
export const IconPhone = ({ className }: P) => (
  <svg {...base(className)}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>
);
export const IconLive = ({ className }: P) => (
  <svg {...base(className)}><circle cx="12" cy="12" r="2" /><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" /></svg>
);
export const IconTrophy = ({ className }: P) => (
  <svg {...base(className)}><path d="M8 4h8v5a4 4 0 0 1-8 0ZM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4" /></svg>
);
export const IconEye = ({ className }: P) => (
  <svg {...base(className)}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const IconUpload = ({ className }: P) => (
  <svg {...base(className)}><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></svg>
);
export const IconLeaf = ({ className }: P) => (
  <svg {...base(className)}><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15M5 19l7-7" /></svg>
);
export const IconBolt = ({ className }: P) => (
  <svg {...base(className)}><path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12Z" /></svg>
);
export const IconChevronLeft = ({ className = "h-4 w-4" }: P) => (
  <svg {...base(className)}><path d="m15 6-6 6 6 6" /></svg>
);

const nf = (max: number) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: max });

/** Rp 1,2 M · Rp 50 jt · Rp 500 rb */
export function rp(n: number): string {
  if (n >= 1e9) return `Rp ${nf(3).format(n / 1e9)} M`;
  if (n >= 1e6) return `Rp ${nf(1).format(n / 1e6)} jt`;
  if (n >= 1e3) return `Rp ${nf(0).format(n / 1e3)} rb`;
  return `Rp ${nf(0).format(n)}`;
}

/** Full rupiah for the email and the summary: Rp1.200.000.000 */
export const rpFull = (n: number) => `Rp${nf(0).format(n)}`;

/** 1,65 jt · 903 rb */
export function views(n: number): string {
  if (n >= 1e6) return `${nf(2).format(n / 1e6)} jt`;
  if (n >= 1e3) return `${nf(1).format(n / 1e3)} rb`;
  return nf(0).format(n);
}

export const num = (n: number) => nf(0).format(n);

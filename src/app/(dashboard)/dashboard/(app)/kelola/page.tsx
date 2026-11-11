import type { Metadata } from "next";
import { requireSession } from "@/lib/dashboard/auth";
import { lookups } from "@/lib/dashboard/db";
import { addFormat, addIp, addTalent, updateFormat, updateIp, updateTalent } from "../../actions";
import SubmitButton from "../SubmitButton";
import { Card } from "../ui";

export const metadata: Metadata = { title: "Kelola" };
export const dynamic = "force-dynamic";

const input = "rounded-md border border-card-border bg-background px-2 py-1.5 text-sm";

export default async function Kelola() {
  await requireSession();
  const { ips, formats, talents } = await lookups();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Kelola IP, talent &amp; format</h1>
        <p className="text-sm text-muted">
          Kata kunci dipakai untuk menebak tag otomatis setiap sync (pisahkan dengan koma). Playlist ID: video di playlist itu otomatis disarankan masuk IP-nya.
        </p>
      </div>

      <Card title="IP">
        <div className="space-y-2">
          {ips.map((ip) => (
            <form key={ip.id} action={updateIp} className="flex flex-wrap items-center gap-2">
              <input type="hidden" name="id" value={ip.id} />
              <span className="w-40 font-medium">{ip.name}</span>
              <input name="keywords" defaultValue={ip.title_keywords.join(", ")} placeholder="kata kunci judul" className={`${input} min-w-0 flex-1`} />
              <input name="playlist_id" defaultValue={ip.playlist_id ?? ""} placeholder="Playlist ID (opsional)" className={`${input} w-64`} />
              <label className="flex items-center gap-1 text-sm text-white/70">
                <input type="checkbox" name="active" defaultChecked={ip.active} /> Aktif
              </label>
              <SubmitButton className="rounded-md border border-card-border px-3 py-1.5 text-sm hover:bg-white/5">Simpan</SubmitButton>
            </form>
          ))}
        </div>
        <form action={addIp} className="mt-4 flex flex-wrap items-center gap-2 border-t border-card-border pt-4">
          <input name="name" required placeholder="Nama IP baru" className={`${input} w-40`} />
          <input name="keywords" placeholder="kata kunci judul" className={`${input} min-w-0 flex-1`} />
          <input name="playlist_id" placeholder="Playlist ID (opsional)" className={`${input} w-64`} />
          <SubmitButton className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-black">Tambah IP</SubmitButton>
        </form>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Talent">
          <div className="space-y-2">
            {talents.map((t) => (
              <form key={t.id} action={updateTalent} className="flex items-center gap-2">
                <input type="hidden" name="id" value={t.id} />
                <span className="w-32 text-sm font-medium">{t.name}</span>
                <input name="keywords" defaultValue={(t.title_keywords ?? []).join(", ")} placeholder="nama panggilan lain" className={`${input} min-w-0 flex-1`} />
                <SubmitButton className="rounded-md border border-card-border px-3 py-1.5 text-sm hover:bg-white/5">Simpan</SubmitButton>
              </form>
            ))}
          </div>
          <form action={addTalent} className="mt-4 flex items-center gap-2 border-t border-card-border pt-4">
            <input name="name" required placeholder="Nama talent" className={`${input} w-32`} />
            <input name="keywords" placeholder="nama panggilan lain" className={`${input} min-w-0 flex-1`} />
            <SubmitButton className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-black">Tambah</SubmitButton>
          </form>
        </Card>

        <Card title="Format">
          <p className="mb-3 text-xs text-muted">Urutan kecil menang kalau judul cocok ke beberapa format (mis. &ldquo;CHALLENGE: Bangun Tim&rdquo; → Challenge).</p>
          <div className="space-y-2">
            {formats.map((f) => (
              <form key={f.id} action={updateFormat} className="flex items-center gap-2">
                <input type="hidden" name="id" value={f.id} />
                <span className="w-32 text-sm font-medium">{f.name}</span>
                <input name="keywords" defaultValue={(f.title_keywords ?? []).join(", ")} placeholder="kata kunci judul" className={`${input} min-w-0 flex-1`} />
                <input name="priority" type="number" defaultValue={f.priority ?? 100} aria-label="Urutan" className={`${input} w-16`} />
                <SubmitButton className="rounded-md border border-card-border px-3 py-1.5 text-sm hover:bg-white/5">Simpan</SubmitButton>
              </form>
            ))}
          </div>
          <form action={addFormat} className="mt-4 flex items-center gap-2 border-t border-card-border pt-4">
            <input name="name" required placeholder="Nama format" className={`${input} w-32`} />
            <input name="keywords" placeholder="kata kunci judul" className={`${input} min-w-0 flex-1`} />
            <SubmitButton className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-black">Tambah</SubmitButton>
          </form>
        </Card>
      </div>
    </div>
  );
}

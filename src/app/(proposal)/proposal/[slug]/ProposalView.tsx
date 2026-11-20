"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { Proposal, Reading } from "@/lib/proposals/types";
import { lock } from "./actions";
import { num, rp, rpFull, views } from "./format";

// Which sections each reading shows, in order (playbook section 5).
const ORDER: Record<Reading, string[]> = {
  // The price always comes last: the builder is the final section of every reading.
  short: ["ideas", "matchday", "how", "proof", "next", "builder"],
  long: ["ideas", "matchday", "live", "pojok", "creative", "shorts", "timeline", "grounds", "proof", "next", "builder"],
  blog: ["ideas", "matchday", "live", "pojok", "creative", "shorts", "timeline", "grounds", "proof", "next", "builder"],
};
const LABEL: Record<Reading, string> = { blog: "Blog", short: "Short", long: "Long" };
const WPM = 238;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];

type Qty = Record<string, number>;

function derive(p: Proposal, qty: Qty) {
  const lines = p.builder.items.map((it) => ({ ...it, n: qty[it.id] ?? 0, total: (qty[it.id] ?? 0) * it.unitPrice }));
  const normal = lines.reduce((s, l) => s + l.total, 0);
  const fullNormal = p.builder.items.reduce((s, it) => s + it.qty * it.unitPrice, 0);
  const full = lines.every((l) => l.n === l.qty);
  const guarantee = lines.reduce((s, l) => s + l.n * (l.guaranteeViews ?? 0), 0);
  const expected = lines.reduce((s, l) => s + l.n * (l.expectedViews ?? 0), 0);
  const longForm = lines.filter((l) => l.longForm).reduce((s, l) => s + l.n, 0);
  const shorts = lines.filter((l) => l.expectedViews).reduce((s, l) => s + l.n, 0);
  return {
    lines,
    normal,
    fullNormal,
    full,
    price: full ? p.builder.specialPrice : normal,
    guarantee,
    expected,
    shorts,
    longForm,
    clippers: longForm * p.builder.clippersPerLongForm,
    empty: normal === 0,
  };
}

function useReveal(dep: unknown) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }),
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [dep]);
}

export default function ProposalView({ p }: { p: Proposal }) {
  const [mode, setMode] = useState<Reading | null>(null);
  const [qty, setQty] = useState<Qty>(() => Object.fromEntries(p.builder.items.map((i) => [i.id, i.qty])));
  const [minutes, setMinutes] = useState<Record<Reading, number> | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLDialogElement>(null);
  const d = useMemo(() => derive(p, qty), [p, qty]);

  useReveal(mode);

  // remember the last reading for this tab only
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem(`pp_mode_${p.slug}`);
    } catch {}
    if (!saved || !(saved in ORDER)) return;
    const id = requestAnimationFrame(() => setMode((m) => m ?? (saved as Reading)));
    return () => cancelAnimationFrame(id);
  }, [p.slug]);

  // read times from the real word count of each reading
  useEffect(() => {
    const root = articleRef.current;
    if (!root) return;
    const count = (m: Reading) =>
      ORDER[m].reduce((s, id) => {
        const el = root.querySelector<HTMLElement>(`[data-sec="${id}"]`);
        return s + (el?.textContent ?? "").split(/\s+/).filter(Boolean).length;
      }, 0);
    const mins = (m: Reading) => Math.max(1, Math.round(count(m) / WPM));
    const id = requestAnimationFrame(() => setMinutes({ blog: mins("blog"), short: mins("short"), long: mins("long") }));
    return () => cancelAnimationFrame(id);
  }, []);

  const choose = useCallback(
    (m: Reading) => {
      const y = window.scrollY;
      setMode(m);
      try {
        sessionStorage.setItem(`pp_mode_${p.slug}`, m);
      } catch {}
      if (y < 40) window.scrollTo({ top: 0 });
    },
    [p.slug],
  );

  const set = (id: string, n: number) => setQty((q) => ({ ...q, [id]: n }));
  const shown = (id: string) => mode !== null && ORDER[mode].includes(id);
  const cssVars = { "--rx": p.clientColor.fill, "--rx-ink": p.clientColor.ink, "--rx-wash": p.clientColor.wash, "--rx-dark": p.clientColor.onDark } as CSSProperties;

  return (
    <div className={`shell ${mode ? `mode-${mode}` : "mode-none"}`} style={cssVars}>
      {mode === null && <Chooser p={p} minutes={minutes} onPick={choose} />}

      <header className="bar" hidden={mode === null}>
        <span className="bar-co">
          {p.agency} <i>×</i> <b className="rx-text-dark">{p.client}</b>
        </span>
        <div className="seg" role="tablist" aria-label="Versi bacaan">
          {(["blog", "short", "long"] as Reading[]).map((m) => (
            <button key={m} role="tab" aria-selected={mode === m} className={mode === m ? "on" : ""} onClick={() => choose(m)}>
              {LABEL[m]}
            </button>
          ))}
        </div>
        <form action={lock.bind(null, p.slug)}>
          <button className="bar-lock" aria-label="Kunci proposal" title="Kunci proposal">
            <LockIcon />
          </button>
        </form>
      </header>

      <div ref={articleRef} className="article" hidden={mode === null} aria-hidden={mode === null}>
        {/* ---------- cover + the 3 ideas ---------- */}
        <section
          data-sec="ideas"
          className="sec cover"
          hidden={mode !== null && !shown("ideas")}
        >
          <div className="wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-banner"
              src="/proposal/geromball-hero.webp"
              alt="Talent Geromball. The fastest growing sports media: TikTok 449K, YouTube 244K, Instagram 97K dalam 3 tahun"
              width={981}
              height={640}
            />
            <p className="kick">{p.prepared}</p>
            <h1 className="display cover-title">
              {p.client} <i>Big Match</i> Series 2027
            </h1>
            <p className="lede">{p.lede}</p>
            <p className="byline only-blog">
              Oleh {p.contacts.map((c) => c.name).join(" dan ")}
              {minutes && <> · {minutes.blog} menit baca</>}
            </p>
            <ol className="ideas" data-reveal>
              {p.ideas.map((it, i) => (
                <li key={i} style={{ "--t": `${i * 120}ms` } as CSSProperties}>
                  <b className="display">{it.big}</b>
                  <span className="unit">{it.unit}</span>
                  <p>{it.line}</p>
                </li>
              ))}
            </ol>
            <a className="btn btn-go" href="#matchday">
              Lihat programnya
            </a>
          </div>
        </section>

        {/* ---------- 01 Rexona Matchday ---------- */}
        <section data-sec="matchday" id="matchday" className="sec" hidden={!shown("matchday")}>
          <div className="wrap">
            <h2 className="display">
              Cara Rexona hadir <i>di setiap big match</i>
            </h2>
            <figure className="fig" data-reveal>
              <ol className="loop">
                {p.matchday.map((m, i) => (
                  <li key={i} style={{ "--t": `${i * 160}ms` } as CSSProperties}>
                    <span className="loop-when">{m.when}</span>
                    <b>{m.what}</b>
                    <span className="loop-role">{m.role}</span>
                  </li>
                ))}
              </ol>
              <figcaption className="say">Ketiga momen ini berlaku untuk laga pilihan. Semua 13 laga punya Live Reaction atau nobar.</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Short only: the five programmes in one look ---------- */}
        <section data-sec="how" className="sec sec-grey" hidden={!shown("how")}>
          <div className="wrap">
            <h2 className="display">
              Isi <i>paketnya</i>
            </h2>
            <figure className="fig" data-reveal>
              <ul className="pkg">
                {p.builder.items.map((it, i) => (
                  <li key={it.id} style={{ "--t": `${i * 90}ms` } as CSSProperties}>
                    <b className="display">{it.qty}×</b>
                    <span>{it.name}</span>
                  </li>
                ))}
              </ul>
              <figcaption className="say">
                Rexona tampil di {d.longForm} video YouTube panjang dan {d.shorts} shorts dari Januari sampai Juni 2027.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Live Reaction ---------- */}
        <section data-sec="live" className="sec sec-white" hidden={!shown("live")}>
          <div className="wrap">
            <h2 className="display">
              <i>Live</i> Reaction
            </h2>
            <figure className="fig" data-reveal>
              {p.images?.live && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="photo" src={p.images.live} alt="Siaran Live Reaction Geromball saat PSG vs Arsenal" loading="lazy" />
              )}
              <div className="stats">
                {p.live.stats.map((s, i) => (
                  <div key={i} className="stat" style={{ "--t": `${i * 100}ms` } as CSSProperties}>
                    <b className="display">{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <figcaption className="say">Live Reaction adalah siaran live YouTube saat big match, ditonton bareng talent Geromball. Angka di atas dari sesi terakhir, dan Rexona jadi title sponsor di 10 sesi.</figcaption>
            </figure>
            <figure className="fig only-long-blog" data-reveal>
              <div className="funnel">
                {p.live.funnel.map((f, i) => (
                  <div key={i} className="funnel-col" style={{ "--t": `${i * 140}ms` } as CSSProperties}>
                    <span className="funnel-phase">{f.phase}</span>
                    <ul>
                      {f.items.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <figcaption className="say">Konten turunan dari setiap sesi tetap tayang setelah live selesai, jadi Rexona terlihat lebih lama dari durasi pertandingannya.</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Pojok Debat ---------- */}
        <section data-sec="pojok" className="sec" hidden={!shown("pojok")}>
          <div className="wrap">
            <h2 className="display">
              Pojok <i>Debat</i>
            </h2>
            <p className="body">{p.podcast.line}</p>
            <figure className="fig" data-reveal>
              <div className="studio">
                {p.images?.studio ? (
                  <div className="studio-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="photo" src={p.images.studio.src} alt={p.images.studio.note} loading="lazy" />
                    <span>{p.images.studio.note}</span>
                  </div>
                ) : (
                  <div className="studio-frame">
                    <span className="studio-live">REXONA · POJOK DEBAT</span>
                    <div className="studio-seats" aria-hidden>
                      {[0, 1, 2, 3].map((i) => (
                        <span key={i} />
                      ))}
                    </div>
                    <span className="studio-squeeze">Squeeze frame Rexona</span>
                  </div>
                )}
                <ul className="tiles">
                  {p.podcast.integration.map((x, i) => (
                    <li key={x.name} style={{ "--t": `${i * 70}ms` } as CSSProperties}>
                      <b>{x.name}</b>
                      <span>{x.scope}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <figcaption className="say">Setiap episode membawa tujuh titik integrasi Rexona, dari adlib sampai studio yang didandani identitas Rexona.</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Creative Videos ---------- */}
        <section data-sec="creative" className="sec sec-grey" hidden={!shown("creative")}>
          <div className="wrap">
            <h2 className="display">
              <i>Creative</i> Video sebelum match
            </h2>
            <figure className="fig" data-reveal>
              <div className="formats">
                {p.creative.map((c, i) => (
                  <article key={c.name} className="format" style={{ "--t": `${i * 120}ms` } as CSSProperties}>
                    {p.images?.creative?.[c.name] ? (
                      <div className="thumb thumb-img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.images.creative[c.name]} alt={`Contoh episode ${c.name} Geromball`} loading="lazy" />
                        <span className="display">{c.name}</span>
                      </div>
                    ) : (
                      <div className="thumb" aria-hidden>
                        <span className="display">{c.name}</span>
                      </div>
                    )}
                    <p>{c.format}</p>
                    <p className="proof-line">{c.proof}</p>
                  </article>
                ))}
              </div>
              <figcaption className="say">Enam video YouTube, satu untuk setiap big match pilihan, dengan target 100 rb views per video.</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Shorts + clippers ---------- */}
        <section data-sec="shorts" className="sec" hidden={!shown("shorts")}>
          <div className="wrap">
            <h2 className="display">
              Shorts dan <i>clippers</i>
            </h2>
            <p className="body">{p.shorts.line}</p>
            <figure className="fig" data-reveal>
              <div className="mirror">
                <div className="phone" aria-hidden>
                  <div className="phone-screen">
                    <span className="phone-tag">REXONA</span>
                    <span className="phone-cap">Highlight Pojok Debat</span>
                  </div>
                </div>
                <div className="mirror-to">
                  {p.shorts.platforms.map((pl) => (
                    <span key={pl} className="chip">
                      {pl}
                    </span>
                  ))}
                  <p>
                    <b>{p.shorts.creative}</b> Creative Shorts dan <b>{p.shorts.highlight}</b> Highlight Shorts, jadi{" "}
                    <b>{(p.shorts.creative + p.shorts.highlight) * p.shorts.platforms.length}</b> video di tiga platform.
                  </p>
                </div>
              </div>
              <figcaption className="say">Highlight diambil dari setiap Pojok Debat dan Live Reaction untuk menarik penonton ke video penuhnya.</figcaption>
            </figure>
            <figure className="fig" data-reveal>
              <Bars rows={p.clippers.map((c) => ({ label: c.month, value: c.views, note: `${num(c.clips)} klip` }))} />
              <figcaption className="say">
                Clipper adalah komunitas yang mengunggah ulang potongan konten Geromball. Mereka menghasilkan {views(p.clippers.reduce((s, c) => s + c.views, 0))} views dari{" "}
                {num(p.clippers.reduce((s, c) => s + c.clips, 0))} klip dalam 3 bulan. Paket lengkap membawa {p.builder.clippersPerLongForm} klip clipper untuk setiap video YouTube panjang sebagai bonus, di luar guarantee views.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Timeline ---------- */}
        <section data-sec="timeline" className="sec sec-grey" hidden={!shown("timeline")}>
          <div className="wrap wrap-wide">
            <h2 className="display">
              13 big match, <i>Januari sampai Juni 2027</i>
            </h2>
            <figure className="fig" data-reveal>
              <div className="months">
                {MONTHS.map((m, mi) => (
                  <div key={m} className="month">
                    <span className="month-name display">{m}</span>
                    {p.matches
                      .filter((x) => x.month === mi + 1)
                      .map((x) => (
                        <div key={x.name} className={`match ${x.nobar ? "is-nobar" : ""} ${x.final ? "is-final" : ""}`}>
                          <span className="match-stub">{x.date}</span>
                          <span className="match-body">
                            <span className="match-type">{x.nobar ? "Nobar offline" : "Live Reaction"}</span>
                            <b>{x.name}</b>
                            {x.creative && <span className="match-add">+ Creative Video sebelumnya</span>}
                            {x.review && <span className="match-add">+ Pojok Debat Review hari Senin</span>}
                          </span>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
              <figcaption className="say">Mei punya empat big match, dan tiga di antaranya jatuh antara 1 dan 9 Mei. {p.matchNote}</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Geromball Grounds ---------- */}
        <section data-sec="grounds" className="sec" hidden={!shown("grounds")}>
          <div className="wrap">
            <h2 className="display">
              Nobar di <i>Geromball Grounds</i>
            </h2>
            <figure className="fig" data-reveal>
              <div className="venue">
                <div className="venue-screen" style={p.images?.grounds ? ({ "--bg": `url(${p.images.grounds})` } as CSSProperties) : undefined}>
                  <span className="display">{p.grounds.screen}</span>
                  <span>{p.grounds.capacity}</span>
                </div>
                <div className="venue-info">
                  <p className="venue-place">{p.grounds.place}</p>
                  <ul className="venue-sessions">
                    {p.grounds.sessions.map((s) => (
                      <li key={s} className="rx-chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <ul className="venue-run">
                    {p.grounds.rundown.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <figcaption className="say">Tiga laga terbesar ditonton bersama komunitas Geromball, dengan full brand integration Rexona di venue.</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Proof ---------- */}
        <section data-sec="proof" className="sec sec-white" hidden={!shown("proof")}>
          <div className="wrap">
            <h2 className="display">
              Hasil Geromball <i>bersama brand lain</i>
            </h2>
            <figure className="fig" data-reveal>
              <div className="stats stats-3">
                {p.proof.numbers.map((s, i) => (
                  <div key={i} className="stat" style={{ "--t": `${i * 100}ms` } as CSSProperties}>
                    <b className="display">{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </figure>
            <figure className="fig" data-reveal>
              {p.proof && p.images?.proof && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="photo photo-proof" src={p.images.proof.src} alt={p.images.proof.alt} loading="lazy" />
              )}
              <Bars dark rows={p.proof.cases.map((c) => ({ label: c.brand, value: c.views, note: c.format }))} />
              <figcaption className="say">
                Views TikTok dari shorts Geromball untuk brand lain. {p.proof.highlight.line}.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Next step + accept ---------- */}
        <section data-sec="next" className="sec" hidden={!shown("next")}>
          <div className="wrap">
            <h2 className="display">
              Langkah <i>berikutnya</i>
            </h2>
            <figure className="fig" data-reveal>
              <ol className="steps">
                {p.nextSteps.map((s, i) => (
                  <li key={i} className={s.who === "client" ? "is-client" : ""}>
                    <span className="steps-who">{s.who === "client" ? p.client : p.agency}</span>
                    {s.step}
                  </li>
                ))}
              </ol>
            </figure>
            <div className="tbc">
              <h3>Masih perlu dikonfirmasi</h3>
              <div className="tbc-cols">
                <div>
                  <span className="tbc-who rx-text">Menunggu tim {p.client}</span>
                  <ul>
                    {p.tbc.client.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="tbc-who">Menunggu {p.agency}</span>
                  <ul>
                    {p.tbc.agency.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <ul className="contacts">
              {p.contacts.map((c) => (
                <li key={c.name}>
                  <span className="avatar" aria-hidden>
                    {c.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <b>{c.name}</b>
                    {c.role && <span>{c.role}</span>}
                    {c.whatsapp && (
                      <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer">
                        WhatsApp +{c.whatsapp.replace(/^(\d{2})(\d{3})(\d{4})(\d+)$/, "$1 $2-$3-$4")}
                      </a>
                    )}
                    {c.email && <a href={`mailto:${c.email}`}>{c.email}</a>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Builder: always the last section, so the price comes last ---------- */}
        <section data-sec="builder" id="builder" className="sec sec-grey" hidden={!shown("builder")}>
          <div className="wrap wrap-wide">
            <h2 className="display">
              Susun paket <i>{p.client}</i>
            </h2>
            <p className="body">Kalau Rexona mau mengubah jumlah konten, atur di sini. Harga satuan adalah harga normal dari proposal.</p>
            <div className="builder" data-mv="builder">
              <ul className="b-items">
                {d.lines.map((l) => (
                  <li key={l.id} className={`b-item ${l.n === 0 ? "is-off" : ""}`}>
                    <div className="b-txt">
                      <b>{l.name}</b>
                      <span>{l.detail}</span>
                      <span className="b-unit">{rp(l.unitPrice)} per konten</span>
                    </div>
                    <div className="stepper" aria-label={`Jumlah ${l.name}`}>
                      <button type="button" onClick={() => set(l.id, Math.max(l.min ?? 0, l.n - 1))} disabled={l.n <= (l.min ?? 0)} aria-label="Kurangi">
                        −
                      </button>
                      <output aria-live="polite">{l.n}</output>
                      <button type="button" onClick={() => set(l.id, Math.min(l.qty, l.n + 1))} disabled={l.n >= l.qty} aria-label="Tambah">
                        +
                      </button>
                    </div>
                    <span className="b-line">{rp(l.total)}</span>
                  </li>
                ))}
              </ul>
              <aside className="b-sum" aria-live="polite">
                <span className="b-sum-k">{d.full ? "Harga spesial paket lengkap" : "Harga normal pilihan ini"}</span>
                <b className="display b-price">{rp(d.price)}</b>
                {d.full ? (
                  <span className="b-was">
                    Harga normal <s>{rp(d.fullNormal)}</s>
                  </span>
                ) : (
                  <span className="b-was">Harga spesial Rp 1,2 M berlaku untuk paket lengkap. Untuk paket custom, kami kirim harga spesialnya setelah Rexona mengirim pilihan ini.</span>
                )}
                <dl className="b-kpi">
                  <div>
                    <dt>Guarantee views video panjang</dt>
                    <dd>{views(d.guarantee)}</dd>
                  </div>
                  <div>
                    <dt>Perkiraan views shorts</dt>
                    <dd>{views(d.expected)}</dd>
                  </div>
                  <div>
                    <dt>Klip clipper (bonus)</dt>
                    <dd>{num(d.clippers)}</dd>
                  </div>
                </dl>
                {d.full && (
                  <ul className="b-bonus">
                    {p.builder.bonusFull.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                <button className="btn btn-rx" disabled={d.empty} onClick={() => acceptRef.current?.showModal()}>
                  Terima paket ini
                </button>
                {!d.full && (
                  <button className="link" onClick={() => setQty(Object.fromEntries(p.builder.items.map((i) => [i.id, i.qty])))}>
                    Kembalikan ke paket lengkap
                  </button>
                )}
              </aside>
            </div>
          </div>
        </section>

        <footer className="foot">Disiapkan oleh {p.agency} · geromball.com</footer>
      </div>

      <AcceptSheet ref={acceptRef} p={p} d={d} />
    </div>
  );
}

function Chooser({ p, minutes, onPick }: { p: Proposal; minutes: Record<Reading, number> | null; onPick: (m: Reading) => void }) {
  return (
    <main className="chooser">
      <p className="gate-co">
        {p.agency} <span>×</span> <b className="rx-text-dark">{p.client}</b>
      </p>
      <h1 className="display">{p.title}</h1>
      <div className="choose-cards">
        <button className="choose" onClick={() => onPick("blog")}>
          <b className="display">Blog</b>
          <span>Dibaca seperti artikel, dari ide utama sampai paket.</span>
          {minutes && <small>Sekitar {minutes.blog} menit</small>}
        </button>
        <button className="choose" onClick={() => onPick("short")}>
          <b className="display">Short</b>
          <span>Ringkasan isi paket, dengan harga di bagian akhir.</span>
          {minutes && <small>Sekitar {minutes.short} menit</small>}
        </button>
      </div>
      <button className="link link-light" onClick={() => onPick("long")}>
        Baca versi lengkap
      </button>
    </main>
  );
}

function Bars({ rows, dark }: { rows: { label: string; value: number; note?: string }[]; dark?: boolean }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ul className={`bars ${dark ? "bars-dark" : ""}`}>
      {rows.map((r, i) => (
        <li key={r.label} style={{ "--w": `${(r.value / max) * 100}%`, "--t": `${i * 90}ms` } as CSSProperties}>
          <span className="bars-label">
            {r.label}
            {r.note && <small>{r.note}</small>}
          </span>
          <span className="bars-track">
            <span className="bars-fill" />
          </span>
          <b>{views(r.value)}</b>
        </li>
      ))}
    </ul>
  );
}

type Derived = ReturnType<typeof derive>;

function AcceptSheet({ ref, p, d }: { ref: React.RefObject<HTMLDialogElement | null>; p: Proposal; d: Derived }) {
  const [name, setName] = useState("");
  const [ok, setOk] = useState(false);
  const [sent, setSent] = useState(false);
  const close = () => {
    ref.current?.close();
    setSent(false);
  };

  const mail = () => {
    const chosen = d.lines.filter((l) => l.n > 0).map((l) => `- ${l.n}× ${l.name} (${rpFull(l.total)})`);
    const body = [
      `Halo tim ${p.agency},`,
      "",
      `Saya menerima proposal "${p.title}" atas nama ${p.client} dengan pilihan berikut:`,
      "",
      ...chosen,
      "",
      d.full ? `Harga spesial paket lengkap: ${rpFull(p.builder.specialPrice)}` : `Harga normal pilihan ini: ${rpFull(d.normal)} (harga spesial paket custom menyusul dari ${p.agency})`,
      `Guarantee views video panjang: ${num(d.guarantee)}`,
      "",
      `Nama: ${name.trim()}`,
      "",
      "Terima kasih.",
    ].join("\n");
    const subject = `Penerimaan proposal: ${p.client} × ${p.agency}`;
    window.location.href = `mailto:${p.acceptEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <dialog ref={ref} className="sheet" onClick={(e) => e.target === e.currentTarget && close()} onClose={() => setSent(false)}>
      <div className="sheet-in">
        <button className="sheet-x" onClick={close} aria-label="Tutup">
          ×
        </button>
        <h2 className="display">Terima paket</h2>
        <ul className="sheet-lines">
          {d.lines
            .filter((l) => l.n > 0)
            .map((l) => (
              <li key={l.id}>
                <span>
                  {l.n}× {l.name}
                </span>
                <b>{rp(l.total)}</b>
              </li>
            ))}
        </ul>
        <p className="sheet-total">
          <span>{d.full ? "Harga spesial paket lengkap" : "Harga normal pilihan ini"}</span>
          <b className="display">{rp(d.price)}</b>
        </p>
        {sent ? (
          <p className="sheet-sent">
            Aplikasi email terbuka dengan email penerimaan untuk {p.acceptEmail}. Tekan kirim di sana, lalu {p.agency} mengirim kontrak resmi. Kalau aplikasi email tidak terbuka, kirim pilihan ini ke {p.acceptEmail}.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mail();
            }}
          >
            <label className="sheet-field">
              Nama lengkap
              <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
            </label>
            <label className="sheet-check">
              <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} required />
              Saya berwenang menerima proposal ini atas nama {p.client}.
            </label>
            <p className="sheet-note">Email ini menyampaikan pilihan paket Rexona. Kesepakatan berlaku setelah kontrak resmi ditandatangani.</p>
            <button className="btn btn-rx" disabled={!ok || !name.trim()}>
              Buka email penerimaan
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

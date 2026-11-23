"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Deck, Photo } from "@/lib/decks/types";
import "./deck.css";

function Shot({ p, tall }: { p: Photo; tall?: boolean }) {
  if (p.video) {
    return (
      <figure className="dk-fig">
        <video
          className={`dk-shot ${tall ? "is-tall" : ""}`}
          src={p.video}
          poster={p.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={p.label}
        />
        <figcaption>{p.label}</figcaption>
      </figure>
    );
  }
  if (p.src) {
    return (
      <figure className="dk-fig">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`dk-shot ${tall ? "is-tall" : ""}`}
          src={p.src}
          alt={p.label}
          loading="lazy"
        />
        <figcaption>{p.label}</figcaption>
      </figure>
    );
  }
  // A labelled slot until the real photo arrives.
  return (
    <div
      className={`dk-shot dk-slot ${tall ? "is-tall" : ""}`}
      role="img"
      aria-label={`Foto menyusul: ${p.label}`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
      <span>{p.label}</span>
    </div>
  );
}

export default function DeckView({ d }: { d: Deck }) {
  const root = useRef<HTMLDivElement>(null);
  const vars = {
    "--rx": d.clientColor.fill,
    "--rx-dark": d.clientColor.onDark,
  } as CSSProperties;

  // Arrow keys, Page Up/Down and space move one slide.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const next = ["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key);
      const prev = ["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key);
      if (!next && !prev) return;
      const slides = Array.from(
        root.current?.querySelectorAll<HTMLElement>(".dk-slide") ?? [],
      );
      const y = window.scrollY + 8;
      const i = slides.findIndex(
        (s, n) => (slides[n + 1]?.offsetTop ?? Infinity) > y,
      );
      const target =
        slides[Math.min(slides.length - 1, Math.max(0, i + (next ? 1 : -1)))];
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const day = d.match.date.split(" ").slice(0, 2).join(" ");

  return (
    <div className="dk" style={vars} ref={root}>
      {/* 1. Cover */}
      <section className="dk-slide dk-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="dk-banner"
          src={d.cover.banner}
          alt="Geromball, the fastest growing sports media"
        />
        <div className="dk-cover-txt">
          <span className="dk-chip">
            {d.agency} × <b>{d.client}</b>
          </span>
          <h1 className="dk-h">
            Nobar <i>{d.client}</i> di Geromball Grounds
          </h1>
          <div className="dk-match">
            <b>
              {d.match.home} <span>vs</span> {d.match.away}
            </b>
            <span>
              {d.match.day}, {d.match.date} · Kick off {d.match.kickoff}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Venue */}
      <section className="dk-slide">
        <div className="dk-wrap">
          <h2 className="dk-h">
            Ini <i>Geromball Grounds</i>
          </h2>
          <div className="dk-split">
            <div className="dk-shots dk-venue-shots">
              {d.venue.photos.map((p) => (
                <Shot key={p.label} p={p} />
              ))}
            </div>
            <ul className="dk-facts">
              <li>
                <small>Lokasi</small>
                <b>{d.venue.place}</b>
              </li>
              <li>
                <small>Layar</small>
                <b>{d.venue.screen}</b>
              </li>
              <li>
                <small>Kapasitas</small>
                <b>{d.venue.capacity}</b>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2b. Floor plan: zones, screens, stage, gate */}
      <section className="dk-slide">
        <div className="dk-wrap">
          <h2 className="dk-h">
            Denah <i>Geromball Grounds</i>
          </h2>
          <div className="dk-split">
            <div className="dk-map" role="img" aria-label="Denah Geromball Grounds: Zona A, B, C di dalam, stage dan Zona D di luar, entrance gate di depan">
              <div className="dk-map-cell is-muted">Toilet</div>
              <div className="dk-map-cell is-muted dk-span2">Bar</div>
              {d.venue.zones
                .filter((z) => z.id === "A" || z.id === "B")
                .map((z) => (
                  <div key={z.id} className={`dk-map-cell is-zone ${z.id === "B" ? "dk-span2" : ""}`}>
                    <b>Zona {z.id}</b>
                    <span>{z.screen}</span>
                  </div>
                ))}
              <div className="dk-map-cell is-muted">Barbershop</div>
              {d.venue.zones
                .filter((z) => z.id === "C")
                .map((z) => (
                  <div key={z.id} className="dk-map-cell is-zone dk-span2">
                    <b>Zona {z.id}</b>
                    <span>{z.screen}</span>
                  </div>
                ))}
              <div className="dk-map-cell is-stage dk-span3">Stage area · layar proyektor 120 cm</div>
              {d.venue.zones
                .filter((z) => z.id === "D")
                .map((z) => (
                  <div key={z.id} className="dk-map-cell is-zone is-big dk-span3">
                    <b>Zona {z.id}</b>
                    <span>Outdoor</span>
                  </div>
                ))}
              <div className="dk-map-gate dk-span3">↑ Entrance gate ↑</div>
            </div>
            <div>
              <ul className="dk-zones">
                {d.venue.zones.map((z) => (
                  <li key={z.id}>
                    <b>Zona {z.id}</b>
                    <span>
                      {z.kind} · {z.smoking ? "smoking" : "non-smoking"}
                    </span>
                    {z.screen && <em>{z.screen}</em>}
                  </li>
                ))}
              </ul>
              <ul className="dk-facts dk-facts-sm">
                <li>
                  <small>Kapasitas</small>
                  <b>{d.venue.capacity}</b>
                </li>
                <li>
                  <small>Fasilitas</small>
                  <b>{d.venue.facilities}</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Case study */}
      <section className="dk-slide">
        <div className="dk-wrap">
          <h2 className="dk-h">
            Soft opening: <i>{d.caseStudy.match}</i>
          </h2>
          <div className="dk-case">
            <div className="dk-big">
              <b>{d.caseStudy.seats}</b>
              <span>kursi reserved terisi penuh</span>
            </div>
            <div className="dk-case-txt">
              {d.caseStudy.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </div>
          <div className="dk-shots dk-shots-3">
            {d.caseStudy.photos.map((p) => (
              <Shot key={p.label} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Rundown */}
      <section className="dk-slide">
        <div className="dk-wrap">
          <h2 className="dk-h">
            Rundown <i>acara</i>
          </h2>
          <ol className="dk-run" style={{ "--cols": d.rundown.length > 7 ? Math.ceil(d.rundown.length / 2) : d.rundown.length } as CSSProperties}>
            {d.rundown.map((r) => (
              <li key={r.step} className={r.cta ? "is-cta" : ""}>
                {r.time && <time>{r.time}</time>}
                <b>{r.step}</b>
                <span>{r.detail}</span>
                {r.cta && <em>CTA {d.client}</em>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Brand integration */}
      <section className="dk-slide">
        <div className="dk-wrap">
          <h2 className="dk-h">{d.brand.title}</h2>
          <p className="dk-lead">{d.brand.lead}</p>
          <ul className="dk-points dk-points-grid">
            {d.brand.points.map((pt) => (
              <li key={pt.name}>
                <b>{pt.name}</b>
                <span>{pt.detail}</span>
              </li>
            ))}
          </ul>
          {d.brand.photo && (
            <div className="dk-shots dk-shots-1 dk-natural">
              <Shot p={d.brand.photo} />
            </div>
          )}
        </div>
      </section>

      {/* 6a. Ticket program (Rexona) */}
      {d.ticket && (
        <section className="dk-slide">
          <div className="dk-wrap">
            <h2 className="dk-h">
              Tiket masuk <i>{d.ticket.price}</i>
            </h2>
            <div className="dk-ticket">
              <div className="dk-ticket-stub">
                {d.ticket.status && (
                  <span className="dk-badge dk-badge-tbc">To be confirmed</span>
                )}
                <small>Tiket nobar</small>
                <b>{d.ticket.price}</b>
                <span>
                  {d.match.home} vs {d.match.away}
                </span>
              </div>
              <ul>
                {d.ticket.gets.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
            <p className="dk-lead">{d.ticket.note}</p>
            {d.ticket.status && <p className="dk-status">{d.ticket.status}.</p>}
          </div>
        </section>
      )}

      {/* 6b. Live Reaction mirroring (Djarum) */}
      {d.live && (
        <section className="dk-slide">
          <div className="dk-wrap">
            {d.live.badge && <span className="dk-badge">{d.live.badge}</span>}
            <h2 className="dk-h">{d.live.title}</h2>
            <p className="dk-lead">{d.live.lead}</p>
            {d.live.stats && (
              <div className="dk-stats">
                {d.live.stats.map((s) => (
                  <div key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
            {d.live.photo && (
              <div className="dk-shots dk-shots-1">
                <Shot p={d.live.photo} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. Match day, still to confirm, contacts */}
      <section className="dk-slide">
        <div className="dk-wrap">
          <h2 className="dk-h">
            Hari H, <i>{day}</i>
          </h2>
          <div className="dk-match dk-match-lg">
            <b>
              {d.match.home} <span>vs</span> {d.match.away}
            </b>
            <span>
              {d.match.day}, {d.match.date} · {d.venue.place}
            </span>
          </div>
          <ul className="dk-times">
            <li>
              <small>Open gate</small>
              <b>{d.match.gateOpen}</b>
            </li>
            <li>
              <small>Acara dimulai</small>
              <b>{d.match.eventStart}</b>
            </li>
            <li className="is-ko">
              <small>Kick off</small>
              <b>{d.match.kickoff}</b>
            </li>
          </ul>
          <div className="dk-close">
            <div className="dk-tbc">
              <h3>Masih perlu dikonfirmasi</h3>
              <ul>
                {d.tbc.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <ul className="dk-contacts">
              {d.contacts.map((c) => (
                <li key={c.name}>
                  <b>{c.name}</b>
                  {c.role && <span>{c.role}</span>}
                  {c.whatsapp && (
                    <a href={`https://wa.me/${c.whatsapp}`}>
                      WhatsApp +
                      {c.whatsapp.replace(
                        /^(\d{2})(\d{3})(\d{4})(\d+)$/,
                        "$1 $2-$3-$4",
                      )}
                    </a>
                  )}
                  {c.email && <a href={`mailto:${c.email}`}>{c.email}</a>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

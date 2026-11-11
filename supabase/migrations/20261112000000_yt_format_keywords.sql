-- Formats get title keywords like IPs, so the sync can suggest them.
-- Pojok Debat is an umbrella show whose segments (Ranked, Susun Lineup, Review, ...) were
-- invisible as one IP; recording them as formats lets the dashboard compare segments.
-- Lower priority wins when a title matches several formats ("CHALLENGE: Bangun Tim ..." -> Challenge).
alter table public.yt_formats
  add column title_keywords text[] not null default '{}',
  add column priority integer not null default 100;

insert into public.yt_formats (name, title_keywords, priority) values
  ('Ranked', '{"ranked","ranking"}', 10),
  ('Mainkan Cadangkan Jual', '{"mainkan, cadangkan, jual","mainkan cadangkan jual"}', 20),
  ('Draft Pick', '{"draft pick"}', 30),
  ('Challenge', '{"challenge"}', 40),
  ('Quiz', '{"quiz","tebak"}', 50),
  ('Susun Lineup', '{"susun lineup","susun line-up","combine lineup","combined lineup","best xi","best-xi","bangun tim","bangun team","bangun skuad"}', 60),
  ('Review', '{"review","rekap"}', 70),
  ('Preview', '{"preview","prediksi"}', 80),
  ('Berita', '{"berita:"}', 90),
  ('Pojok Hasut', '{"pojok hasut"}', 95),
  ('Mabar', '{"mabar"}', 96),
  ('Vlog', '{"vlog"}', 97)
on conflict (name) do update set title_keywords = excluded.title_keywords, priority = excluded.priority;

-- Two 3:00 Shorts the first sync filed as long-form (the API reported 181 s)
update public.yt_videos set is_short = true where id in ('w6ZFLftotzw', '8CnayQ-cfkA');

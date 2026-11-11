-- Series found in Geromball titles ("... | Susun Lineup") after the first sync, plus keyword fixes
-- for spellings the first pass missed (#pojokdebat, "Menjadi Manajer", "LIVEREACT").
update public.yt_ips set title_keywords = '{"pojok debat","pojokdebat"}' where name = 'Pojok Debat';
update public.yt_ips set title_keywords = '{"menjadi manager","menjadi manajer"}' where name = 'Menjadi Manager';
update public.yt_ips set title_keywords = '{"live reaction","livereact"}' where name = 'Live Reaction';
update public.yt_ips set title_keywords = '{"arisan bola","topik arisan"}' where name = 'Arisan Bola';
insert into public.yt_ips (name, title_keywords) values
  ('Pramusim', '{"pramusim"}'), ('Susun Lineup', '{"susun lineup","susun line-up"}'), ('Dream Team', '{"dream team"}'),
  ('Double Pivot', '{"double pivot"}'), ('Lebaran Bola', '{"lebaran bola"}'), ('Howling the Path', '{"howling the path"}'),
  ('Ruang Ganti', '{"ruang ganti"}'), ('Liga Logika', '{"liga logika","ligalogika"}'), ('Football Quiz', '{"football quiz"}'),
  ('Lampu Hijau', '{"lampu hijau"}'), ('Road to Redemption', '{"road to redemption"}'), ('Duel Pemain', '{"duel pemain"}'),
  ('Mahkamah Sepakbola', '{"mahkamah sepakbola"}'), ('Sikat Balik', '{"sikat balik"}'), ('Pojok FPL', '{"pojok fpl"}');

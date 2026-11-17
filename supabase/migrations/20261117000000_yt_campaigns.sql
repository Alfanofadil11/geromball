-- Brand SOW tracker: a campaign (e.g. Rexona x Geromball) has deliverables with KPI targets,
-- and each deliverable collects the content that fulfils it. YouTube views come from yt_videos;
-- views on mirrored platforms (IG Reels, TikTok) and clipper totals are typed in by the producer.
create table public.yt_campaigns (
  id bigint generated always as identity primary key,
  brand text not null,
  name text not null,
  start_date date,
  end_date date,
  keywords text[] not null default '{}',
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.yt_campaign_deliverables (
  id bigint generated always as identity primary key,
  campaign_id bigint not null references public.yt_campaigns(id) on delete cascade,
  -- guaranteed: promised to the brand; expected: estimate; bonus: extra on top
  section text not null check (section in ('guaranteed', 'expected', 'bonus')),
  group_name text not null,
  name text not null,
  units_target integer not null check (units_target > 0),
  unit_label text not null default 'eps',
  views_per_unit bigint,
  views_target bigint not null check (views_target >= 0),
  -- counts views from IG Reels / TikTok mirrors as well as YouTube
  mirrored boolean not null default false,
  sort integer not null default 100,
  created_at timestamptz not null default now()
);

create table public.yt_campaign_items (
  id bigint generated always as identity primary key,
  deliverable_id bigint not null references public.yt_campaign_deliverables(id) on delete cascade,
  video_id text references public.yt_videos(id) on delete set null,
  title text,
  url text,
  units integer not null default 1 check (units > 0),
  ig_views bigint not null default 0,
  tiktok_views bigint not null default 0,
  other_views bigint not null default 0,
  note text,
  created_at timestamptz not null default now(),
  unique (deliverable_id, video_id)
);
create index on public.yt_campaign_deliverables (campaign_id);
create index on public.yt_campaign_items (deliverable_id);
create index on public.yt_campaign_items (video_id);

alter table public.yt_campaigns enable row level security;
alter table public.yt_campaign_deliverables enable row level security;
alter table public.yt_campaign_items enable row level security;
revoke all on public.yt_campaigns, public.yt_campaign_deliverables, public.yt_campaign_items from anon, authenticated;

-- Rexona x Geromball SOW
with c as (
  insert into public.yt_campaigns (brand, name, keywords)
  values ('Rexona', 'Rexona x Geromball', '{"rexona"}')
  returning id
)
insert into public.yt_campaign_deliverables
  (campaign_id, section, group_name, name, units_target, unit_label, views_per_unit, views_target, mirrored, sort)
select c.id, d.* from c, (values
  ('guaranteed', 'Long Form Creative', 'Guess The Fake Fan', 3, 'eps', 100000, 300000, false, 10),
  ('guaranteed', 'Long Form Creative', '1v6', 2, 'eps', 100000, 200000, false, 20),
  ('guaranteed', 'Long Form Creative', 'Dream Team', 1, 'eps', 100000, 100000, false, 30),
  ('guaranteed', 'Pojok Debat', 'Pojok Debat', 3, 'eps', 50000, 150000, false, 40),
  ('guaranteed', 'Live Reaction', 'Live Reaction', 3, 'eps', 50000, 150000, false, 50),
  ('expected', 'Creative Shorts', 'Creative Shorts', 12, 'video', 100000, 1200000, true, 60),
  ('expected', 'Highlight Shorts', 'Highlight Shorts', 12, 'video', 100000, 1200000, true, 70),
  ('bonus', 'Clippers', 'Clippers', 120, 'klip', null, 1000000, true, 80)
) as d(section, group_name, name, units_target, unit_label, views_per_unit, views_target, mirrored, sort);

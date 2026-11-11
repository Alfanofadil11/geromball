-- Geromball YouTube analytics dashboard (/dashboard).
-- Applied to the Supabase project the site already uses. Server-only access through the
-- service role key: RLS is on with no policies, so the public anon key reads nothing here.
create table public.yt_ips (
  id bigint generated always as identity primary key,
  name text not null unique,
  playlist_id text,
  title_keywords text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.yt_formats (
  id bigint generated always as identity primary key,
  name text not null unique,
  created_at timestamptz not null default now()
);

create table public.yt_talents (
  id bigint generated always as identity primary key,
  name text not null unique,
  title_keywords text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.yt_videos (
  id text primary key,
  title text not null,
  description text,
  published_at timestamptz not null,
  duration_s integer,
  is_short boolean not null default false,
  is_live boolean not null default false,
  thumbnail text,
  playlist_ids text[] not null default '{}',
  views bigint not null default 0,
  likes bigint not null default 0,
  comments bigint not null default 0,
  stats_updated_at timestamptz,
  -- phase 2: filled from YouTube Analytics once the channel is connected
  avg_view_pct numeric,
  avg_view_duration_s integer,
  ip_id bigint references public.yt_ips(id) on delete set null,
  format_id bigint references public.yt_formats(id) on delete set null,
  tag_status text not null default 'untagged' check (tag_status in ('untagged','suggested','confirmed')),
  tag_source text check (tag_source in ('playlist','keyword','manual')),
  note text,
  created_at timestamptz not null default now()
);
create index yt_videos_published_idx on public.yt_videos (published_at desc);
create index yt_videos_ip_idx on public.yt_videos (ip_id);

create table public.yt_video_talents (
  video_id text not null references public.yt_videos(id) on delete cascade,
  talent_id bigint not null references public.yt_talents(id) on delete cascade,
  primary key (video_id, talent_id)
);
create index yt_video_talents_talent_idx on public.yt_video_talents (talent_id);

-- one row per video per day, so views at day 7 / day 28 can be read for videos synced from now on
create table public.yt_video_snapshots (
  video_id text not null references public.yt_videos(id) on delete cascade,
  captured_on date not null,
  views bigint not null,
  likes bigint not null,
  comments bigint not null,
  primary key (video_id, captured_on)
);

create table public.yt_sync_runs (
  id bigint generated always as identity primary key,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  videos_seen integer,
  ok boolean,
  error text
);

alter table public.yt_ips enable row level security;
alter table public.yt_formats enable row level security;
alter table public.yt_talents enable row level security;
alter table public.yt_videos enable row level security;
alter table public.yt_video_talents enable row level security;
alter table public.yt_video_snapshots enable row level security;
alter table public.yt_sync_runs enable row level security;

insert into public.yt_ips (name, playlist_id, title_keywords) values
  ('Pojok Debat', 'PLONlD36-GxIh41bn5Gt0WkGNY6ifTSaAN', '{"pojok debat"}'),
  ('Menjadi Manager', 'PLONlD36-GxIhjvuA2xLSHSPP9VbFE_tDG', '{"menjadi manager"}'),
  ('Live Reaction', 'PLONlD36-GxIgzgz-Y2jC5g6Di0p-x0HvV', '{"live reaction"}'),
  ('Arisan Bola', null, '{"arisan bola"}'),
  ('Piramida Bola', null, '{"piramida bola"}'),
  ('Football Imposter', null, '{"imposter"}');

insert into public.yt_talents (name) values
  ('Basya'), ('Karim Nasar'), ('Ali Reds History'), ('Nuggy Ramadhan'), ('Bang Gundo'), ('Hasan'), ('Ole Alatas');

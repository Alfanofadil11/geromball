-- Views gained per day, from the daily snapshots (latest snapshot vs the earliest one in the
-- last 28 days). Feeds the "evergreen" signal: old videos that keep pulling views.
create or replace view public.yt_video_velocity with (security_invoker = true) as
with latest as (select max(captured_on) as d from public.yt_video_snapshots),
w as (
  select s.video_id,
    (array_agg(s.views order by s.captured_on desc))[1] as last_views,
    (array_agg(s.views order by s.captured_on asc))[1] as first_views,
    max(s.captured_on) - min(s.captured_on) as days
  from public.yt_video_snapshots s, latest
  where s.captured_on >= latest.d - 28
  group by s.video_id
)
select video_id, days,
  case when days > 0 then greatest(last_views - first_views, 0)::numeric / days end as views_per_day
from w;

revoke all on public.yt_video_velocity from anon, authenticated;

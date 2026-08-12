const CHANNEL_ID = "UCrpz3DaqrtI7rnGyZH-OykQ"
const CHANNEL_RSS = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

// Playlists
const POJOK_DEBAT_PLAYLIST = "PLONlD36-GxIh41bn5Gt0WkGNY6ifTSaAN"
const MENJADI_MANAGER_PLAYLIST = "PLONlD36-GxIhjvuA2xLSHSPP9VbFE_tDG"
const LIVE_REACTION_PLAYLIST = "PLONlD36-GxIgzgz-Y2jC5g6Di0p-x0HvV"

export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  published: string
  url: string
}

export interface CategorizedVideos {
  pojokDebat: YouTubeVideo[]
  menjadiManager: YouTubeVideo[]
  liveReaction: YouTubeVideo[]
}

function parseXML(text: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = []
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
  let match

  while ((match = entryRegex.exec(text)) !== null) {
    const entry = match[1]

    const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)
    const titleMatch = entry.match(/<title>(.*?)<\/title>/)
    const thumbnailMatch = entry.match(/<media:thumbnail url="(.*?)"/)
    const publishedMatch = entry.match(/<published>(.*?)<\/published>/)

    if (idMatch && titleMatch) {
      videos.push({
        id: idMatch[1],
        title: titleMatch[1],
        thumbnail: thumbnailMatch ? thumbnailMatch[1] : `https://img.youtube.com/vi/${idMatch[1]}/mqdefault.jpg`,
        published: publishedMatch ? publishedMatch[1] : "",
        url: `https://youtu.be/${idMatch[1]}`,
      })
    }
  }

  return videos
}

function isExcludedIP(title: string): boolean {
  const lower = title.toLowerCase()
  return lower.includes("imposter") || lower.includes("football imposter")
}

async function fetchPlaylist(playlistId: string): Promise<YouTubeVideo[]> {
  try {
    const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`
    const response = await fetch(url, { next: { revalidate: 3600 } })
    if (!response.ok) return []
    const text = await response.text()
    return parseXML(text)
  } catch (error) {
    console.error("Error fetching playlist:", error)
    return []
  }
}

export async function getYouTubeVideos(): Promise<CategorizedVideos> {
  const [pojokDebat, menjadiManager, liveReaction] = await Promise.all([
    fetchPlaylist(POJOK_DEBAT_PLAYLIST),
    fetchPlaylist(MENJADI_MANAGER_PLAYLIST),
    fetchPlaylist(LIVE_REACTION_PLAYLIST),
  ])

  return {
    pojokDebat: pojokDebat.filter(v => !isExcludedIP(v.title)).slice(0, 8),
    menjadiManager: menjadiManager.filter(v => !isExcludedIP(v.title)).slice(0, 6),
    liveReaction: liveReaction.filter(v => !isExcludedIP(v.title)).slice(0, 6),
  }
}

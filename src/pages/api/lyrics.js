export default async function handler(req, res) {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  try {
    // Fetch video details from YouTube Data API
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const videoData = await videoResponse.json();

    if (!videoData.items || videoData.items.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const videoTitle = videoData.items[0].snippet.title;
    const channelTitle = videoData.items[0].snippet.channelTitle;

    // Try to fetch lyrics from a lyrics API
    // You can use services like Genius API, Musixmatch, or lyrics.ovh
    const lyricsResponse = await fetch(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(channelTitle)}/${encodeURIComponent(videoTitle)}`
    );

    if (lyricsResponse.ok) {
      const lyricsData = await lyricsResponse.json();
      return res.status(200).json({ 
        lyrics: lyricsData.lyrics,
        title: videoTitle,
        artist: channelTitle
      });
    }

    // If lyrics not found, return a message
    return res.status(200).json({ 
      lyrics: null,
      message: 'Lyrics not available for this video',
      title: videoTitle,
      artist: channelTitle
    });

  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return res.status(500).json({ error: 'Failed to fetch lyrics' });
  }
}

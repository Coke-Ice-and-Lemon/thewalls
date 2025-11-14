export default async function handler(req, res) {
  const { playlistId } = req.query;

  if (!playlistId) {
    return res.status(400).json({ error: 'Playlist ID is required' });
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey) {
      // If no API key, return error
      return res.status(500).json({ 
        error: 'YouTube API key not configured',
        message: 'Please add YOUTUBE_API_KEY to your .env file'
      });
    }

    // Fetch playlist items from YouTube Data API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'Failed to fetch playlist',
        message: 'Invalid playlist ID or API error'
      });
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: 'Playlist is empty or not found' });
    }

    // Extract video IDs
    const videos = data.items.map(item => item.contentDetails.videoId);

    return res.status(200).json({ 
      videos,
      count: videos.length,
      playlistId
    });

  } catch (error) {
    console.error('Error fetching playlist:', error);
    return res.status(500).json({ error: 'Failed to fetch playlist' });
  }
}

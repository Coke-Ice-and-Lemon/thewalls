import { useState, useEffect } from 'react';

export default function LyricsPanel({ videoId }) {
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/lyrics?videoId=${videoId}`);
        const data = await response.json();
        
        if (data.lyrics) {
          setLyrics(data.lyrics);
        } else {
          setError('Lyrics not available for this video');
        }
      } catch (err) {
        setError('Failed to fetch lyrics');
        console.error('Error fetching lyrics:', err);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchLyrics();
    }
  }, [videoId]);

  return (
    <div className="bg-[#0f3460] rounded-lg p-6">
      <h2 className="text-2xl font-bold text-[#fffded] mb-4">Lyrics</h2>
      <div className="bg-[#1a1a2e] rounded-lg p-4 max-h-96 overflow-y-auto">
        {loading && (
          <p className="text-[#fffded] text-center">Loading lyrics...</p>
        )}
        {error && (
          <p className="text-[#e94560] text-center">{error}</p>
        )}
        {!loading && !error && lyrics && (
          <pre className="text-[#fffded] whitespace-pre-wrap font-sans leading-relaxed">
            {lyrics}
          </pre>
        )}
        {!loading && !error && !lyrics && (
          <p className="text-[#fffded] text-center italic">
            No lyrics available for this video
          </p>
        )}
      </div>
    </div>
  );
}

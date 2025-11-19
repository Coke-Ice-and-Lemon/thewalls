import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import YouTubePlayer from '@/components/YouTubePlayer';
import LyricsPanel from '@/components/LyricsPanel';
import { useMusicRoom } from '@/hooks/useMusicRoom';

export default function Room() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { roomId } = router.query;
  
  const [videoUrl, setVideoUrl] = useState('');
  const [showAddVideo, setShowAddVideo] = useState(false);
  
  const { room, isLoading, error, actions } = useMusicRoom(
    roomId,
    session?.user?.email,
    session?.user?.name,
    session?.user?.image
  );
  
  const isHost = room?.createdBy === session?.user?.email;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const extractVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const extractPlaylistId = (url) => {
    const regExp = /[?&]list=([^#&?]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const fetchPlaylistVideos = async (playlistId) => {
    try {
      const response = await fetch(`/api/playlist?playlistId=${playlistId}`);
      const data = await response.json();
      return data.videos || [];
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return [];
    }
  };

  const addVideo = async () => {
    if (!videoUrl.trim()) return;
    
    const playlistId = extractPlaylistId(videoUrl);
    
    if (playlistId) {
      const videos = await fetchPlaylistVideos(playlistId);
      if (videos.length > 0) {
        for (const videoId of videos) {
          await actions.addToQueue({
            url: videoId,
            title: `Video ${videoId}`,
            artist: '',
            duration: 0
          });
        }
        alert(`Added ${videos.length} videos from playlist!`);
      } else {
        alert('Could not fetch playlist videos');
      }
    } else {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        alert('Invalid YouTube URL');
        return;
      }

      const track = {
        url: videoId,
        title: `Video ${videoId}`,
        artist: '',
        duration: 0
      };
      
      await actions.addToQueue(track);
      
      // If no current track, set this as the current track and play
      if (!room.currentTrack || !room.currentTrack.url) {
        await actions.changeTrack(track, true);
      }
    }

    setVideoUrl('');
    setShowAddVideo(false);
  };

  const playNext = async () => {
    if (!room.queue || room.queue.length === 0) return;
    
    const currentIndex = room.queue.findIndex(q => q.track_url === room.currentTrack?.url);
    const nextIndex = (currentIndex + 1) % room.queue.length;
    const nextTrack = room.queue[nextIndex];
    
    await actions.changeTrack({
      url: nextTrack.track_url,
      title: nextTrack.track_title,
      artist: nextTrack.track_artist,
      duration: nextTrack.track_duration || 0
    }, true);
  };

  const playPrevious = async () => {
    if (!room.queue || room.queue.length === 0) return;
    
    const currentIndex = room.queue.findIndex(q => q.track_url === room.currentTrack?.url);
    const prevIndex = currentIndex === 0 ? room.queue.length - 1 : currentIndex - 1;
    const prevTrack = room.queue[prevIndex];
    
    await actions.changeTrack({
      url: prevTrack.track_url,
      title: prevTrack.track_title,
      artist: prevTrack.track_artist,
      duration: prevTrack.track_duration || 0
    }, true);
  };

  const removeFromQueue = async (position) => {
    await actions.removeFromQueue(position);
  };

  const leaveRoom = () => {
    router.push('/music-room');
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#fffded] text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#fffded] text-xl">Room not found</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{room.name} - Music Room</title>
      </Head>

      <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom right, #0a0a0a, #1a1a1a)' }}>
        <div className="max-w-7xl mx-auto mt-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-[#fffded]">{room.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2 bg-black bg-opacity-40 px-3 py-1 rounded">
                  <span className="text-xs text-gray-400">Room Code:</span>
                  <code className="text-xs text-green-400 font-mono">{roomId?.substring(0, 10)}...</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(roomId);
                      alert('Room code copied!');
                    }}
                    className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded transition"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={leaveRoom}
              className="bg-red-600 hover:bg-red-700 text-[#fffded] px-6 py-2 rounded font-bold transition"
            >
              Leave Room
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4">
                {room.currentTrack ? (
                  <YouTubePlayer 
                    videoId={room.currentTrack.url} 
                    roomId={roomId}
                    isHost={isHost}
                    playbackState={room.playbackState}
                    onPlayerAction={async (action, data) => {
                      if (isHost) {
                        console.log('[HOST] Player action:', action, data);
                        if (action === 'play') {
                          await actions.play(data?.currentTime);
                        } else if (action === 'pause') {
                          await actions.pause();
                        }
                      }
                    }}
                  />
                ) : (
                  <div className="aspect-video bg-black bg-opacity-60 rounded-lg flex flex-col items-center justify-center">
                    <p className="text-[#fffded] text-xl mb-2">🎵</p>
                    <p className="text-[#fffded] text-lg">No video playing</p>
                    {isHost && (
                      <button
                        onClick={() => setShowAddVideo(true)}
                        className="mt-4 bg-green-500 hover:bg-green-600 text-[#fffded] px-6 py-2 rounded font-bold transition"
                      >
                        Add First Video
                      </button>
                    )}
                  </div>
                )}
              </div>

              {isHost && room.currentTrack && (
                <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex gap-3">
                    {room.queue.length > 1 && (
                      <>
                        <button onClick={playPrevious} className="flex-1 bg-gray-700 hover:bg-gray-600 text-[#fffded] py-3 rounded font-bold transition">
                          ⏮ Previous
                        </button>
                        <button onClick={playNext} className="flex-1 bg-gray-700 hover:bg-gray-600 text-[#fffded] py-3 rounded font-bold transition">
                          Next ⏭
                        </button>
                      </>
                    )}
                    <button onClick={() => setShowAddVideo(true)} className="flex-1 bg-green-500 hover:bg-green-600 text-[#fffded] py-3 rounded font-bold transition">
                      + Add Video
                    </button>
                  </div>
                </div>
              )}

              {room.currentTrack && <LyricsPanel videoId={room.currentTrack.url} />}
            </div>

            <div className="space-y-4">
              <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4">
                <h2 className="text-lg font-bold text-[#fffded] mb-3">
                  👥 Participants ({room.users.length})
                </h2>
                <div className="space-y-2">
                  {room.users.map((user, index) => (
                    <div key={index} className="flex items-center gap-3 bg-black bg-opacity-30 p-2 rounded">
                      <Image src={user.user_image || '/default-avatar.png'} alt={user.user_name} width={36} height={36} className="rounded-full" />
                      <div className="flex-1">
                        <p className="text-[#fffded] text-sm font-medium">{user.user_name}</p>
                        {user.user_id === room.createdBy && <span className="text-xs text-green-400">👑 Host</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {room.queue.length > 0 && (
                <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4">
                  <h2 className="text-lg font-bold text-[#fffded] mb-3">🎵 Queue ({room.queue.length})</h2>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {room.queue.map((item, index) => (
                      <div key={item.id} className={`flex items-center justify-between p-2 rounded transition ${item.track_url === room.currentTrack?.url ? 'bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30' : 'bg-black bg-opacity-30 hover:bg-opacity-50 cursor-pointer'}`}
                        onClick={() => {
                          if (isHost && item.track_url !== room.currentTrack?.url) {
                            actions.changeTrack({
                              url: item.track_url,
                              title: item.track_title,
                              artist: item.track_artist,
                              duration: item.track_duration || 0
                            }, true);
                          }
                        }}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-[#fffded] text-xs font-bold w-6">{item.track_url === room.currentTrack?.url ? '▶' : index + 1}</span>
                          <Image src={`https://img.youtube.com/vi/${item.track_url}/default.jpg`} alt="Video thumbnail" width={64} height={48} className="rounded object-cover" />
                          <span className="text-[#fffded] text-xs truncate flex-1">{item.track_title}</span>
                        </div>
                        {isHost && item.track_url !== room.currentTrack?.url && (
                          <button onClick={(e) => {
                            e.stopPropagation();
                            removeFromQueue(item.position);
                          }} className="text-red-500 hover:text-red-400 text-sm ml-2 font-bold">✕</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showAddVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-black bg-opacity-90 backdrop-blur-lg rounded-lg p-6 max-w-md w-full border border-gray-700">
              <h2 className="text-xl font-bold text-[#fffded] mb-2">🎵 Add Video or Playlist</h2>
              <p className="text-[#fffded] text-sm mb-4 opacity-75">Paste a YouTube video or playlist URL</p>
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addVideo()}
                className="w-full px-4 py-3 rounded bg-gray-800 text-[#fffded] mb-2 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700"
              />
              <p className="text-xs text-gray-400 mb-4">💡 YouTube Music playlists work too!</p>
              <div className="flex gap-3">
                <button onClick={addVideo} className="flex-1 bg-green-500 hover:bg-green-600 text-[#fffded] py-3 rounded font-bold transition">
                  Add to Queue
                </button>
                <button onClick={() => { setShowAddVideo(false); setVideoUrl(''); }} className="flex-1 bg-gray-700 hover:bg-gray-600 text-[#fffded] py-3 rounded font-bold transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

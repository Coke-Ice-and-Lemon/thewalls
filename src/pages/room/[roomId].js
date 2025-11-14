import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { db } from '@/firebase';
import Head from 'next/head';
import Image from 'next/image';
import YouTubePlayer from '@/components/YouTubePlayer';
import LyricsPanel from '@/components/LyricsPanel';

export default function Room() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { roomId } = router.query;
  
  const [room, setRoom] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (!roomId || status !== 'authenticated') return;

    const unsubscribe = db.collection('musicRooms').doc(roomId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const roomData = { id: doc.id, ...doc.data() };
          setRoom(roomData);
          setIsHost(roomData.host.id === session.user.email);
          setQueue(roomData.queue || []);
          
          if (roomData.currentVideo) {
            setCurrentVideoId(roomData.currentVideo);
          }
        } else {
          router.push('/music-room');
        }
      });

    return () => unsubscribe();
  }, [roomId, status, session, router]);

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
      // Handle playlist
      const videos = await fetchPlaylistVideos(playlistId);
      if (videos.length > 0) {
        const currentQueue = room.queue || [];
        const newQueue = [...currentQueue, ...videos];
        
        await db.collection('musicRooms').doc(roomId).update({
          queue: newQueue,
          currentVideo: newQueue[0],
          playerState: 'playing',
          currentTime: 0,
          currentQueueIndex: 0
        });
        
        alert(`Added ${videos.length} videos from playlist!`);
      } else {
        alert('Could not fetch playlist videos');
      }
    } else {
      // Handle single video
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        alert('Invalid YouTube URL');
        return;
      }

      const currentQueue = room.queue || [];
      const newQueue = [...currentQueue, videoId];

      await db.collection('musicRooms').doc(roomId).update({
        queue: newQueue,
        currentVideo: videoId,
        playerState: 'playing',
        currentTime: 0,
        currentQueueIndex: newQueue.length - 1
      });
    }

    setVideoUrl('');
    setShowAddVideo(false);
  };

  const playNext = async () => {
    if (!room.queue || room.queue.length === 0) return;
    
    const currentIndex = room.currentQueueIndex || 0;
    const nextIndex = (currentIndex + 1) % room.queue.length;
    
    await db.collection('musicRooms').doc(roomId).update({
      currentVideo: room.queue[nextIndex],
      currentQueueIndex: nextIndex,
      playerState: 'playing',
      currentTime: 0
    });
  };

  const playPrevious = async () => {
    if (!room.queue || room.queue.length === 0) return;
    
    const currentIndex = room.currentQueueIndex || 0;
    const prevIndex = currentIndex === 0 ? room.queue.length - 1 : currentIndex - 1;
    
    await db.collection('musicRooms').doc(roomId).update({
      currentVideo: room.queue[prevIndex],
      currentQueueIndex: prevIndex,
      playerState: 'playing',
      currentTime: 0
    });
  };

  const removeFromQueue = async (index) => {
    const newQueue = room.queue.filter((_, i) => i !== index);
    await db.collection('musicRooms').doc(roomId).update({
      queue: newQueue
    });
  };

  const leaveRoom = async () => {
    if (!room) return;

    const updatedParticipants = room.participants.filter(p => p.id !== session.user.email);

    if (updatedParticipants.length === 0) {
      await db.collection('musicRooms').doc(roomId).update({
        isActive: false
      });
    } else if (isHost && updatedParticipants.length > 0) {
      await db.collection('musicRooms').doc(roomId).update({
        participants: updatedParticipants,
        host: updatedParticipants[0]
      });
    } else {
      await db.collection('musicRooms').doc(roomId).update({
        participants: updatedParticipants
      });
    }

    router.push('/music-room');
  };

  if (status === 'loading' || !room) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#fffded] text-xl">Loading...</div>
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#fffded]">{room.name}</h1>
            <button
              onClick={leaveRoom}
              className="bg-red-600 hover:bg-red-700 text-[#fffded] px-6 py-2 rounded font-bold transition"
            >
              Leave Room
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {/* Video Player */}
              <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4">
                {currentVideoId ? (
                  <YouTubePlayer 
                    videoId={currentVideoId} 
                    roomId={roomId}
                    isHost={isHost}
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

              {/* Host Controls */}
              {isHost && currentVideoId && (
                <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex gap-3">
                    {queue.length > 1 && (
                      <>
                        <button
                          onClick={playPrevious}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-[#fffded] py-3 rounded font-bold transition"
                        >
                          ⏮ Previous
                        </button>
                        <button
                          onClick={playNext}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-[#fffded] py-3 rounded font-bold transition"
                        >
                          Next ⏭
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setShowAddVideo(true)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-[#fffded] py-3 rounded font-bold transition"
                    >
                      + Add Video
                    </button>
                  </div>
                </div>
              )}

              {/* Lyrics */}
              {currentVideoId && (
                <LyricsPanel videoId={currentVideoId} />
              )}
            </div>

            <div className="space-y-4">
              {/* Participants */}
              <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4">
                <h2 className="text-lg font-bold text-[#fffded] mb-3">
                  👥 Participants ({room.participants.length}/{room.maxParticipants})
                </h2>
                <div className="space-y-2">
                  {room.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3 bg-black bg-opacity-30 p-2 rounded">
                      <Image
                        src={participant.image || '/default-avatar.png'}
                        alt={participant.name}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-[#fffded] text-sm font-medium">{participant.name}</p>
                        {participant.id === room.host.id && (
                          <span className="text-xs text-green-400">👑 Host</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Queue */}
              {queue.length > 0 && (
                <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4">
                  <h2 className="text-lg font-bold text-[#fffded] mb-3">
                    🎵 Queue ({queue.length})
                  </h2>
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    {queue.map((videoId, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded transition ${
                          index === (room.currentQueueIndex || 0)
                            ? 'bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30'
                            : 'bg-black bg-opacity-30 hover:bg-opacity-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-[#fffded] text-xs font-bold w-6">
                            {index === (room.currentQueueIndex || 0) ? '▶' : index + 1}
                          </span>
                          <Image
                            src={`https://img.youtube.com/vi/${videoId}/default.jpg`}
                            alt="Video thumbnail"
                            width={64}
                            height={48}
                            className="rounded object-cover"
                          />
                          <span className="text-[#fffded] text-xs truncate flex-1">
                            Video {index + 1}
                          </span>
                        </div>
                        {isHost && index !== (room.currentQueueIndex || 0) && (
                          <button
                            onClick={() => removeFromQueue(index)}
                            className="text-red-500 hover:text-red-400 text-sm ml-2 font-bold"
                          >
                            ✕
                          </button>
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
              <p className="text-[#fffded] text-sm mb-4 opacity-75">
                Paste a YouTube video or playlist URL
              </p>
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addVideo()}
                className="w-full px-4 py-3 rounded bg-gray-800 text-[#fffded] mb-2 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700"
              />
              <p className="text-xs text-gray-400 mb-4">
                💡 YouTube Music playlists work too!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={addVideo}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-[#fffded] py-3 rounded font-bold transition"
                >
                  Add to Queue
                </button>
                <button
                  onClick={() => {
                    setShowAddVideo(false);
                    setVideoUrl('');
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-[#fffded] py-3 rounded font-bold transition"
                >
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

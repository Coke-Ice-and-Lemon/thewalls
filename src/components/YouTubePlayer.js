import { useEffect, useRef, useState } from 'react';
import { db } from '@/firebase';

export default function YouTubePlayer({ videoId, roomId, isHost }) {
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const syncIntervalRef = useRef(null);
  const lastUpdateRef = useRef(0);
  const isUpdatingRef = useRef(false);
  const currentVideoRef = useRef(videoId);

  useEffect(() => {
    // Load YouTube IFrame API
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initializePlayer();
      } else if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        window.onYouTubeIframeAPIReady = initializePlayer;
      }
    };

    const initializePlayer = () => {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1
        },
        events: {
          onReady: (event) => {
            console.log('Player ready');
            setIsReady(true);
            currentVideoRef.current = videoId;
          },
          onStateChange: async (event) => {
            if (!isHost || isUpdatingRef.current) return;

            const state = event.data;
            const currentTime = playerRef.current?.getCurrentTime() || 0;

            let playerState = 'paused';
            if (state === window.YT.PlayerState.PLAYING) {
              playerState = 'playing';
            } else if (state === window.YT.PlayerState.PAUSED) {
              playerState = 'paused';
            } else if (state === window.YT.PlayerState.ENDED) {
              playerState = 'ended';
            }

            const now = Date.now();
            if (now - lastUpdateRef.current < 500) return;
            lastUpdateRef.current = now;

            try {
              await db.collection('musicRooms').doc(roomId).update({
                playerState,
                currentTime,
                lastUpdate: Date.now()
              });
              console.log('Host updated:', playerState, currentTime);
            } catch (error) {
              console.error('Error updating player state:', error);
            }
          }
        }
      });
    };

    loadYouTubeAPI();

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [isHost, roomId, videoId]);

  // Handle video changes
  useEffect(() => {
    if (isReady && playerRef.current && videoId && currentVideoRef.current !== videoId) {
      console.log('Loading new video:', videoId);
      currentVideoRef.current = videoId;
      playerRef.current.loadVideoById(videoId);
    }
  }, [videoId, isReady]);

  // Host: Periodic sync only when playing (like Discord)
  useEffect(() => {
    if (isHost && isReady && playerRef.current) {
      syncIntervalRef.current = setInterval(async () => {
        if (playerRef.current && playerRef.current.getPlayerState && 
            playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
          const currentTime = playerRef.current.getCurrentTime();
          try {
            // Only update if time has actually changed
            await db.collection('musicRooms').doc(roomId).update({
              currentTime,
              lastUpdate: Date.now()
            });
          } catch (error) {
            console.error('Error syncing time:', error);
          }
        }
      }, 3000); // Update every 3 seconds only when playing

      return () => {
        if (syncIntervalRef.current) {
          clearInterval(syncIntervalRef.current);
        }
      };
    }
  }, [isHost, isReady, roomId]);

  // Viewer: Listen to changes and sync (Discord-style)
  useEffect(() => {
    if (!isHost && isReady && playerRef.current) {
      const unsubscribe = db.collection('musicRooms').doc(roomId)
        .onSnapshot((doc) => {
          if (doc.exists && playerRef.current && !isUpdatingRef.current) {
            const data = doc.data();
            const player = playerRef.current;

            try {
              const currentTime = player.getCurrentTime() || 0;
              const targetTime = data.currentTime || 0;
              const timeDiff = Math.abs(currentTime - targetTime);
              const currentState = player.getPlayerState();

              // Only sync if there's a significant difference (Discord-style)
              if (timeDiff > 2) {
                setIsSyncing(true);
                player.seekTo(targetTime, true);
                setTimeout(() => setIsSyncing(false), 1000);
              }

              // Sync play/pause state immediately
              if (data.playerState === 'playing' && currentState !== window.YT.PlayerState.PLAYING) {
                player.playVideo();
              } else if (data.playerState === 'paused' && currentState === window.YT.PlayerState.PLAYING) {
                player.pauseVideo();
              }
            } catch (error) {
              console.error('Error syncing player:', error);
            }
          }
        });

      return () => unsubscribe();
    }
  }, [isHost, isReady, roomId]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <div id="youtube-player" ref={playerContainerRef} className="w-full h-full"></div>
      {!isHost && (
        <div className="absolute top-2 right-2 bg-[#e94560] text-[#fffded] px-3 py-1 rounded-full text-xs font-bold">
          {isSyncing ? 'Syncing...' : 'Viewer Mode'}
        </div>
      )}
      {isHost && (
        <div className="absolute top-2 right-2 bg-[#1DB954] text-[#fffded] px-3 py-1 rounded-full text-xs font-bold">
          Host Controls
        </div>
      )}
    </div>
  );
}

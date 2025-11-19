import { useEffect, useRef, useState } from 'react';

export default function YouTubePlayer({ videoId, roomId, isHost, playbackState, onPlayerAction }) {
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const syncIntervalRef = useRef(null);
  const currentVideoRef = useRef(videoId);
  const lastActionRef = useRef({ state: null, time: 0 });
  const lastSyncTimeRef = useRef(0);
  const pausedTimeRef = useRef(0); // Store time when paused

  useEffect(() => {
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
      if (playerRef.current || !videoId) return;

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
          onReady: () => {
            console.log('Player ready');
            setIsReady(true);
            currentVideoRef.current = videoId;
          },
          onStateChange: async (event) => {
            if (!isHost || !onPlayerAction) return;

            const state = event.data;
            const currentTime = playerRef.current?.getCurrentTime() || 0;
            const now = Date.now();

            // Only handle PLAYING and PAUSED states
            if (state !== window.YT.PlayerState.PLAYING && state !== window.YT.PlayerState.PAUSED) {
              return;
            }

            // Check if this is the same state we just sent (prevent duplicate sends)
            if (lastActionRef.current.state === state && now - lastActionRef.current.time < 2000) {
              console.log('[HOST] Skipping duplicate state:', state);
              return;
            }

            // Debounce rapid state changes
            if (now - lastSyncTimeRef.current < 500) {
              console.log('[HOST] Debouncing rapid change');
              return;
            }

            lastSyncTimeRef.current = now;
            lastActionRef.current = { state, time: now };

            try {
              if (state === window.YT.PlayerState.PLAYING) {
                // Use paused time if we just unpaused, otherwise use current time
                const timeToSend = pausedTimeRef.current > 0 ? pausedTimeRef.current : currentTime;
                console.log('[HOST] Sending play action, time:', timeToSend, '(current:', currentTime, ', paused:', pausedTimeRef.current, ')');
                await onPlayerAction('play', { currentTime: timeToSend });
                pausedTimeRef.current = 0; // Reset after using
              } else if (state === window.YT.PlayerState.PAUSED) {
                // Store the current time when pausing
                pausedTimeRef.current = currentTime;
                console.log('[HOST] Sending pause action, storing time:', currentTime);
                await onPlayerAction('pause');
              }
            } catch (error) {
              console.error('Error updating player state:', error);
            }
          }
        }
      });
    };

    if (videoId) {
      loadYouTubeAPI();
    }

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [isHost, onPlayerAction, videoId]);

  // Handle video changes
  useEffect(() => {
    if (isReady && playerRef.current && videoId && currentVideoRef.current !== videoId) {
      console.log('Loading new video:', videoId);
      currentVideoRef.current = videoId;
      playerRef.current.loadVideoById(videoId);
    }
  }, [videoId, isReady]);

  // Sync playback state from room (VIEWERS ONLY)
  useEffect(() => {
    // Host never syncs - they are the source of truth
    if (isHost) return;
    
    if (!isReady || !playerRef.current || !playbackState) return;

    const player = playerRef.current;

    const syncPlayer = () => {
      try {
        const currentState = player.getPlayerState();
        const currentTime = player.getCurrentTime() || 0;
        const targetTime = playbackState.currentTime || 0;
        
        // Calculate the actual target time if video is playing
        let adjustedTargetTime = targetTime;
        if (playbackState.isPlaying && playbackState.timestamp) {
          const elapsed = (Date.now() - playbackState.timestamp) / 1000;
          adjustedTargetTime = targetTime + elapsed;
        }
        
        console.log('[VIEWER] Sync - isPlaying:', playbackState.isPlaying, 'targetTime:', targetTime, 'adjusted:', adjustedTargetTime);
        
        const timeDiff = Math.abs(currentTime - adjustedTargetTime);

        // Sync play/pause state FIRST
        if (playbackState.isPlaying && currentState !== window.YT.PlayerState.PLAYING) {
          console.log('[VIEWER] Playing video at time:', adjustedTargetTime);
          setIsSyncing(true);
          // Seek to correct time BEFORE playing
          player.seekTo(adjustedTargetTime, true);
          player.playVideo();
          setTimeout(() => setIsSyncing(false), 500);
        } else if (!playbackState.isPlaying && currentState === window.YT.PlayerState.PLAYING) {
          console.log('[VIEWER] Pausing video at time:', adjustedTargetTime);
          setIsSyncing(true);
          player.pauseVideo();
          setTimeout(() => setIsSyncing(false), 500);
        } else if (playbackState.isPlaying && timeDiff > 2) {
          // Only sync time if already playing and drift is significant
          console.log('[VIEWER] Syncing time:', currentTime, '->', adjustedTargetTime);
          player.seekTo(adjustedTargetTime, true);
        }
      } catch (error) {
        console.error('Error syncing player:', error);
      }
    };

    syncPlayer();
  }, [playbackState.isPlaying, playbackState.currentTime, playbackState.timestamp, isReady, isHost, playbackState]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <div id="youtube-player" className="w-full h-full"></div>
      {!isHost && (
        <div className="absolute top-2 right-2 bg-red-600 text-[#fffded] px-3 py-1 rounded-full text-xs font-bold">
          {isSyncing ? '🔄 Syncing...' : '👁 Viewer'}
        </div>
      )}
      {isHost && (
        <div className="absolute top-2 right-2 bg-green-600 text-[#fffded] px-3 py-1 rounded-full text-xs font-bold">
          👑 Host
        </div>
      )}
    </div>
  );
}

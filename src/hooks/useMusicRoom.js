import { useState, useEffect, useRef, useCallback } from 'react';
import { CloudflareRoomAPI } from '@/lib/cloudflare-room';

const ACTIVE_POLL_INTERVAL = 5000; // 5s (reduced from 3s to save requests)
const INACTIVE_POLL_INTERVAL = 15000; // 15s
const HEARTBEAT_INTERVAL = 20000; // 20s

export function useMusicRoom(roomId, userId, userName, userImage) {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const lastUpdateRef = useRef(0);
  const pollIntervalRef = useRef(null);
  const heartbeatIntervalRef = useRef(null);
  const isActiveTabRef = useRef(true);

  const fetchRoomState = useCallback(async () => {
    try {
      const data = await CloudflareRoomAPI.getRoomState(roomId);

      if (data.lastUpdate > lastUpdateRef.current) {
        setRoom(data);
        lastUpdateRef.current = data.lastUpdate;
      }

      setIsLoading(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsLoading(false);
    }
  }, [roomId]);

  const sendHeartbeat = useCallback(async () => {
    try {
      await CloudflareRoomAPI.sendHeartbeat(roomId, userId, userName, userImage);
    } catch (err) {
      console.error('Heartbeat failed:', err);
    }
  }, [roomId, userId, userName, userImage]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      isActiveTabRef.current = !document.hidden;

      if (isActiveTabRef.current) {
        fetchRoomState();
        sendHeartbeat();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [fetchRoomState, sendHeartbeat]);

  useEffect(() => {
    fetchRoomState();

    const startPolling = () => {
      const interval = isActiveTabRef.current
        ? ACTIVE_POLL_INTERVAL
        : INACTIVE_POLL_INTERVAL;

      pollIntervalRef.current = setInterval(fetchRoomState, interval);
    };

    startPolling();

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [fetchRoomState]);

  useEffect(() => {
    sendHeartbeat();

    heartbeatIntervalRef.current = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);

    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, [sendHeartbeat]);

  const performAction = useCallback(
    async (action, data) => {
      try {
        const updatedRoom = await CloudflareRoomAPI.performAction(
          roomId,
          action,
          userId,
          data
        );
        setRoom(updatedRoom);
        lastUpdateRef.current = updatedRoom.lastUpdate;
        return updatedRoom;
      } catch (err) {
        console.error('Action error:', err);
        throw err;
      }
    },
    [roomId, userId]
  );

  return {
    room,
    isLoading,
    error,
    actions: {
      play: (currentTime) => performAction('play', { currentTime }),
      pause: () => performAction('pause'),
      seek: (currentTime) => performAction('seek', { currentTime }),
      changeTrack: (track, autoPlay = true) =>
        performAction('change_track', { track, autoPlay }),
      addToQueue: (track) => performAction('add_to_queue', { track }),
      removeFromQueue: (position) => performAction('remove_from_queue', { position }),
    },
  };
}

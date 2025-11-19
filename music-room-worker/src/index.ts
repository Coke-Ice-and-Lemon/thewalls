export interface Env {
  DB: D1Database;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function handleOptions() {
  return new Response(null, { headers: corsHeaders });
}

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (request.method === 'GET' && path.match(/^\/room\/[^/]+$/)) {
        const roomId = path.split('/')[2];
        return await getRoomState(env.DB, roomId);
      }

      if (request.method === 'POST' && path === '/room') {
        const body = await request.json();
        return await createRoom(env.DB, body);
      }

      if (request.method === 'POST' && path.match(/^\/room\/[^/]+\/action$/)) {
        const roomId = path.split('/')[2];
        const body = await request.json();
        return await performAction(env.DB, roomId, body);
      }

      if (request.method === 'POST' && path.match(/^\/room\/[^/]+\/heartbeat$/)) {
        const roomId = path.split('/')[2];
        const body = await request.json();
        return await userHeartbeat(env.DB, roomId, body);
      }

      return jsonResponse({ error: 'Not found' }, 404);
    } catch (error) {
      console.error('Worker error:', error);
      return jsonResponse({ error: 'Internal server error' }, 500);
    }
  },
};

async function getRoomState(db: D1Database, roomId: string) {
  const room = await db
    .prepare('SELECT * FROM rooms WHERE id = ?')
    .bind(roomId)
    .first();

  if (!room) {
    return jsonResponse({ error: 'Room not found' }, 404);
  }

  const playback = await db
    .prepare('SELECT * FROM room_playback WHERE room_id = ?')
    .bind(roomId)
    .first();

  const queue = await db
    .prepare('SELECT * FROM room_queue WHERE room_id = ? ORDER BY position')
    .bind(roomId)
    .all();

  const thirtySecondsAgo = Date.now() - 30000;
  const users = await db
    .prepare('SELECT user_id, user_name, user_image, last_seen FROM room_users WHERE room_id = ? AND last_seen > ?')
    .bind(roomId, thirtySecondsAgo)
    .all();

  let adjustedPlayback = playback;
  if (playback && playback.is_playing) {
    const elapsed = (Date.now() - (playback.timestamp as number)) / 1000;
    const newTime = (playback.current_time as number) + elapsed;
    // Only limit by duration if we have a valid duration
    const finalTime = (playback.track_duration && playback.track_duration > 0) 
      ? Math.min(newTime, playback.track_duration as number)
      : newTime;
    adjustedPlayback = { ...playback, current_time: finalTime };
  }

  return jsonResponse({
    id: room.id,
    name: room.name,
    createdBy: room.created_by,
    currentTrack: playback ? {
      url: playback.track_url,
      title: playback.track_title,
      artist: playback.track_artist,
      duration: playback.track_duration,
    } : null,
    playbackState: adjustedPlayback ? {
      isPlaying: Boolean(adjustedPlayback.is_playing),
      currentTime: adjustedPlayback.current_time,
      timestamp: adjustedPlayback.timestamp,
    } : { isPlaying: false, currentTime: 0, timestamp: Date.now() },
    queue: queue.results || [],
    users: users.results || [],
    lastUpdate: room.last_update,
  });
}

async function createRoom(db: D1Database, body: any) {
  const { roomId, name, userId, userName, userImage } = body;
  const now = Date.now();

  try {
    await db
      .prepare('INSERT INTO rooms (id, name, created_by, created_at, last_update) VALUES (?, ?, ?, ?, ?)')
      .bind(roomId, name, userId, now, now)
      .run();

    await db
      .prepare('INSERT INTO room_playback (room_id, timestamp) VALUES (?, ?)')
      .bind(roomId, now)
      .run();

    await db
      .prepare('INSERT INTO room_users (room_id, user_id, user_name, user_image, last_seen) VALUES (?, ?, ?, ?, ?)')
      .bind(roomId, userId, userName, userImage, now)
      .run();

    return jsonResponse({ success: true, roomId });
  } catch (error) {
    return jsonResponse({ error: 'Room already exists or creation failed' }, 400);
  }
}

async function performAction(db: D1Database, roomId: string, body: any) {
  const { action, userId, data } = body;
  const now = Date.now();

  try {
    const playback = await db
      .prepare('SELECT * FROM room_playback WHERE room_id = ?')
      .bind(roomId)
      .first();

    if (!playback) {
      return jsonResponse({ error: 'Room not found' }, 404);
    }

    let updates: any = {};

    switch (action) {
      case 'play':
        const playTime = data?.currentTime ?? playback.current_time;
        console.log('[WORKER] Play action - data.currentTime:', data?.currentTime, 'playback.current_time:', playback.current_time, 'using:', playTime);
        updates = {
          is_playing: 1,
          current_time: playTime,
          timestamp: now,
        };
        break;

      case 'pause':
        const elapsed = playback.is_playing 
          ? (now - playback.timestamp) / 1000 
          : 0;
        updates = {
          is_playing: 0,
          current_time: playback.current_time + elapsed,
          timestamp: now,
        };
        break;

      case 'seek':
        updates = {
          current_time: data.currentTime,
          timestamp: now,
        };
        break;

      case 'change_track':
        updates = {
          track_url: data.track.url,
          track_title: data.track.title,
          track_artist: data.track.artist || null,
          track_duration: data.track.duration,
          is_playing: data.autoPlay ? 1 : 0,
          current_time: 0,
          timestamp: now,
        };
        break;

      case 'add_to_queue':
        const maxPos = await db
          .prepare('SELECT MAX(position) as max_pos FROM room_queue WHERE room_id = ?')
          .bind(roomId)
          .first();
        
        const position = (maxPos?.max_pos ?? -1) + 1;
        
        await db
          .prepare('INSERT INTO room_queue (id, room_id, track_url, track_title, track_artist, added_by, position, added_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
          .bind(
            `${roomId}-${now}`,
            roomId,
            data.track.url,
            data.track.title,
            data.track.artist || null,
            userId,
            position,
            now
          )
          .run();
        
        await db
          .prepare('UPDATE rooms SET last_update = ? WHERE id = ?')
          .bind(now, roomId)
          .run();
        
        return await getRoomState(db, roomId);

      case 'remove_from_queue':
        await db
          .prepare('DELETE FROM room_queue WHERE room_id = ? AND position = ?')
          .bind(roomId, data.position)
          .run();
        
        await db
          .prepare('UPDATE room_queue SET position = position - 1 WHERE room_id = ? AND position > ?')
          .bind(roomId, data.position)
          .run();
        
        await db
          .prepare('UPDATE rooms SET last_update = ? WHERE id = ?')
          .bind(now, roomId)
          .run();
        
        return await getRoomState(db, roomId);

      default:
        return jsonResponse({ error: 'Unknown action' }, 400);
    }

    const setClause = Object.keys(updates)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = Object.values(updates);

    await db
      .prepare(`UPDATE room_playback SET ${setClause} WHERE room_id = ?`)
      .bind(...values, roomId)
      .run();

    await db
      .prepare('UPDATE rooms SET last_update = ? WHERE id = ?')
      .bind(now, roomId)
      .run();

    console.log('[WORKER] Updated playback state:', updates);
    
    return await getRoomState(db, roomId);
  } catch (error) {
    console.error('Action error:', error);
    return jsonResponse({ error: 'Action failed' }, 500);
  }
}

async function userHeartbeat(db: D1Database, roomId: string, body: any) {
  const { userId, userName, userImage } = body;
  const now = Date.now();

  try {
    await db
      .prepare(`
        INSERT INTO room_users (room_id, user_id, user_name, user_image, last_seen)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(room_id, user_id) 
        DO UPDATE SET user_name = ?, user_image = ?, last_seen = ?
      `)
      .bind(roomId, userId, userName, userImage, now, userName, userImage, now)
      .run();

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ error: 'Heartbeat failed' }, 500);
  }
}

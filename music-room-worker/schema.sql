-- Rooms table
CREATE TABLE rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  last_update INTEGER NOT NULL
);

-- Current playback state (one row per room)
CREATE TABLE room_playback (
  room_id TEXT PRIMARY KEY,
  track_url TEXT,
  track_title TEXT,
  track_artist TEXT,
  track_duration INTEGER,
  is_playing INTEGER DEFAULT 0,
  current_time REAL DEFAULT 0,
  timestamp INTEGER NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Queue items
CREATE TABLE room_queue (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  track_url TEXT NOT NULL,
  track_title TEXT NOT NULL,
  track_artist TEXT,
  added_by TEXT NOT NULL,
  position INTEGER NOT NULL,
  added_at INTEGER NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Active users in room
CREATE TABLE room_users (
  room_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_image TEXT,
  last_seen INTEGER NOT NULL,
  PRIMARY KEY (room_id, user_id),
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_room_queue_room ON room_queue(room_id, position);
CREATE INDEX idx_room_users_room ON room_users(room_id);
CREATE INDEX idx_room_users_last_seen ON room_users(last_seen);

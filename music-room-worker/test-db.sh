#!/bin/bash

echo "=== ROOMS ==="
wrangler d1 execute music-rooms --local --command "SELECT * FROM rooms"

echo ""
echo "=== ROOM PLAYBACK ==="
wrangler d1 execute music-rooms --local --command "SELECT * FROM room_playback"

echo ""
echo "=== ROOM QUEUE ==="
wrangler d1 execute music-rooms --local --command "SELECT * FROM room_queue"

echo ""
echo "=== ROOM USERS ==="
wrangler d1 execute music-rooms --local --command "SELECT * FROM room_users"

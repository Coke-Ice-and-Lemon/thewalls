# Music Room Worker

Cloudflare Worker + D1 backend for synchronized music room playback.

## Quick Start

```bash
# Install dependencies
npm install

# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create music-rooms

# Update wrangler.toml with database_id

# Apply schema
wrangler d1 execute music-rooms --local --file=./schema.sql
wrangler d1 execute music-rooms --file=./schema.sql

# Start local development
wrangler dev --local

# Deploy to production
wrangler deploy
```

## API Endpoints

### GET /room/:roomId
Get current room state including playback, queue, and users.

### POST /room
Create a new room.

Body:
```json
{
  "roomId": "room-123",
  "name": "My Room",
  "userId": "user@example.com",
  "userName": "John Doe",
  "userImage": "https://..."
}
```

### POST /room/:roomId/action
Perform an action (play, pause, seek, change_track, add_to_queue, remove_from_queue).

Body:
```json
{
  "action": "play",
  "userId": "user@example.com",
  "data": { "currentTime": 0 }
}
```

### POST /room/:roomId/heartbeat
Send user presence heartbeat.

Body:
```json
{
  "userId": "user@example.com",
  "userName": "John Doe",
  "userImage": "https://..."
}
```

## Database Schema

- **rooms**: Room metadata
- **room_playback**: Current playback state per room
- **room_queue**: Queue items per room
- **room_users**: Active users per room

## Free Tier Limits

- 100,000 requests/day
- 5M database reads/day
- 100K database writes/day

Perfect for 100+ concurrent users at $0/month!

# Quick Setup Commands

Run these commands in order:

```bash
# 1. Install Wrangler globally (if not already installed)
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Install dependencies
npm install

# 4. Create D1 database
wrangler d1 create music-rooms

# 5. Copy the database_id from output and update wrangler.toml

# 6. Apply schema to local database
wrangler d1 execute music-rooms --local --file=./schema.sql

# 7. Apply schema to production database
wrangler d1 execute music-rooms --file=./schema.sql

# 8. Test locally
wrangler dev --local

# 9. Deploy to production
wrangler deploy
```

## Testing the API

Once running locally, test with curl:

```bash
# Create a room
curl -X POST http://localhost:8787/room \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "test-room-123",
    "name": "Test Room",
    "userId": "user1@test.com",
    "userName": "Test User",
    "userImage": "https://example.com/avatar.jpg"
  }'

# Get room state
curl http://localhost:8787/room/test-room-123

# Add video to queue
curl -X POST http://localhost:8787/room/test-room-123/action \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add_to_queue",
    "userId": "user1@test.com",
    "data": {
      "track": {
        "url": "dQw4w9WgXcQ",
        "title": "Test Video",
        "artist": "Test Artist",
        "duration": 213
      }
    }
  }'

# Play
curl -X POST http://localhost:8787/room/test-room-123/action \
  -H "Content-Type: application/json" \
  -d '{
    "action": "play",
    "userId": "user1@test.com",
    "data": { "currentTime": 0 }
  }'
```

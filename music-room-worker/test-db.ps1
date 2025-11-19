Write-Host "=== ROOMS ===" -ForegroundColor Green
wrangler d1 execute music-rooms --local --command "SELECT * FROM rooms"

Write-Host "`n=== ROOM PLAYBACK ===" -ForegroundColor Green
wrangler d1 execute music-rooms --local --command "SELECT * FROM room_playback"

Write-Host "`n=== ROOM QUEUE ===" -ForegroundColor Green
wrangler d1 execute music-rooms --local --command "SELECT * FROM room_queue"

Write-Host "`n=== ROOM USERS ===" -ForegroundColor Green
wrangler d1 execute music-rooms --local --command "SELECT * FROM room_users"

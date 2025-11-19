# Test script to check what the API is returning

Write-Host "Testing room state..." -ForegroundColor Green

# Get your room ID from the URL
$roomId = Read-Host "Enter your room ID"

Write-Host "`nFetching room state..." -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "http://localhost:8787/room/$roomId" -Method Get

Write-Host "`nPlayback State:" -ForegroundColor Cyan
Write-Host "  isPlaying: $($response.playbackState.isPlaying)"
Write-Host "  currentTime: $($response.playbackState.currentTime)"
Write-Host "  timestamp: $($response.playbackState.timestamp)"

Write-Host "`nCurrent Track:" -ForegroundColor Cyan
Write-Host "  url: $($response.currentTrack.url)"
Write-Host "  title: $($response.currentTrack.title)"

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

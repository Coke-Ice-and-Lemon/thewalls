# Music Room Feature Setup

## Overview
The Music Room feature allows 2-8 users to watch YouTube videos together in real-time with synchronized playback and lyrics display.

## Features
- Create and join music rooms (2-8 participants)
- Real-time synchronized YouTube video playback
- Host controls for video selection and playback
- Automatic lyrics fetching and display
- Participant list with host indicator
- Firebase Firestore for real-time synchronization

## Setup Instructions

### 1. Firebase Firestore Setup

**IMPORTANT:** You must set up Firestore before using Music Rooms.

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `thewalls-1955b`
3. Click on "Firestore Database" in the left menu
4. Click "Create database"
5. Choose "Start in test mode" (or production mode with rules)
6. Select a location (choose closest to your users)
7. Click "Enable"

**Set up Firestore Rules:**
1. In Firestore Database, go to the "Rules" tab
2. Replace the rules with the content from `firestore.rules` file
3. Click "Publish"

The following collections will be created automatically:
- `musicRooms` - Stores room data and state

### 2. YouTube API Key (Optional for Lyrics)
To enable lyrics functionality, add a YouTube Data API key to your `.env.local`:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
```

To get a YouTube API key:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add the key to your `.env.local`

### 3. Install Dependencies
All required dependencies are already in your package.json. Just run:

```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```

## Usage

### Creating a Room
1. Navigate to `/music-room`
2. Click "Create Room"
3. Enter a room name
4. You'll be redirected to your new room as the host

### Joining a Room
1. Navigate to `/music-room`
2. Browse available rooms
3. Click "Join Room" on any room with available space

### Adding Videos (Host Only)
1. As the host, click "Add Video"
2. Paste a YouTube URL
3. The video will start playing for all participants

### Synchronized Playback
- Host controls the playback (play, pause, seek)
- All participants see the same video at the same time
- Automatic sync if participants fall behind

### Lyrics Display
- Lyrics are automatically fetched when available
- Displayed below the video player
- Updates when video changes

## File Structure

```
src/
├── pages/
│   ├── music-room.js          # Room listing and creation
│   ├── room/
│   │   └── [roomId].js        # Individual room page
│   └── api/
│       └── lyrics.js          # Lyrics API endpoint
├── components/
│   ├── YouTubePlayer.js       # YouTube IFrame API integration
│   ├── LyricsPanel.js         # Lyrics display component
│   └── Navbar.js              # Updated with Music Room link
```

## Technical Details

### YouTube IFrame API
The player uses the official YouTube IFrame API for:
- Video embedding
- Playback control
- State synchronization
- Time tracking

### Firebase Realtime Sync
Room state is stored in Firestore with:
- `currentVideo` - Current video ID
- `playerState` - playing/paused/ended
- `currentTime` - Current playback position
- `participants` - Array of participant objects
- `host` - Host user object

### Synchronization Logic
- Host updates trigger Firestore writes
- Participants listen to Firestore changes
- Auto-sync if time difference > 2 seconds
- Debounced updates to prevent spam

## Troubleshooting

### Videos not syncing
- Check Firebase connection
- Ensure Firestore rules allow read/write
- Check browser console for errors

### Lyrics not showing
- Verify YouTube API key is set
- Check if lyrics are available for the video
- Some videos may not have lyrics in the database

### Player not loading
- Ensure YouTube IFrame API script loads
- Check for browser console errors
- Verify video ID is valid

## Future Enhancements
- Queue system for multiple videos
- Chat functionality
- Voting system for next video
- Room passwords/privacy settings
- Custom playlists
- Better lyrics sources (Genius API, Musixmatch)

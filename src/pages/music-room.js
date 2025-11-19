import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { CloudflareRoomAPI } from '@/lib/cloudflare-room';

export default function MusicRoom() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const createRoom = async () => {
    if (!roomName.trim()) return;

    try {
      const roomId = `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      await CloudflareRoomAPI.createRoom(
        roomId,
        roomName,
        session.user.email,
        session.user.name,
        session.user.image
      );
      
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room: ' + error.message);
    }
  };

  const joinRoom = () => {
    if (!roomCode.trim()) {
      alert('Please enter a room code');
      return;
    }
    router.push(`/room/${roomCode}`);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#fffded] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Music Rooms - THE WALLS</title>
      </Head>

      <div className="min-h-screen p-6 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #0a0a0a, #1a1a1a)' }}>
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#fffded] mb-3">🎵 Music Rooms</h1>
            <p className="text-gray-400 text-lg">Listen to YouTube together in real-time</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-8 border border-gray-800 hover:border-green-500 transition">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">👑</div>
                <h2 className="text-2xl font-bold text-[#fffded] mb-2">Create Room</h2>
                <p className="text-gray-400 text-sm">Start a new music session as host</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-green-500 hover:bg-green-600 text-[#fffded] py-4 rounded font-bold text-lg transition"
              >
                Create New Room
              </button>
            </div>

            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-8 border border-gray-800 hover:border-blue-500 transition">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🚪</div>
                <h2 className="text-2xl font-bold text-[#fffded] mb-2">Join Room</h2>
                <p className="text-gray-400 text-sm">Enter a room code to join</p>
              </div>
              <button
                onClick={() => setShowJoinModal(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-[#fffded] py-4 rounded font-bold text-lg transition"
              >
                Join Existing Room
              </button>
            </div>
          </div>

          <div className="mt-12 bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-[#fffded] mb-4 text-center">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl mb-2">🎬</div>
                <p className="text-sm text-gray-400">Synchronized playback</p>
              </div>
              <div>
                <div className="text-2xl mb-2">📝</div>
                <p className="text-sm text-gray-400">Queue management</p>
              </div>
              <div>
                <div className="text-2xl mb-2">👥</div>
                <p className="text-sm text-gray-400">Up to 8 participants</p>
              </div>
            </div>
          </div>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-black bg-opacity-90 backdrop-blur-lg rounded-lg p-6 max-w-md w-full border border-gray-700">
              <h2 className="text-xl font-bold text-[#fffded] mb-4">🎵 Create Music Room</h2>
              <input
                type="text"
                placeholder="Enter room name..."
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createRoom()}
                className="w-full px-4 py-3 rounded bg-gray-800 text-[#fffded] mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700"
              />
              <div className="flex gap-3">
                <button
                  onClick={createRoom}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-[#fffded] py-3 rounded font-bold transition"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setRoomName('');
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-[#fffded] py-3 rounded font-bold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showJoinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-black bg-opacity-90 backdrop-blur-lg rounded-lg p-6 max-w-md w-full border border-gray-700">
              <h2 className="text-xl font-bold text-[#fffded] mb-4">🚪 Join Music Room</h2>
              <input
                type="text"
                placeholder="Enter room code..."
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && joinRoom()}
                className="w-full px-4 py-3 rounded bg-gray-800 text-[#fffded] mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
              />
              <div className="flex gap-3">
                <button
                  onClick={joinRoom}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-[#fffded] py-3 rounded font-bold transition"
                >
                  Join
                </button>
                <button
                  onClick={() => {
                    setShowJoinModal(false);
                    setRoomCode('');
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-[#fffded] py-3 rounded font-bold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

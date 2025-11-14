import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { db } from '@/firebase';
import Head from 'next/head';
import Image from 'next/image';

export default function MusicRoom() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      setLoading(true);
      const unsubscribe = db.collection('musicRooms')
        .where('isActive', '==', true)
        .onSnapshot(
          (snapshot) => {
            const roomsData = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setRooms(roomsData);
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching rooms:', error);
            setLoading(false);
            // If there's an error, just show empty rooms
            setRooms([]);
          }
        );

      return () => unsubscribe();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  const createRoom = async () => {
    if (!roomName.trim()) return;

    try {
      const roomData = {
        name: roomName,
        host: {
          id: session.user.email,
          name: session.user.name,
          image: session.user.image
        },
        participants: [{
          id: session.user.email,
          name: session.user.name,
          image: session.user.image
        }],
        currentVideo: null,
        playerState: 'paused',
        currentTime: 0,
        queue: [],
        currentQueueIndex: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        maxParticipants: 8
      };

      console.log('Creating room with data:', roomData);
      const docRef = await db.collection('musicRooms').add(roomData);
      console.log('Room created with ID:', docRef.id);
      router.push(`/room/${docRef.id}`);
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room: ' + error.message);
    }
  };

  const joinRoom = async (roomId, room) => {
    if (room.participants.length >= room.maxParticipants) {
      alert('Room is full!');
      return;
    }

    const isAlreadyInRoom = room.participants.some(p => p.id === session.user.email);
    
    if (!isAlreadyInRoom) {
      await db.collection('musicRooms').doc(roomId).update({
        participants: [...room.participants, {
          id: session.user.email,
          name: session.user.name,
          image: session.user.image
        }]
      });
    }

    router.push(`/room/${roomId}`);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#fffded] text-xl">Loading session...</div>
      </div>
    );
  }

  if (loading && status === 'authenticated') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#fffded] text-xl">Loading rooms...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Music Rooms - THE WALLS</title>
      </Head>

      <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom right, #0a0a0a, #1a1a1a)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 mt-20 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#fffded]">🎵 Music Rooms</h1>
              <p className="text-gray-400 text-sm mt-1">Listen together with friends</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-500 hover:bg-green-600 text-[#fffded] px-6 py-3 rounded font-bold transition"
            >
              + Create Room
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-5 border border-gray-800 hover:border-gray-700 transition"
              >
                <h3 className="text-lg font-bold text-[#fffded] mb-3">{room.name}</h3>
                <div className="flex items-center mb-3 bg-black bg-opacity-30 p-2 rounded">
                  <Image
                    src={room.host.image || '/default-avatar.png'}
                    alt={room.host.name}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <span className="text-[#fffded] ml-2 text-sm">👑 {room.host.name}</span>
                </div>
                <div className="text-gray-400 text-sm mb-4">
                  👥 {room.participants.length}/{room.maxParticipants} participants
                </div>
                <button
                  onClick={() => joinRoom(room.id, room)}
                  disabled={room.participants.length >= room.maxParticipants}
                  className={`w-full py-2 rounded font-bold transition ${
                    room.participants.length >= room.maxParticipants
                      ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                      : 'bg-green-500 hover:bg-green-600 text-[#fffded]'
                  }`}
                >
                  {room.participants.length >= room.maxParticipants ? '🔒 Full' : '🚪 Join Room'}
                </button>
              </div>
            ))}
          </div>

          {rooms.length === 0 && (
            <div className="text-center text-[#fffded] mt-20 bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-12">
              <p className="text-2xl mb-2">🎵</p>
              <p className="text-xl mb-4">No active rooms</p>
              <p className="text-gray-400 mb-6">Create a room to start listening with friends!</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-green-500 hover:bg-green-600 text-[#fffded] px-8 py-3 rounded font-bold transition"
              >
                Create Your First Room
              </button>
            </div>
          )}
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
      </div>
    </>
  );
}

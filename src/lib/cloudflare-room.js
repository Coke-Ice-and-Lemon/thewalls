const WORKER_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL || 
  'http://localhost:8787';

export class CloudflareRoomAPI {
  static async getRoomState(roomId) {
    const response = await fetch(`${WORKER_URL}/room/${roomId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch room state');
    }

    return response.json();
  }

  static async createRoom(roomId, name, userId, userName, userImage) {
    const response = await fetch(`${WORKER_URL}/room`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId, name, userId, userName, userImage }),
    });

    if (!response.ok) {
      throw new Error('Failed to create room');
    }

    return response.json();
  }

  static async performAction(roomId, action, userId, data) {
    const response = await fetch(`${WORKER_URL}/room/${roomId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, userId, data }),
    });

    if (!response.ok) {
      throw new Error('Action failed');
    }

    return response.json();
  }

  static async sendHeartbeat(roomId, userId, userName, userImage) {
    const response = await fetch(`${WORKER_URL}/room/${roomId}/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, userName, userImage }),
    });

    if (!response.ok) {
      throw new Error('Heartbeat failed');
    }

    return response.json();
  }
}

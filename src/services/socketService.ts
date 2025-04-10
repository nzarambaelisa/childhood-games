import { io, Socket } from 'socket.io-client';

class SocketService {
  public socket: Socket | null = null;

  connect() {
    this.socket = io('http://localhost:3001');
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService();
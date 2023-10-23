import { io } from 'socket.io-client';
export default class SocketIoService {
    socket;
    setupSocketConnection() {
        this.socket = io("http://localhost:3000");
    };



}
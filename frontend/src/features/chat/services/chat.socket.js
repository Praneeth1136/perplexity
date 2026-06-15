
import { io } from "socket.io-client"


export const initializeSocketConnection = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const socket = io(BACKEND_URL, {
        withCredentials: true
    })

    socket.on("connect", () => {
        console.log("Socket connected: ", socket.id)
    })
}
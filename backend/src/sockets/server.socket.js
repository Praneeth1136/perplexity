import {Server} from "socket.io"

let io;

export function initSocket(httpServer){
    io = new Server(httpServer,{
        cors:{
            origin:process.env.FRONTEND_URL,
            credentials:true

        }
    })
}
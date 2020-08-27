import  express  from 'express';
import http from 'http'
import socket from 'socket.io'

export default (application:express.Application) => {
    const server = http.createServer(application)
    const io = socket(server)
    io.on('connection', socket => {
        const NEW_GAME_MOVE_EVENT = "NEW_GAME_MOVE";
        const NEW_CLIENT_CONNECTED = "NEW_CLIENT_CONNECTED"
        const NEXT_PLAYER = "NEXT_PLAYER"
        const PLAYER_CHOSEN = "PLAYER_CHOSEN"
        const ROOM_CHOSEN = "ROOM_CHOSEN"


        console.log(`Client ${socket.id} connected`);
        // Join a room
        const { roomId } = socket.handshake.query;
        socket.join(roomId);
        const data = { id: socket.id }
        io.in(roomId).emit(NEW_CLIENT_CONNECTED, data);

        // Listen for new move
        socket.on(NEW_GAME_MOVE_EVENT, (data) => {
            io.in(roomId).emit(NEW_GAME_MOVE_EVENT, data);
        });

        socket.on(NEXT_PLAYER, () => {
            io.in(roomId).emit(NEXT_PLAYER);
        });

        socket.on(PLAYER_CHOSEN,(user) => {
            io.emit(PLAYER_CHOSEN,user)
        })


        socket.on(ROOM_CHOSEN,(room) => {
            io.emit(ROOM_CHOSEN,room)
        })

        // Leave the room if the user closes the socket
        socket.on("disconnect", () => {
            console.log(`Client ${socket.id} diconnected`);
            socket.leave(roomId);
        });
    })

    return server
}
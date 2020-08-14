import dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import express from 'express'
import socket from 'socket.io'
const app:express.Application = express()

const server = http.createServer(app)
const io = socket(server)

io.on('connection',socket => {
    console.log(`Client ${socket.id} connected`);

    // Join a conversation
    // const { roomId } = socket.handshake.query;
    // socket.join(roomId);
  
    // Listen for new messages
    // socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    //   io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    // });
  
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} diconnected`);
    //   socket.leave(roomId);
    });
})




server.listen(process.env.PORT,() => console.log(`Server is started on port ${process.env.PORT}`))

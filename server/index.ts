import dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import express from 'express'
import socket from 'socket.io'
import db from './utils/database'
import rooms from './routes/rooms'
import Room from "./models/rooms"
const app:express.Application = express()

const server = http.createServer(app)
const io = socket(server)

// Middleware
app.use(express.json())


db.on('connect',() =>   console.log('Database connected'))



db.on('error',() => console.log('Failed to connect db...'))

app.use('/api/rooms',rooms)

io.on('connection',socket => {
  const NEW_GAME_MOVE_EVENT = "NEW_GAME_MOVE";
  const NEW_CLIENT_CONNECTED =  "NEW_CLIENT_CONNECTED"
  const  NEXT_PLAYER = "NEXT_PLAYER"
    console.log(`Client ${socket.id} connected`);
    // Join a room
    const { roomId } = socket.handshake.query;
    socket.join(roomId);
    const data = {id:socket.id}
    io.in(roomId).emit(NEW_CLIENT_CONNECTED, data);
  
    // Listen for new move
    socket.on(NEW_GAME_MOVE_EVENT, (data) => {
      io.in(roomId).emit(NEW_GAME_MOVE_EVENT, data);
    });

    socket.on(NEXT_PLAYER, () => {
      io.in(roomId).emit(NEXT_PLAYER);
    });
  
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} diconnected`);
      socket.leave(roomId);
    });
})




server.listen(process.env.PORT,() => console.log(`Server is started on port ${process.env.PORT}`))

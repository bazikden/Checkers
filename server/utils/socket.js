"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
exports.default = (function (application) {
    var server = http_1.default.createServer(application);
    var io = socket_io_1.default(server);
    io.on('connection', function (socket) {
        var NEW_GAME_MOVE_EVENT = "NEW_GAME_MOVE";
        var NEW_CLIENT_CONNECTED = "NEW_CLIENT_CONNECTED";
        var NEXT_PLAYER = "NEXT_PLAYER";
        var PLAYER_CHOSEN = "PLAYER_CHOSEN";
        var ROOM_CHOSEN = "ROOM_CHOSEN";
        console.log("Client " + socket.id + " connected");
        // Join a room
        var roomId = socket.handshake.query.roomId;
        socket.join(roomId);
        var data = { id: socket.id };
        io.in(roomId).emit(NEW_CLIENT_CONNECTED, data);
        // Listen for new move
        socket.on(NEW_GAME_MOVE_EVENT, function (data) {
            io.in(roomId).emit(NEW_GAME_MOVE_EVENT, data);
        });
        socket.on(NEXT_PLAYER, function () {
            io.in(roomId).emit(NEXT_PLAYER);
        });
        socket.on(PLAYER_CHOSEN, function (user) {
            io.emit(PLAYER_CHOSEN, user);
        });
        socket.on(ROOM_CHOSEN, function (room) {
            io.emit(ROOM_CHOSEN, room);
        });
        // Leave the room if the user closes the socket
        socket.on("disconnect", function () {
            console.log("Client " + socket.id + " diconnected");
            socket.leave(roomId);
        });
    });
    return server;
});

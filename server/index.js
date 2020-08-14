"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
io.on('connection', function (socket) {
    console.log("Client " + socket.id + " connected");
    // Join a conversation
    // const { roomId } = socket.handshake.query;
    // socket.join(roomId);
    // Listen for new messages
    // socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    //   io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    // });
    // Leave the room if the user closes the socket
    socket.on("disconnect", function () {
        console.log("Client " + socket.id + " diconnected");
        //   socket.leave(roomId);
    });
});
server.listen(process.env.PORT, function () { return console.log("Server is started on port " + process.env.PORT); });

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
var database_1 = __importDefault(require("./utils/database"));
var rooms_1 = __importDefault(require("./routes/rooms"));
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
// Middleware
app.use(express_1.default.json());
database_1.default.on('connect', function () { return console.log('Database connected'); });
database_1.default.on('error', function () { return console.log('Failed to connect db...'); });
app.use('/api/rooms', rooms_1.default);
io.on('connection', function (socket) {
    var NEW_GAME_MOVE_EVENT = "NEW_GAME_MOVE";
    var NEW_CLIENT_CONNECTED = "NEW_CLIENT_CONNECTED";
    var NEXT_PLAYER = "NEXT_PLAYER";
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
    // Leave the room if the user closes the socket
    socket.on("disconnect", function () {
        console.log("Client " + socket.id + " diconnected");
        socket.leave(roomId);
    });
});
server.listen(process.env.PORT, function () { return console.log("Server is started on port " + process.env.PORT); });

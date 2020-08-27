"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var database_1 = __importDefault(require("./utils/database"));
var rooms_1 = __importDefault(require("./routes/rooms"));
var socket_1 = __importDefault(require("./utils/socket"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var server = socket_1.default(app);
// Middleware
app.use(express_1.default.json());
database_1.default.on('connect', function () { return console.log('Database connected'); });
database_1.default.on('error', function () { return console.log('Failed to connect db...'); });
app.use('/api/rooms', rooms_1.default);
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express_1.default.static('../client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path_1.default.join(__dirname + '../client/build/index.html'));
    });
}
server.listen(process.env.PORT, function () { return console.log("Server is started on port " + process.env.PORT); });

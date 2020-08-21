"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var rooms_1 = require("../controllers/rooms");
router.route('/').get(rooms_1.getRooms).post(rooms_1.addRoom);
router.route("/:id").get(rooms_1.getRoom);
exports.default = router;

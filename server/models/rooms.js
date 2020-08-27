"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var RoomSchema = new mongoose_1.Schema({
    name: { type: String },
    player1: { type: String, default: "none" },
    player2: { type: String, default: "none" },
    isbuzy: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true } });
RoomSchema.virtual('playersCount').get(function () {
    var count = 0;
    if (this.player1 !== 'none') {
        count += 1;
    }
    if (this.player2 !== 'none') {
        count += 1;
    }
    return count;
});
exports.default = mongoose_1.default.model('Room', RoomSchema);

import mongoose, { Schema, Document } from 'mongoose';



const RoomSchema: Schema = new Schema({
    name: { type: String },
    player1: { type: String,default:"none" },
    player2: { type: String,default:"none" },
    isbuzy: { type: Boolean, default:false }

}, { timestamps: true });

RoomSchema.pre('update', function (next: Function) {
    console.log("PreUpdate", this)
    next()
})

export default mongoose.model('Room', RoomSchema);
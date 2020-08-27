import mongoose, { Schema, Document } from 'mongoose';



const RoomSchema: Schema = new Schema({
    name: { type: String },
    player1: { type: String,default:"none" },
    player2: { type: String,default:"none" },
    isbuzy: { type: Boolean, default:false }

}, { timestamps: true, toJSON:{virtuals:true} }); 

RoomSchema.virtual('playersCount').get(function(this:{player1:string,player2:string}){
    let count = 0
    if(this.player1 !== 'none'){ count += 1}
    if(this.player2 !== 'none'){ count += 1}
    return count
})

export default mongoose.model('Room', RoomSchema);
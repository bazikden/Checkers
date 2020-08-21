import mongoose from 'mongoose'
import Room from '../models/rooms'

const db = mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(async() => {
    const rooms = await Room.find()
    if (rooms.length === 0) {
      await Room.create({ name: 'Room1' })
      await Room.create({ name: 'Room2' })
      await Room.create({ name: 'Room3' })
    }
      console.log("db connected")
    })
  .catch(e => console.log("Failed"))


export default mongoose.connection
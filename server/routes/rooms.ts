import express from "express"
const router = express.Router()
import { getRooms, addRoom,getRoom } from '../controllers/rooms'


router.route('/').get(getRooms).post(addRoom)
router.route("/:id").get(getRoom)

export default router
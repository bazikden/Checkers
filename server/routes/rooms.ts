import express from "express"
const router = express.Router()
import { getRooms, addRoom, getRoom, refreshRoom } from '../controllers/rooms'


router.route('/').get(getRooms).post(addRoom).put(refreshRoom)
router.route("/:id").get(getRoom)

export default router
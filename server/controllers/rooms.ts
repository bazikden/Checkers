import express from 'express'
import Room from '../models/rooms'


const getRooms = async (req: express.Request, res: express.Response) => {
    try {
        const rooms = await Room.find()
        res.json({ rooms })

    } catch (error) {
        res.status(500).json({ error });

    }
}


const addRoom = async (req: express.Request, res: express.Response) => {
    const { name, player, roomId } = req.body

    try {

        const existed: any = await Room.findOne({ "_id": roomId })
        if (existed.player1 === 'none') {
            await Room.findOneAndUpdate({ "_id": roomId }, { player1: player })
        } else {
            await Room.findOneAndUpdate({ "_id": roomId }, { player2: player, isbuzy: true })
        }
        const updated = await Room.findOne({ "_id": roomId })
        res.json({ room: updated })


    } catch (error) {
        res.status(500).json({ error });
    }

}

const getRoom = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    try {
        const room = await Room.findOne({ "_id": id })
        res.json({ room })

    } catch (error) {
        res.status(500).json({ error });
    }
}

export { getRooms, addRoom, getRoom }
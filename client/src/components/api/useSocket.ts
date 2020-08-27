import { useRef, useState } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client'
import { SOCKET_SERVER_URL } from '../../config/config'
import { RoomsApi } from './roomsApi';
import { v4 as uuidv4 } from 'uuid'

const PLAYER_CHOSEN = "PLAYER_CHOSEN"
const ROOM_CHOSEN = "ROOM_CHOSEN"

export interface IUser {
    name: string,
    id: string,
    active: boolean
}
const initialUsers: IUser[] = [
    { name: 'Player 1', id: uuidv4(), active: false },
    { name: 'Player 2', id: uuidv4(), active: false },
    { name: 'Player 3', id: uuidv4(), active: false },
    { name: 'Player 4', id: uuidv4(), active: false },
    { name: 'Player 5', id: uuidv4(), active: false },
    { name: 'Player 6', id: uuidv4(), active: false },
]


export interface IRoom {
    _id: string,
    name: string,
    id: string,
    isbuzy: boolean,
    player1: string,
    player2: string,
    playersCount: number
}
const initialRooms: IRoom[] = []

export const useSocket = () => {
    const [users, setUsers] = useState(initialUsers)
    const [rooms, setRooms] = useState(initialRooms)
    const socket: any = useRef()
    const getRooms = async () => {
        const response = await RoomsApi.getRooms()
        setRooms(response)
    }
    useEffect(() => {

        getRooms()
        socket.current = io(SOCKET_SERVER_URL)

        socket.current.on('connect', () => { console.log("Connected to socket") })
        socket.current.on(PLAYER_CHOSEN, (user: IUser) => {
            setUsers(prevState => { return prevState.filter((elem: IUser) => elem.name !== user.name) })

        })
        socket.current.on(ROOM_CHOSEN, (room: IRoom) => {
            setRooms((prevState: IRoom[]) => prevState.map((elem: IRoom) => {
                (elem.name === room.name) && (elem.playersCount += 1)
                return elem
            }))
        })
        return () => {
            socket.current.disconnect()
        }
    }, [])

    const choosePlayer = (user: IUser) => {
        socket.current.emit(PLAYER_CHOSEN, user)
    }

    const chooseRoom = (room: IRoom) => {
        socket.current.emit(ROOM_CHOSEN, room)

    }
    return { socket, rooms, users, choosePlayer, chooseRoom }
}
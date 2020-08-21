import React, { useState, useEffect } from 'react'
import { uuid } from 'uuidv4'
import { RoomsApi } from '../api/roomsApi'
import { IActiveUser } from '../Home/Home'

export interface IRoom {
    _id:string,
    name: string,
    id: string,
    isbuzy: boolean,
    player1:string
}

interface IProps {
    setActiveUser: Function
    activeUser: IActiveUser
}

const initialRooms: IRoom[] = []

export const Rooms = ({ activeUser,setActiveUser }: IProps) => {
    const [rooms, setRooms] = useState(initialRooms)

    useEffect(() => {
        const getRooms = async () => {
            const response = await RoomsApi.getRooms()
            setRooms(response)
        }
        getRooms()
    }, [])

    const onRoomClick = (room: IRoom) => {
        setRooms(rooms.map((elem: IRoom) => {
            if (elem === room) { elem.isbuzy = !elem.isbuzy }
            return elem
        }))
        setActiveUser((prevState: any) => {
            return {
                ...prevState,
                room: room
            }
        })
    }

    const mapRooms = (room: IRoom) => {
        let playersCount = 0
        if(room.player1 !== 'none'){
            playersCount += 1
        }
        if (room.isbuzy === false) return (
            <div onClick={() => onRoomClick(room)} style={{ cursor: "pointer", width: '500px' }} key={room._id} className="d-flex justify-content-between border border-dark rounded p-3 m-2 room-item">
                {room.name}
            <div>{playersCount} of 2</div>
            </div>
        )
    }

    const onAddRoomClick = async () => {
        const response = await RoomsApi.addRoom(rooms.length,activeUser.player.name)
        setRooms((prevState: IRoom[]) => { return [ ...prevState, response ] })

    }

    return (
        <div>
            {
                rooms.length === 0 ?
                    (<div className="m-5 p-5">
                        <h3>There no rooms</h3>
                        {activeUser.player &&  <button onClick={onAddRoomClick} className="btn btn-primary d-block mx-auto">Add new Room</button> }
                       
                    </div>)
                    :
                    rooms.map(mapRooms)
            }
        </div>
    )
}

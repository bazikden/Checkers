import React from 'react'
import { RoomsApi } from '../api/roomsApi'
import { IActiveUser } from '../Home/Home'
import {IRoom} from "../api/useSocket"


interface IProps {
    setActiveUser: Function
    activeUser: IActiveUser
    chooseRoom: Function
    rooms:IRoom[]
}


export const Rooms = ({ activeUser, setActiveUser, chooseRoom ,rooms }: IProps) => {


    const onRoomClick = (room: IRoom) => {
        setActiveUser((prevState: any) => {
            return {
                ...prevState,
                room: room
            }
        })
        chooseRoom(room)
    }

    const mapRooms = (room: IRoom) => {
        if (room.isbuzy === false) return (
            <div key={room._id} className="position-relative m-2 rounded">
                <div style ={{display: room.playersCount >=2 || (activeUser.room === room) ? "block":"none", background:"#141414", opacity:0.5}} className="position-absolute w-100 h-100"></div>
            <div onClick={() => onRoomClick(room)} style={{ cursor: "pointer", width: '100%' }}  className="d-flex justify-content-between border border-dark  p-3  room-item">
                {room.name}
                <div>{room.playersCount} of 2</div>
            </div>
            </div>
        )
    }

    const onAddRoomClick = async () => {
        await RoomsApi.addRoom(rooms.length, activeUser.player.name)

    }

    return (
        <div>
            {
                rooms.length === 0 ?
                    (<div className="m-5 p-5">
                        <h3>There no rooms</h3>
                        {activeUser.player && <button onClick={onAddRoomClick} className="btn btn-primary d-block mx-auto">Add new Room</button>}

                    </div>)
                    :
                    rooms.map(mapRooms)
            }
        </div>
    )
}

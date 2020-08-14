import React, { useState } from 'react'
import {uuid} from 'uuidv4'

export interface IRoom {
    name: string,
    id: string,
    active: boolean
}

interface IProps {
    setActiveUser:Function
}

const initialRooms:IRoom[] = [
    {name:'Room 1',id:uuid(),active:false},
    {name:'Room 2',id:uuid(),active:false},
    {name:'Room 3',id:uuid(),active:false},

]

export const Rooms = ({setActiveUser}:IProps) => {
    const [rooms,setRooms] = useState(initialRooms)

    const onRoomClick = (room: IRoom) => {
        setRooms(rooms.map((elem:IRoom)=>{
            if(elem === room){elem.active = !elem.active} 
            return elem
        }))
        setActiveUser((prevState:any) => {
            return {
                ...prevState,
                room:room
            }
        })
    }

    const mapRooms = (room:IRoom) => {
        if(room.active  === false) return (
            <div onClick={() => onRoomClick(room)} style={{cursor:"pointer",width:'500px'}} key={room.id} className="d-flex border border-dark rounded p-3 m-2 room-item">
                {room.name}
            </div>
        )
    }


    return (
        <div>
            {
                rooms.map(mapRooms)
            }
        </div>
    )
}

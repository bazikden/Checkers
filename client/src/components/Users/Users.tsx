import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
export interface IUser {
    name: string,
    id: string,
    active: boolean
}

interface IProps {
    setActiveUser: Function
}

const initialUsers: IUser[] = [
    { name: 'Player 1', id: uuidv4(), active: false },
    { name: 'Player 2', id: uuidv4(), active: false },
    { name: 'Player 3', id: uuidv4(), active: false },
    { name: 'Player 4', id: uuidv4(), active: false },
    { name: 'Player 5', id: uuidv4(), active: false },
    { name: 'Player 6', id: uuidv4(), active: false },
]


export const Users = ({ setActiveUser }: IProps) => {
    const [users, setUsers] = useState(initialUsers)

    const onUserClick = (user: IUser) => {
        setUsers(users.map((elem:IUser)=>{
            if(elem === user){elem.active = !elem.active} 
            return elem
        }))
        setActiveUser((prevState:any) => {
            return {
                ...prevState,
                player:user
            }
        })
    }


    const mapUsers = (user: IUser) => {
        if (!user.active) return (
            <div onClick={() => onUserClick(user)} style={{ cursor: "pointer", width: '500px' }} key={user.id} className="d-flex border border-dark rounded p-3 m-2 user-item">
                {user.name}
            </div>

        )

    }


    return (
        <div>
            {
                users.map(mapUsers)
            }
        </div>
    )
}

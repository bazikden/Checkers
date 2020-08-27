import React from 'react'
import {IUser} from '../api/useSocket'

interface IProps {
    setActiveUser: Function,
    choosePlayer:Function,
    users:IUser[]
}




export const Users = ({ setActiveUser, choosePlayer,users }: IProps) => {


    const onUserClick = (user: IUser) => {

        setActiveUser((prevState: any) => {
            return {
                ...prevState,
                player: user
            }
        })
        choosePlayer(user)
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

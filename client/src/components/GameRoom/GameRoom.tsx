import React from 'react'
import { IActiveUser } from '../Home/Home'
import { Board } from './Sections/Board/Board'

interface IProps {
    activeUser:IActiveUser
}

export const GameRoom = ({activeUser}:IProps) => {
    return (
        <div>
            {activeUser.player.name? activeUser.player.name :"PLAYER"}
            <Board/>
        </div>
    )
}

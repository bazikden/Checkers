import React, { useEffect } from 'react'
import { IActiveUser } from '../Home/Home'
import { Board } from './Sections/Board/Board'
import { useHistory } from 'react-router'

interface IProps {
    activeUser:IActiveUser
    setActiveUser:Function
}

export const GameRoom = ({activeUser,setActiveUser}:IProps) => {
    const history  =  useHistory()
    useEffect(() => {
        Object.keys(activeUser).length === 0 && history.push('/')
    },[activeUser,history])
    return (
        <div>
            {activeUser.player !== undefined && activeUser.player.name? activeUser.player.name :"PLAYER"}
            {activeUser.player &&<Board activeUser={activeUser} setActiveUser = {setActiveUser}/>}
        </div>
    )
}

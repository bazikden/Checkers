import React, { useContext } from 'react'
import { IChecker, GlobalContext } from '../Board/Board'
import { Timer } from './Sections/Timer'


interface IProps {
    moved: string
    setMoved: Function
    checkers: IChecker[]
}



export const SideBar = ({ moved, setMoved, checkers }: IProps) => {
    const {activeUser} = useContext(GlobalContext)
    const firstPlayer = activeUser.player && activeUser.player.name ===  activeUser.room.player1 ? true:false
    return (
        <div style={{ width: '200px', padding: "20px", top:'-1px', position:'relative', background:firstPlayer?"white":"black", color:firstPlayer?"black":"white" }} className="h-100 border">
            <Timer moved={moved} setMoved={setMoved}/>
            <h3 style={{ color:firstPlayer?"black":"white" }} className="text-center">{moved}</h3>
            <h5 style={{ color:firstPlayer?"black":"white" }}>White</h5>
            <p>checkers:  {checkers.filter((elem: IChecker) => elem.status === "checker" && elem.color === "white").length}</p>
            <p>kings:  {checkers.filter((elem: IChecker) => elem.status === "king" && elem.color === "white").length}</p>

            <h5 style={{ color:firstPlayer?"black":"white" }}>Black</h5>
            <p>checkers:  {checkers.filter((elem: IChecker) => elem.status === "checker" && elem.color === "black").length}</p>
            <p>kings:  {checkers.filter((elem: IChecker) => elem.status === "king" && elem.color === "black").length}</p>
        </div>
    )
}

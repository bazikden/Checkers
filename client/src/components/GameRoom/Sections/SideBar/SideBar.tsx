import React from 'react'
import { IChecker } from '../Board/Board'
import { Timer } from './Sections/Timer'

interface IProps {
    moved: string
    setMoved: Function
    checkers: IChecker[]
}



export const SideBar = ({ moved, setMoved, checkers }: IProps) => {

    return (
        <div style={{ width: '200px', padding: "20px" }} className="h-100 border">
            <Timer moved={moved} setMoved={setMoved}/>
            <h3 className="text-center">{moved}</h3>
            <h5>White</h5>
            <p>checkers:  {checkers.filter((elem: IChecker) => elem.status === "checker" && elem.color === "white").length}</p>
            <p>kings:  {checkers.filter((elem: IChecker) => elem.status === "king" && elem.color === "white").length}</p>

            <h5>Black</h5>
            <p>checkers:  {checkers.filter((elem: IChecker) => elem.status === "checker" && elem.color === "black").length}</p>
            <p>kings:  {checkers.filter((elem: IChecker) => elem.status === "king" && elem.color === "black").length}</p>
        </div>
    )
}

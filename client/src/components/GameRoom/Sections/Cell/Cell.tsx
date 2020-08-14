import React from 'react'
import { Checker } from '../Checker/Checker'
import { IChecker} from '../Board/Board'

interface ICell {
    row: string,
    col: string,
    color: string,
    checkers:IChecker[],
    setCheckers: Function
}



export const Cell = ({ row, col, color, checkers, setCheckers }: ICell) => {
    const renderChecker = () => {
        if(color === "black"){
            const checker:IChecker = checkers.find((elem:IChecker) => elem.column === col && elem.row === row)!
            if(checker !== undefined){
                return <Checker column={checker.column} row={checker.row} color={checker.color}/>
            }

        }
    }
    {    renderChecker()}
    return (
        <div  style={{ width: '100px', height: '100px', background: `${color}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {renderChecker()}
        </div>
    )
}

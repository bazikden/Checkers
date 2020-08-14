import React, { useState } from 'react'
import { Row, Col } from 'antd'
import { Cell } from '../Cell/Cell'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export interface IChecker {
    column: string
    row: string
    color: string
}

const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const columns = [1, 2, 3, 4, 5, 6, 7, 8].map(elem => elem.toString())
const initialCheckers = [
    { column: '1', row: 'b', color: 'black' },
    { column: '1', row: 'd', color: 'black' },
    { column: '1', row: 'f', color: 'black' },
    { column: '1', row: 'h', color: 'black' },
    { column: '2', row: 'a', color: 'black' },
    { column: '2', row: 'c', color: 'black' },
    { column: '2', row: 'e', color: 'black' },
    { column: '2', row: 'g', color: 'black' },
    { column: '3', row: 'b', color: 'black' },
    { column: '3', row: 'd', color: 'black' },
    { column: '3', row: 'f', color: 'black' },
    { column: '3', row: 'h', color: 'black' },

    { column: '6', row: 'a', color: 'white' },
    { column: '6', row: 'c', color: 'white' },
    { column: '6', row: 'e', color: 'white' },
    { column: '6', row: 'g', color: 'white' },
    { column: '7', row: 'b', color: 'white' },
    { column: '7', row: 'd', color: 'white' },
    { column: '7', row: 'f', color: 'white' },
    { column: '7', row: 'h', color: 'white' },
    { column: '8', row: 'a', color: 'white' },
    { column: '8', row: 'c', color: 'white' },
    { column: '8', row: 'e', color: 'white' },
    { column: '8', row: 'g', color: 'white' },

]

const getListStyle = (isDraggingOver:any) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    width: 100
  });

export const Board = () => {
    const [checkers, setCheckers] = useState<IChecker[]>(initialCheckers)
    let color = "black"
    const mapColumns = ((column: string) => {
        color = color === "black" ? "white" : "black"
        return (
            <Row style={{ display: 'flex' }} key={column + Date.now()}>
                {
                    rows.map((row: string) => {
                        let cell
                        if (color === "black") {
                            cell = <Droppable key={column + row} droppableId={column + row}>
                                {(provided: any, snapshot: any) => (
                                    <div ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                        // style={{ width: '100%', height: '100%', display: "flex", justifyContent: "center", alignItems: 'center' }}
                                        {...provided.droppableProps}>
                                        <Col>
                                            <Cell col={column} row={row} color={color} checkers={checkers} setCheckers={setCheckers} />
                                        </Col>
                                        {/* {provided.placeholder} */}
                                    </div>
                                )}

                            </Droppable>
                        } else {
                            cell = <Col key={column + row}>
                                <Cell col={column} row={row} color={color} checkers={checkers} setCheckers={setCheckers} />
                            </Col>

                        }

                        color = color === "black" ? "white" : "black"
                        return cell
                    })
                }
            </Row>
        )
    })

    const onDragEnd = (result: any) => {
        const draggable = result.draggableId.split("-")
        const destination = result.destination.droppableId.split("")
        const newState = checkers.map((elem:IChecker) => {
            if(elem.column === draggable[0] && elem.row === draggable[1] && elem.color === draggable[2]){
                return {column:destination[0],row:destination[1],color:draggable[2]}
            }
            return elem
        })
        setCheckers(newState)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ maxWidth: '802px', border: '1px solid black', boxSizing: 'border-box', margin: '100px auto' }}>
                {
                    columns.map(mapColumns)
                }
            </div>
        </DragDropContext>
    )
}

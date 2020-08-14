import React from 'react'
import { IChecker } from '../Board/Board'
import { Draggable } from 'react-beautiful-dnd'


const getItemStyle = (isDragging:any, draggableStyle:any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    width:"100%",
    height:"100%",
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });


const styles = {
    checkerBlack: {
        width: '80%',
        height: '80%',
        borderRadius: "50%",
        background: "black",
        border: '3px solid white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkerWhite: {
        width: '80%',
        height: '80%',
        borderRadius: "50%",
        background: "white",
        border: '3px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkerBlackRound: {
        width: '70%',
        height: '70%',
        borderRadius: "50%",
        background: "black",
        border: '3px solid white',
    },
    checkerWhiteRound: {
        width: '70%',
        height: '70%',
        borderRadius: "50%",
        background: "white",
        border: '3px solid black',
    },
}

export const Checker = ({ column, row, color }: IChecker) => {
    return (
        <Draggable
            key={column+row+color}
            draggableId={`${column}-${row}-${color}`}
            index={0}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                    )}
                >
                    <div style={color === "black" ? styles.checkerBlack : styles.checkerWhite}>
                        <div style={color === "black" ? styles.checkerBlackRound : styles.checkerWhiteRound}></div>
                    </div>
                </div>
            )}
    </Draggable>
    )
}

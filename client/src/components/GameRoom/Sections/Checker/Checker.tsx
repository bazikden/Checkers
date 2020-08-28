import React, { useContext } from 'react'
import { IChecker } from '../Board/Board'
import { Draggable } from 'react-beautiful-dnd'
import { GlobalContext } from '../Board/Board'
import crown from '../../../../images/crown.png'
import { IActiveUser } from '../../../Home/Home'


const getItemStyle = (isDragging: any, draggableStyle: any) => ({

    userSelect: "none",
    width: "100%",
    height: "100px",
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
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
        overflow: "hidden"
    },
    checkerWhiteRound: {
        width: '70%',
        height: '70%',
        borderRadius: "50%",
        background: "white",
        border: '3px solid black',
        overflow: "hidden"
    },
}


const checkDisableChecker = (moved:string,color:string,activeUser:IActiveUser) => {
    if(moved !== color){
        return true
    }
    if(activeUser.player && activeUser.player.name === activeUser.room.player1 && color ==="black") return true
    if(activeUser.player && activeUser.player.name === activeUser.room.player2 && color ==="white") return true
    return false
    
}

export const Checker = ({ column, row, color, status }: IChecker) => {
    const { moved, activeUser } = useContext(GlobalContext)
    return (
        <Draggable
            key={column + row + color}
            draggableId={`${column}-${row}-${color}`}
            index={0}
            isDragDisabled={checkDisableChecker(moved,color,activeUser)}
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
                    {
                        status === "checker" ?
                            (
                                <div style={color === "black" ? styles.checkerBlack : styles.checkerWhite}>
                                    <div style={color === "black" ? styles.checkerBlackRound : styles.checkerWhiteRound}></div>
                                </div>
                            )
                            :
                            (
                                <div style={color === "black" ? styles.checkerBlack : styles.checkerWhite}>
                                    <div style={color === "black" ? styles.checkerBlackRound : styles.checkerWhiteRound}>
                                        <img className="w-100 h-100" src={crown} alt="crown" />
                                    </div>
                                </div>
                            )
                    }
                </div>
            )}
        </Draggable>
    )
}

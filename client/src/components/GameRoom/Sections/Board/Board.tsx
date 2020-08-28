import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { Cell } from '../Cell/Cell'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Checker, King, IKingMoveResult } from '../../../../utils/Rules';
import { SideBar } from '../SideBar/SideBar';
import useGame from "../../useGame"
import { useParams, useHistory } from 'react-router';
import { IActiveUser } from '../../../Home/Home';
import { Modal } from 'antd';
import { RoomsApi } from '../../../api/roomsApi';

export interface IChecker {
    column: string
    row: string
    color: string
    status: string
}

interface IContext {
    moved: string,
    setMoved: Function,
    activeUser: IActiveUser | any
}

const NEW_GAME_MOVE = "NEW_GAME_MOVE";

const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const columns = [1, 2, 3, 4, 5, 6, 7, 8].map(elem => elem.toString())

const initialCheckers = [
    { column: '1', row: 'b', color: 'black', status: "checker" },
    { column: '1', row: 'd', color: 'black', status: "checker" },
    { column: '1', row: 'f', color: 'black', status: "checker" },
    { column: '1', row: 'h', color: 'black', status: "checker" },
    { column: '2', row: 'a', color: 'black', status: "checker" },
    { column: '2', row: 'c', color: 'black', status: "checker" },
    { column: '2', row: 'e', color: 'black', status: "checker" },
    { column: '2', row: 'g', color: 'black', status: "checker" },
    { column: '3', row: 'b', color: 'black', status: "checker" },
    { column: '3', row: 'd', color: 'black', status: "checker" },
    { column: '3', row: 'f', color: 'black', status: "checker" },
    { column: '3', row: 'h', color: 'black', status: "checker" },

    { column: '6', row: 'a', color: 'white', status: "checker" },
    { column: '6', row: 'c', color: 'white', status: "checker" },
    { column: '6', row: 'e', color: 'white', status: "checker" },
    { column: '6', row: 'g', color: 'white', status: "checker" },
    { column: '7', row: 'b', color: 'white', status: "checker" },
    { column: '7', row: 'd', color: 'white', status: "checker" },
    { column: '7', row: 'f', color: 'white', status: "checker" },
    { column: '7', row: 'h', color: 'white', status: "checker" },
    { column: '8', row: 'a', color: 'white', status: "checker" },
    { column: '8', row: 'c', color: 'white', status: "checker" },
    { column: '8', row: 'e', color: 'white', status: "checker" },
    { column: '8', row: 'g', color: 'white', status: "checker" },

]

const calculateColumn = (column: string) => {
    const newColumn: string = (8 - Number(column) + 1).toString()
    return newColumn
}

const calculateRow = (row: string) => {
    const newRow: string = rows[7 - rows.indexOf(row)]
    return newRow
}

export const reversedCheckers = (checkers:IChecker[]) => checkers.map((checker: IChecker) => {
    return {
        ...checker,
        column: calculateColumn(checker.column),
        row: calculateRow(checker.row)
    }
})

const getListStyle = (isDraggingOver: any) => ({
    width: 100
});

export const GlobalContext = React.createContext<IContext>({ moved: "white", setMoved: () => { }, activeUser: null })
interface IProps {
    activeUser: IActiveUser
    setActiveUser: Function
}

export const Board = ({ activeUser, setActiveUser }: IProps) => {
    const history = useHistory()
    const params: { id: string } = useParams()
    const [checkers, setCheckers] = useState(initialCheckers)
    const [visible, setVisible] = useState(false)
    const [moved, setMoved] = useState<string>("white")
    const { makeMove, nextPlayer } = useGame(params.id, setCheckers, setMoved, activeUser, setActiveUser)

    useEffect(() => {
        !activeUser.player && history.push('/')
    },[])

    useEffect(()=>{
        activeUser.player.name !== activeUser.room.player1 && setCheckers(reversedCheckers(checkers))
    },[])
    

    useEffect(() => {
        if (checkers.filter((checker: IChecker) => checker.color === "white").length === 0) setVisible(true)
        if (checkers.filter((checker: IChecker) => checker.color === "black").length === 0) setVisible(true)

    }, [checkers])



    const checkExists = (column: string, row: string) => {
            return checkers.find((elem: IChecker) => elem.column === column && elem.row === row) === undefined ? false : true

    }
    let color = "black"

    const mapColumns = ((column: string) => {
        color = color === "black" ? "white" : "black"
        return (
            <Row style={{ display: 'flex' }} key={column + Date.now()}>
                {
                    rows.map((row: string) => {
                        let cell
                        if (color === "black") {
                            cell = <Droppable key={column + row} droppableId={column + row} isDropDisabled={checkExists(column, row)}>
                                {(provided: any, snapshot: any) => (
                                    <div ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}>
                                        <Col>
                                            <Cell col={column} row={row} color={color} checkers={checkers} />
                                        </Col>

                                    </div>
                                )}

                            </Droppable>
                        } else {
                            cell = <Col key={column + row}>
                                <Cell col={column} row={row} color={color} checkers={checkers} />
                            </Col>

                        }

                        color = color === "black" ? "white" : "black"
                        return cell
                    })
                }
            </Row>
        )
    })

    const onDragEnd = async (result: any) => {
        const { destination, source, draggableId } = result
        if (destination === null) { return }
        const from = source.droppableId
        const to = destination.droppableId
        const color = draggableId.split('-')[2]
        const options = {
            checkers,
            from,
            to,
            color,
            activeUser
        }
        const draggable = draggableId.split("-")
        const destinationArr = destination.droppableId.split("")
        const draggableElem = checkers.find((elem: IChecker) => elem.column === draggable[0] && elem.row === draggable[1] && elem.color === draggable[2])

        
        const checkerMove = new Checker(options)
        const kingMove = new King(options)



        if (draggableElem?.status === "checker") {
            const move = checkerMove.makeMove()
            if (move === false) {
                return
            } else {

                const findChecker = checkers.find((elem: IChecker) => elem.column === destinationArr[0] && elem.row === destinationArr[1])

                if (findChecker !== undefined) { return }
                let newState = checkers.map((elem: IChecker) => {
                    if (elem.column === draggable[0] && elem.row === draggable[1] && elem.color === draggable[2]) {
                        if (checkerMove.checkMakeKing()) {
                            return { column: destinationArr[0], row: destinationArr[1], color: draggable[2], status: "king" }
                        } else {
                            return { column: destinationArr[0], row: destinationArr[1], color: draggable[2], status: elem.status }

                        }
                    }
                    return elem
                })
                if (move !== true) {
                    newState = newState.filter((checker: IChecker) => checker !== move)
                    const newOptions = { ...options, checkers: newState }
                    const nextMove = new Checker(newOptions)
                    const existedEnemy = nextMove.checkPosibleEnemy()
                    !existedEnemy && nextPlayer()
                } else {
                    nextPlayer()
                }
                await makeMove(NEW_GAME_MOVE, newState)
                setCheckers(newState)
            }
        } else {
            const kingMoveResult: IKingMoveResult = kingMove.makeKingMove()
            if (kingMoveResult.move === true) {
                let newState = checkers.map((elem: IChecker) => {
                    if (elem.column === draggable[0] && elem.row === draggable[1] && elem.color === draggable[2]) {
                        return { column: destinationArr[0], row: destinationArr[1], color: draggable[2], status: elem.status }
                    }
                    return elem
                })
                if (kingMoveResult.enemy !== undefined) {
                    newState = newState.filter((elem: IChecker) => elem !== kingMoveResult.enemy)
                }
                makeMove(NEW_GAME_MOVE, newState)
                setCheckers(newState)
                if (kingMoveResult.nextMove === false) { nextPlayer() }
            }

        }
    }

    const onOkClick = async () => {
        await RoomsApi.refreshRooms(activeUser.room.name)
        setActiveUser({})
        history.push('/')
    }


    return (
        <GlobalContext.Provider value={{ moved, setMoved, activeUser }}>

            <Modal
                title="Congratulations"
                visible={visible}
                onOk={onOkClick}
            >   {
                    checkers.filter((checker: IChecker) => checker.color === "white").length === 0 ?
                        <h3 className="text-center">{activeUser.room && activeUser.room.player2} wins !!!</h3>
                        :
                        <h3 className="text-center">{activeUser.room && activeUser.room.player1} wins !!!</h3>
                }

            </Modal>
            {
                activeUser.room && activeUser.room.isbuzy === false ?
                    <h1 className="text-center">Waiting for players</h1>
                    :
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="mx-auto d-flex justify-content-center">
                            <div className="d-flex flex-column justify-content-between h-100 mx-2">
                                {
                                    columns.map((number: string) => (<div className="d-flex align-items-center " style={{ height: '100px' }} key={'row' + number}>{number}</div>))
                                }
                            </div>
                            <div>
                                <div style={{ maxWidth: '802px', border: '1px solid black', boxSizing: 'border-box', margin: '0 auto ' }}>
                                    {
                                        columns.map(mapColumns)
                                    }
                                </div>
                                <div style={{ maxWidth: '802px', margin: '0 auto', display: "flex" }} >
                                    {
                                        rows.map((row: string) => (
                                            <div key={row + Date.now()} style={{ width: "300px", textAlign: "center" }}>{row}</div>
                                        ))
                                    }
                                </div>
                            </div>
                            <SideBar moved={moved} setMoved={setMoved} checkers={checkers} />
                        </div>
                    </DragDropContext>
            }


        </GlobalContext.Provider>
    )
}

import { IChecker } from './../components/GameRoom/Sections/Board/Board';
import { IActiveUser } from '../components/Home/Home';


const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

interface IOptions {
    checkers: IChecker[],
    from: string,
    to: string,
    color: string
    activeUser: IActiveUser
}



export class Checker {
    checkers: IChecker[]
    from: string
    to: string
    color: string
    fromX: string
    fromY: number
    toX: string
    toY: number
    fromXIndex: number
    toXIndex: number
    activeUser: IActiveUser
    constructor(options: IOptions) {
        this.checkers = options.checkers
        this.from = options.from
        this.to = options.to
        this.color = options.color
        this.fromY = +options.from.charAt(0)
        this.fromX = options.from.charAt(1)
        this.toY = +options.to.charAt(0)
        this.toX = options.to.charAt(1)
        this.fromXIndex = alphabet.indexOf(this.fromX)
        this.toXIndex = alphabet.indexOf(this.toX)
        this.activeUser = options.activeUser
    }

    makeMove() {
        if (this.checkMoveSteps(2) === false) { return false }
        const enemy = this.checkTheEnemy()
        if (enemy === false) {
            if (this.checkMoveSteps(1) === false) return false
            if (this.checkMoveForward() === true) return false
        } else {
            return enemy
        }
        return true
    }

    checkMoveSteps(number: number) {
        if (this.checkHorizontal(number) === false || this.checkVertical(number) === false) {
            return false
        }
        return true
    }

    checkHorizontal(number: number) {
        const fromIndex = alphabet.indexOf(this.fromX)
        const toIndex = alphabet.indexOf(this.toX)
        const result = Math.abs(Math.abs(fromIndex) - Math.abs(toIndex))
        if (result > number || result === 0) {
            return false
        } else {
            return true
        }

    }

    checkVertical(number: number) {
        const result = Math.abs(this.fromY - this.toY)
        if (result > number || result === 0) {
            return false
        } else {
            return true
        }
    }

    checkTheEnemy() {
        const diffY: number = Math.abs(this.fromY - this.toY)
        const diffX: number = Math.abs(this.fromXIndex - this.toXIndex)
        if (diffX === 2 && diffY === 2) {
            const row: string = alphabet[[this.fromXIndex, this.toXIndex].sort((a, b) => b - a)[0] - 1]
            const column: number = [this.fromY, this.toY].sort((a, b) => b - a)[0] - 1
            const enemy: IChecker | undefined = this.checkers.find((elem: IChecker) => elem.color !== this.color && +elem.column === column && elem.row === row)
            if (enemy === undefined) {
                return false
            } else {
                return enemy
            }
        } else {
            return false
        }
    }

    checkPosibleEnemy() {
        const color = this.color === "white" ? "black" : "white"
        const enemyArr: IChecker[] = []
        const upLeft: IChecker = { column: (this.toY - 1).toString(), row: alphabet[this.toXIndex - 1], color, status: "checker" }
        const upRight: IChecker = { column: (this.toY - 1).toString(), row: alphabet[this.toXIndex + 1], color, status: "checker" }
        const downLeft: IChecker = { column: (this.toY + 1).toString(), row: alphabet[this.toXIndex - 1], color, status: "checker" }
        const downRight: IChecker = { column: (this.toY + 1).toString(), row: alphabet[this.toXIndex + 1], color, status: "checker" }
        this.checkers.forEach((checker: IChecker) => {

                if (checker.column === upLeft.column && checker.row === upLeft.row && checker.color === upLeft.color) {
                    const nextField = this.checkers.find((checker: IChecker) => checker.column === (this.toY - 2).toString() && checker.row === alphabet[this.toXIndex - 2] && checker.color === upLeft.color)
                    nextField === undefined && enemyArr.push(checker)
                }
                if (checker.column === upRight.column && checker.row === upRight.row && checker.color === upRight.color) {
                    const nextField = this.checkers.find((checker: IChecker) => checker.column === (this.toY - 2).toString() && checker.row === alphabet[this.toXIndex + 2] && checker.color === upLeft.color)
                    nextField === undefined && enemyArr.push(checker)
                }

                if (checker.column === downLeft.column && checker.row === downLeft.row && checker.color === downLeft.color) {
                    const nextField = this.checkers.find((checker: IChecker) => checker.column === (this.toY + 2).toString() && checker.row === alphabet[this.toXIndex - 2] && checker.color === upLeft.color)
                    nextField === undefined && enemyArr.push(checker)
                }
                if (checker.column === downRight.column && checker.row === downRight.row && checker.color === downRight.color) {
                    const nextField = this.checkers.find((checker: IChecker) => checker.column === (this.toY + 2).toString() && checker.row === alphabet[this.toXIndex + 2] && checker.color === upLeft.color)
                    nextField === undefined && enemyArr.push(checker)
                }

        })
        const filteredArr = enemyArr.filter((elem:IChecker) => elem.column !== "1" && elem.column !== "8" && elem.row !== "a" && elem.row !== "h")

        if (filteredArr.length > 0) {
            return filteredArr
        } else {
            return null
        }
    }

    checkMoveForward() {
        const color:string = this.activeUser.player.name === this.activeUser.room.player1 ? "white": "black"
        if (this.color === color) {
            if (this.fromY < this.toY) {
                return true
            } else { return false }
        } else {
            if (this.fromY > this.toY) {
                return true
            } else { return false }
        }
    }
    checkMakeKing() {
        const color:string = this.activeUser.player.name === this.activeUser.room.player1 ? "white": "black"
        if (this.color === color) {
            if (this.toY === 1) {
                return true
            } else {
                return false
            }
        } else {
            if (this.toY === 8) {
                return true
            } else {
                return false
            }
        }
    }

}

export interface IKingMoveResult {
    enemy: IChecker | undefined
    move: boolean
    nextMove: boolean
}

export class King extends Checker {
    xMoveDirection: string
    yMoveDirection: string
    constructor(options: IOptions) {
        super(options);
        this.xMoveDirection = this.findDirection(this.fromXIndex, this.toXIndex)
        this.yMoveDirection = this.findDirection(this.fromY, this.toY)
    }
    makeKingMove() {
        const result: IKingMoveResult = { enemy: undefined, move: false, nextMove: false }
        const moveX: number = Math.abs(this.fromXIndex - this.toXIndex)
        const moveY: number = Math.abs(this.fromY - this.toY)
        const color = this.color === "white" ? "black" : "white"
        if (moveX === moveY) {
            const enemies = this.checkKingsEnemy()
            if (enemies === false) return result
            if (enemies) {
                if (enemies.length === 1) {
                    const enemy = this.checkers.find((elem: IChecker) => elem.row === enemies[0].row && elem.column === enemies[0].column && elem.color === color)
                    result.enemy = enemy
                    result.move = true
                    const possibleEnemies = this.checkPosibleEnemy()
                    if((possibleEnemies!.filter((elem:IChecker) => elem.column !== enemy?.column && elem.row !== enemy?.row).length > 0)){
                        result.nextMove = true
                    }
                    return result
                } else {
                    return result
                }

            } else {
                result.move = true
                return result
            }
        } else {
            return result
        }
    }
    checkKingsEnemy() {
        const toXIndex = this.toXIndex
        const toY = this.toY
        const enemies: IChecker[] = []
        const checkers = this.checkers
        const color = this.color
        const xMoveDirection: string = this.xMoveDirection
        const yMoveDirection: string = this.yMoveDirection
        function findEnemy(x: number, y: number, color: string) {
            if (x === toXIndex && y === toY) { return }
            const posX = xMoveDirection === "down" ? x - 1 : x + 1
            const posY = yMoveDirection === "down" ? y - 1 : y + 1
            const enemy = checkers.find((elem: IChecker) => elem.row === alphabet[posX] && elem.column === posY.toString() && elem)
            enemy !== undefined && enemies.push(enemy)
            findEnemy(posX, posY, color)

        }
        findEnemy(this.fromXIndex, this.fromY, color)
        if (enemies.find((elem: IChecker) => elem.color === color)) return false
        if (enemies.length > 1) return false
        if (enemies.length === 0) {
            return null
        } else {
            if(this.checkMayKillEnemy(toXIndex,toY,enemies) === false) return false
            return enemies
        }
    }

    findDirection(from: number, to: number) {
        if (from > to) {
            return "down"
        } else {
            return "up"
        }
    }

    checkMayKillEnemy(x: number, y: number, enemies: IChecker[]) {
        const posX = this.xMoveDirection === "down" ? x + 1 : x - 1
        const posY = this.yMoveDirection === "down" ? y + 1 : y - 1
        if(enemies.filter((elem:IChecker)=> elem.column === posY.toString() && elem.row === alphabet[posX]).length !== 0){
            return true
        }else {
            return false
        }
    }
}
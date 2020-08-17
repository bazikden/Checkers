import React, { useState, useEffect } from 'react'


interface ITimer {
    min: number
    seconds: number
}
const initialTimer: ITimer = {
    min: 0,
    seconds: 59
}

interface IProps {
    moved: string
    setMoved: Function
}


export const Timer = ({ moved, setMoved }: IProps) => {
    const [timer, setTimer] = useState<ITimer>(initialTimer)
    useEffect(() => {

            const timerInterval = setInterval(() => {
                setTimer((prevState: ITimer) => {
                    if (prevState.seconds === 0) {
    
                        return { min: prevState.min > 0 ? prevState.min - 1 : prevState.min, seconds: initialTimer.seconds }
                    } else {
                        return { ...prevState, seconds: prevState.seconds - 1 }
                    }
                })
            }, 1000)
            const syncClear = async(interval:any) => {
                await clearInterval(interval)
                return 
            }
            return () => syncClear(timerInterval)


    }, [])

    useEffect(() => {
        setTimer(initialTimer)
    }, [moved])

    useEffect(() => {
        timer.seconds === 0 && setMoved((prevState:string) =>  prevState === "white"?"black":"white")
    },[timer.seconds,setMoved])

    return (
        <div className="mx-auto"><span>{timer.min} : {timer.seconds < 10 ? "0" + timer.seconds : timer.seconds}</span></div>
    )
}

import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { IChecker, reversedCheckers } from "./Sections/Board/Board";
import { RoomsApi } from "../api/roomsApi";
import { IActiveUser } from "../Home/Home";
import { SOCKET_SERVER_URL } from "../../config/config";



const NEW_GAME_MOVE = "NEW_GAME_MOVE";
const NEW_CLIENT_CONNECTED =  "NEW_CLIENT_CONNECTED"
const NEXT_PLAYER = "NEXT_PLAYER"


const useGame = (roomId:string,setCheckers:Function,setMoved:Function,activeUser:IActiveUser,setActiveUser:Function) => {
  let socketRef:any = useRef()
  useEffect(() => {
     socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    })


    socketRef.current.on(NEW_CLIENT_CONNECTED,async(data:any) => {
      const room = await RoomsApi.getRoom(roomId)
      setActiveUser((prevState:IActiveUser) => {return {...prevState,room}})
    })
    socketRef.current.on(NEW_GAME_MOVE, (checkers:any) => {
      activeUser.player.name === activeUser.room.player1?
      setCheckers([...checkers.body])
      :
      setCheckers(reversedCheckers(checkers.body))
    });

    socketRef.current.on(NEXT_PLAYER,() => {
      setMoved((prevState: string) => prevState === "white" ? "black" : "white")
    })

    return () => {
      console.log(`${socketRef.current.id} diconected`)
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const makeMove:Function = (type:string,newCheckers:IChecker []) => {
    socketRef.current.emit(NEW_GAME_MOVE, {
      body: activeUser.player.name === activeUser.room.player1?newCheckers:reversedCheckers(newCheckers),
      senderId: socketRef.current.id,
    });
  };
  
  const nextPlayer:Function = () =>{
    socketRef.current.emit(NEXT_PLAYER)
  } 

  return {  makeMove, nextPlayer };
};

export default useGame;
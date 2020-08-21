import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { IChecker } from "./Sections/Board/Board";
import { RoomsApi } from "../api/roomsApi";
import { IActiveUser } from "../Home/Home";


const initialCheckers = [
  { column: '1', row: 'b', color: 'black', status: "checker" },
  { column: '1', row: 'd', color: 'black', status: "checker" },
  { column: '1', row: 'f', color: 'black', status: "checker" },
  { column: '2', row: 'a', color: 'black', status: "checker" },
  { column: '1', row: 'h', color: 'black', status: "checker" },
  { column: '2', row: 'c', color: 'black', status: "checker" },
  { column: '2', row: 'e', color: 'black', status: "checker" },
  { column: '2', row: 'g', color: 'black', status: "checker" },
  { column: '3', row: 'b', color: 'black', status: "checker" },
  { column: '3', row: 'd', color: 'black', status: "king" },
  { column: '3', row: 'f', color: 'black', status: "checker" },
  { column: '3', row: 'h', color: 'black', status: "checker" },

  { column: '6', row: 'a', color: 'white', status: "king" },
  { column: '6', row: 'c', color: 'white', status: "checker" },
  { column: '6', row: 'e', color: 'white', status: "king" },
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

const NEW_GAME_MOVE = "NEW_GAME_MOVE";
const NEW_CLIENT_CONNECTED =  "NEW_CLIENT_CONNECTED"
const NEXT_PLAYER = "NEXT_PLAYER"
const SOCKET_SERVER_URL = "http://localhost:5000";

const useGame = (roomId:string,setCheckers:Function,setMoved:Function,activeUser:IActiveUser,setActiveUser:Function) => {
  let socketRef:any = useRef()

  useEffect(() => {
     socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    })
    console.log("RoomId",roomId)

    socketRef.current.on(NEW_CLIENT_CONNECTED,async(data:any) => {
      console.log("UserId",data.id)
      console.log("name",activeUser.player.name)
      const room = await RoomsApi.getRoom(roomId)
      setActiveUser((prevState:IActiveUser) => {return {...prevState,room}})
      console.log("activeRoom",room)
    })
    socketRef.current.on(NEW_GAME_MOVE, (checkers:any) => {
      console.log("New Move!!!!!!!!!!",checkers)
      setCheckers([...checkers.body])
    });

    socketRef.current.on(NEXT_PLAYER,() => {
      console.log("next")
      setMoved((prevState: string) => prevState === "white" ? "black" : "white")
    })

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const makeMove:Function = (type:string,newCheckers:IChecker []) => {
    socketRef.current.emit(NEW_GAME_MOVE, {
      body: newCheckers,
      senderId: socketRef.current.id,
    });
  };
  
  const nextPlayer:Function = () =>{
    socketRef.current.emit(NEXT_PLAYER)
  } 

  return {  makeMove, nextPlayer };
};

export default useGame;
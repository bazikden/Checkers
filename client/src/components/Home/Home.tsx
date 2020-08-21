import React from 'react'
import { Layout, Row, Col, Button } from 'antd'
import { useHistory } from 'react-router';

import { Users, IUser } from '../Users/Users';
import { Rooms, IRoom } from '../Rooms/Rooms';
import { RoomsApi } from '../api/roomsApi';
export interface IActiveUser {
    player: IUser,
    room: IRoom
  
  }

interface IProps {
    activeUser:IActiveUser
    setActiveUser:Function
}

export const Home = ({activeUser,setActiveUser}:IProps) => {
    const history = useHistory();

    const onPlayBtnClick = async() => {
      console.log(activeUser)
      const response = await RoomsApi.addRoom(0,activeUser.player.name,activeUser.room._id)
      console.log(response)
      setActiveUser((prevState:IActiveUser) => {return {...prevState,room:response}})
      history.push(`/room/${response._id}`)
    }
    return (
        <>
               <h2 className="text-center mb-5">Choose the Player and Room</h2>
      <Layout>
        <Row style={{ display: "flex", justifyContent: "center", alignItems: 'center' }} >
          <Col >
            <Users setActiveUser={setActiveUser} />
          </Col>
          <Col span={12}>
            <Rooms activeUser={activeUser} setActiveUser={setActiveUser} />
          </Col>
        </Row>
        <Row>
          {
            Object.keys(activeUser).length > 0 && (

          <div className="d-flex w-100 justify-content-center my-5">
            {
              activeUser.player  && (
                <div className="d-flex border border-dark rounded p-3 m-2 user-item">
                  {activeUser.player.name}
                </div>
              )
             
            }

            {
              activeUser.room && (
                <div className="d-flex border border-dark rounded p-3 m-2 room-item">
                {activeUser.room.name}
              </div>
              )
            }
            {
              activeUser.room  && activeUser.player && (
                <Button onClick={onPlayBtnClick}>Play game</Button>
              )
            }
          </div>
            )
          }
        </Row>
      </Layout>   
        </>
    )
}

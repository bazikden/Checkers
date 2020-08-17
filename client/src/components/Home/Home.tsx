import React from 'react'
import { Layout, Row, Col, Button } from 'antd'
import { useHistory } from 'react-router';

import { Users, IUser } from '../Users/Users';
import { Rooms, IRoom } from '../Rooms/Rooms';
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

    const onPlayBtnClick = () => {
        history.push(`/room/${activeUser.room.id}`)
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
            <Rooms setActiveUser={setActiveUser} />
          </Col>
        </Row>
        <Row>
          <div className="d-flex w-100 justify-content-center my-5">
            {
              activeUser.player.id.length > 0 && (
                <div className="d-flex border border-dark rounded p-3 m-2 user-item">
                  {activeUser.player.name}
                </div>
              )
             
            }

            {
              activeUser.room.id.length > 0 && (
                <div className="d-flex border border-dark rounded p-3 m-2 room-item">
                {activeUser.room.name}
              </div>
              )
            }
            {
              activeUser.room.id.length > 0 && activeUser.player.id.length > 0 && (
                <Button onClick={onPlayBtnClick}>Play game</Button>
              )
            }
          </div>
        </Row>
      </Layout>   
        </>
    )
}

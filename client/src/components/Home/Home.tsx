import React from 'react'
import { Layout, Row, Col, Button } from 'antd'
import { useHistory } from 'react-router';
import { IRoom,IUser } from '../api/useSocket'
import { Users } from '../Users/Users';
import { Rooms } from '../Rooms/Rooms';
import { RoomsApi } from '../api/roomsApi';
import { useSocket } from '../api/useSocket';

export interface IActiveUser {
  player: IUser,
  room: IRoom

}

interface IProps {
  activeUser: IActiveUser
  setActiveUser: Function
}

export const Home = ({ activeUser, setActiveUser }: IProps) => {

  const history = useHistory();
  const { choosePlayer, chooseRoom, rooms, users } = useSocket()

  const onPlayBtnClick = async () => {
    const response = await RoomsApi.addRoom(0, activeUser.player.name, activeUser.room._id)
    setActiveUser((prevState: IActiveUser) => { return { ...prevState, room: response } })
    history.push(`/room/${response._id}`)
  }
  return (
    <>
      <h2 className="text-center mb-5">Choose the Player and Room</h2>
      <Layout style={{height:'85vh'}}>
        <Row style={{ display: "flex", justifyContent: "center", alignItems: 'center' }} >
          <Col >
            <Users setActiveUser={setActiveUser} choosePlayer={choosePlayer} users={users} />
          </Col>
          <Col span={8}>
            <Rooms activeUser={activeUser} setActiveUser={setActiveUser} chooseRoom={chooseRoom} rooms={rooms} />
          </Col>
        </Row>
        <Row>
          {
            Object.keys(activeUser).length > 0 && (

              <div className="d-flex w-100 justify-content-center my-5">
                {
                  activeUser.player && (
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
                  activeUser.room && activeUser.player && (
                    <Button style={{display:"block",margin:"9px",height:'80%',fontSize:'18px'}} onClick={onPlayBtnClick}>Play game</Button>
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

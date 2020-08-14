import React, { useState } from 'react';
import './App.css';
import { Layout } from 'antd'
import { AppHeader } from './components/AppHeader/AppHeader';
import {IActiveUser, Home} from './components/Home/Home'
import { Route } from 'react-router';
import { GameRoom } from './components/GameRoom/GameRoom';



function App() {
  const [activeUser, setActiveUser] = useState<IActiveUser>({
    player: { name: "", id: "", active: false },
    room: { name: "", id: "", active: false }
  })

  return (
    <Layout>
      <AppHeader />
      <Route exact path='/' render={() => <Home activeUser={activeUser} setActiveUser={setActiveUser}/>}/>
      <Route path='/room/:id' render={() => <GameRoom activeUser={activeUser}/>}/>
    </Layout>
  );
}

export default App;

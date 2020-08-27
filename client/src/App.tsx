import React, { useState } from 'react';
import './App.css';
import { Layout } from 'antd'
import { AppHeader } from './components/AppHeader/AppHeader';
import { Home} from './components/Home/Home'
import { Route } from 'react-router';
import { GameRoom } from './components/GameRoom/GameRoom';



function App() {
  const [activeUser, setActiveUser] = useState<any>({})

  return (
    <Layout>
      <AppHeader />
      <Route exact path='/' render={() => <Home activeUser={activeUser} setActiveUser={setActiveUser}/>}/>
      <Route path='/room/:id' render={() => <GameRoom activeUser={activeUser}  setActiveUser={setActiveUser}/>}/>
    </Layout>
  );
}

export default App;

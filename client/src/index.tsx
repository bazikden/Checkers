import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
ReactDOM.render(

    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root')
);


serviceWorker.unregister();

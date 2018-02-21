import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';


import Login from './components/Login/Login';
import Register from './components/Register/Register'
import Game from './components/Game/Game';
import reducers from './reducers/'

let store = createStore(reducers);

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" name="App" component={App}/>
                <Route exact path="/login" name="Login" component={Login}/>
                <Route exact path="/register" name="Register" component={Register}/>
                <Route exact path="/game" name="Game" component={Game}/>
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();

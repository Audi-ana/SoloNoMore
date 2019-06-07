import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import BaseLayout from './components/BaseLayout'
import Home from './components/Home'
import IntroPage from './components/IntroPage'
import {Register} from './components/Register'
import setAuthenticationHeader from './utils/authenticate'
import requireAuth from './components/requireAuth'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__())

const token = localStorage.getItem('jsonwebtoken')
setAuthenticationHeader(token)



ReactDOM.render(
   
    <Provider store={store}>
    <BrowserRouter>
    <BaseLayout>
    <Switch>
        <Route path="/" exact component={IntroPage}/>
        <Route path="/Registration-Login" component={Register}/>
        <Route path="/home" component={requireAuth(Home)}/>
   </Switch>
   </BaseLayout>
   </BrowserRouter>
   </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

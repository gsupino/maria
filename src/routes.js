import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

export default (
  <Route component={App}>
    <Route path="/" component={Home}/>
    <Route path="/sign-up" component={SignUp}/>
    <Route path="/login" component={Login}/>
  </Route>
);

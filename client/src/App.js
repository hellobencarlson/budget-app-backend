import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import withContext from './Context';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Budget from './components/Budget';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import SignUp from './components/SignUp';
import Error from './components/Error';
import PrivateRoute from './components/PrivateRoute';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const HeaderWithContext = withContext(Header);
const BudgetWithContext = withContext(Budget);
const SignInWithContext = withContext(SignIn);
const SignUpWithContext = withContext(SignUp);
const SignOutWithContext = withContext(SignOut);

export default class App extends Component {

  render() {
      return (
        <BrowserRouter>
            <HeaderWithContext />
            <Switch>
                <Route exact path="/signin" component={SignInWithContext} />
                <Route exact path="/signup" component={SignUpWithContext} />
                <Route exact path="/signout" component={SignOutWithContext} />
                <PrivateRoute path="/accounts" component={BudgetWithContext} />
                <Route path="/error" component={Error} />
                <Route component={NotFound} />
            </Switch>
        
        </BrowserRouter>
      )
  }

}
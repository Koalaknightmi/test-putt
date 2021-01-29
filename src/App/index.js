import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ROUTES from '../static/routes';

import Navigation from '../components/Navigation'
import HomePage from '../pages/Home';
import LoggingPage from '../pages/Logging';
import RegestrationPage from '../pages/Regester'
import LoginPage from '../pages/Login'

import {AddUserData} from '../components/UserSessionMonitor'

import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

const App = () => (
  <Router>
    <div>
      <Navigation/>
      <Toolbar/>
      <Container>
        <Switch>
          <Route exact path={ROUTES[0].route} component={HomePage} />
          <Route path={ROUTES[3].route} component={LoggingPage} />
          <Route path={ROUTES[2].route} component={RegestrationPage}/>
          <Route path={ROUTES[1].route} component={LoginPage}/>
        </Switch>
      </Container>
    </div>
  </Router>
);

export default AddUserData(App);

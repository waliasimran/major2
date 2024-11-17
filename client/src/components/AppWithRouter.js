import React from 'react';
import createHistory from 'history/createBrowserHistory';
//createHistory is imported from the history package to create a browser history object.
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import withAnalytics, { initAnalytics } from 'react-with-analytics';
//withAnalytics and initAnalytics are imported from 'react-with-analytics'. These are utility functions for integrating analytics into React components.

import DiscoverPage from '../containers/DiscoverPage';
import FollowingPage from '../containers/FollowingPage';
import HomePage from '../containers/HomePage';
import LoginPage from '../containers/LoginPage';
import ProfilePage from '../containers/ProfilePage';
import SettingsPage from '../containers/SettingsPage';
import SignupPage from '../containers/SignupPage';
import NotFound from './NotFound';

initAnalytics('UA-126201794-1');
export const history = createHistory();

//The history object is used by the Router to keep track of the navigation history.

const Root = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/profile/:id" component={ProfilePage} />
    <Route path="/following" component={FollowingPage} />
    <Route path="/discover" component={DiscoverPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route component={NotFound} />
  </Switch>
);

const App = withRouter(withAnalytics(Root));

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;

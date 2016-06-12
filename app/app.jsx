var React = require('react');
var {Route, Router, IndexRoute, browserHistory} = require('react-router');
var ReactDOM = require('react-dom');
import {Provider} from 'react-redux';

var store = require('./store').configureStore();


import SetRouterSite from './components/HOC/SetRouterSite';

import Main from 'Main';
  import Home from 'Home';
  import Dashboard from 'Dashboard';
  import Account from 'Account';
  import Login from 'Login';
  import Signup from 'Signup';
  import Settings from './components/Settings';
    import SettingsHome from './components/Settings/SettingsHome';
    import SettingsItem from './components/Settings/SettingsItem';

import {authUser} from 'actions';


// Auto-authenticate
var token = localStorage.getItem('token');
var user_id = localStorage.getItem('user_id');
if (token && user_id) {
  store.dispatch(authUser(user_id));
}


$(document).foundation();
require('style!css!sass!applicationStyles');
require('style!css!sass!../node_modules/font-awesome/scss/font-awesome.scss');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home}/>
        <Route path="dashboard" component={Dashboard}/>
        <Route path="account" component={Account}/>
        <Route path="login" component={Login}/>
        <Route path="signup" component={Signup}/>
        <Route path="settings" component={Settings}>
          <IndexRoute component={SettingsHome}/>
          <Route path=":siteId" component={SetRouterSite(SettingsItem)}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

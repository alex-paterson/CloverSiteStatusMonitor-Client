var React = require('react');
var {Route, Router, IndexRoute, browserHistory} = require('react-router');
var ReactDOM = require('react-dom');
import {Provider} from 'react-redux';
import {LoadingComponent} from 'react-loading-indicator-component';

var store = require('./store').configureStore();


import SetRouterSite from './components/HOC/SetRouterSite';

import LoadingIndicator from 'LoadingIndicator';

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
import {userPayloadLoader} from 'loaders';


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
        <Route path="login" component={Login}/>
        <Route path="signup" component={Signup}/>

        <Route path="dashboard" component={LoadingComponent(Dashboard, LoadingIndicator, [userPayloadLoader])}/>
        <Route path="account" component={LoadingComponent(Account, LoadingIndicator, [userPayloadLoader])}/>
        <Route path="settings" component={LoadingComponent(Settings, LoadingIndicator, [userPayloadLoader])}>
          <IndexRoute component={SettingsHome}/>
          <Route path=":siteId" component={SetRouterSite(SettingsItem)}/>
        </Route>

      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

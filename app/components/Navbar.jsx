var React = require('react');
import {connect} from 'react-redux';
import {Link, IndexLink, browserHistory} from 'react-router';

import {signoutUser} from 'actions';

export var Navigation = React.createClass({
  onLogout: function (e) {
    var {dispatch} = this.props;
    e.preventDefault();

    dispatch(signoutUser());
    browserHistory.push('/');
  },
  render: function() {
    var {auth} = this.props;

    var renderLeftItems = () => {
      if (auth.authenticated) {
        return (
          [
            <li key={1} className="menu-item">
              <div>
                <Link to="/dashboard" activeClassName="active-link">Dashboard</Link>
              </div>
            </li>
          ,
            <li key={2} className="menu-item">
              <div>
                <Link to="/settings" activeClassName="active-link">Settings</Link>
              </div>
            </li>
          ,
            <li key={3} className="menu-item">
              <div>
                <Link to="/account" activeClassName="active-link">Account</Link>
              </div>
            </li>
          ]
        );
      }
    }

    var renderRightItems = () => {
      if (auth.authenticated) {
        return (
          <li className="menu-item">
            <div>
              <a href="/logout" onClick={this.onLogout}>Logout</a>
            </div>
          </li>
        );
      } else {
        return (
          [
            <li key={1} className="menu-item">
              <div>
                <Link to="/login" activeClassName="active-link">Log In</Link>
              </div>
            </li>
          ,
            <li key={2} className="menu-item">
              <div>
                <Link to="/signup" activeClassName="active-link">Sign Up</Link>
              </div>
            </li>
          ]
        );
      }
    }

    return (
      <div className="row">
        <div className="columns small-12 large-10 small-centered">
          <div className="top-bar">
            <div className="top-bar-left">
              <ul className="menu">
                <li className="menu-logo">
                  <img className="clover-logo" src="/clover.svg"/>
                </li>
                <li key={1} className="menu-item">
                  <div>
                    <IndexLink to="/" activeClassName="active-link">Home</IndexLink>
                  </div>
                </li>
                {renderLeftItems()}
              </ul>
            </div>
            <div className="top-bar-right">
              <ul className="menu">
                {renderRightItems()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = connect((state) => {
  return {
    auth: state.auth
  }
})(Navigation);

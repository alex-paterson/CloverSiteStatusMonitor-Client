var React = require('react');
var PropTypes = React.PropTypes;

import {Link} from 'react-router';
import {beginDeleteAccount} from 'actions';


var Account = React.createClass({
  deleteAccount: function(e) {
    e.preventDefault();
    console.log("Deleting!");
    this.props.dispatch(beginDeleteAccount());
  },
  render: function() {
    return (
      <div className="row">
        <div className="column small-centered small-11 large-8">
          <h1>Account</h1>
          <Link to="#" onClick={this.deleteAccount} className="button expanded alert">Delete Account</Link>
        </div>
      </div>
    );
  }
});

module.exports = Account;

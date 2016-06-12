import React from 'react';
import {connect} from 'react-redux';

import {removeAlert} from 'actions';

var Alert = connect()(React.createClass({
  removeAlert: function() {
    var {dispatch, alert} = this.props;
    dispatch(removeAlert(alert.id));
  },
  render: function() {
    var {alert} = this.props;
    return (
      <div className={alert.style} key={alert.id} onClick={this.removeAlert}>
        <div className="flex">
          <div>
            {alert.text}
          </div>
          <div className="settings-action">
            <i className="fa fa-close"></i>
          </div>
        </div>
      </div>
    );
  }
}));


export var Alerts = React.createClass({
  render: function() {
    var {alerts} = this.props;

    var renderAlerts = () => {
      return alerts.map((alert) => {
        return <Alert key={alert.id} alert={alert}/>
      });
    }

    return (
      <div className="alerts">
        {renderAlerts()}
      </div>
    );
  }
});

module.exports = connect((state) => {
  return {
    alerts: state.alerts
  }
})(Alerts);

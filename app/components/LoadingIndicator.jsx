var React = require('react');
import {connect} from 'react-redux';

export var LoadingIndicator = React.createClass({
  render: function() {
    return (
      <div className="page-loading-indicator">
        <h1>{this.props.text}</h1>
      </div>
    );
  }
});

module.exports = connect((state) => {
  return {
    text: state.loading.screenLoadingText
  }
})(LoadingIndicator);

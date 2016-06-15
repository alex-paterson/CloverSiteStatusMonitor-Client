var React = require('react');
import {connect} from 'react-redux';

export var LoadingIndicator = React.createClass({
  render: function() {
    var {loadingText} = this.props;
    return (
      <div className="page-loading-indicator">
        <h1>{loadingText}</h1>
      </div>
    );
  }
});

module.exports = connect((state) => {
  return {
    text: state.loading.screenLoadingText
  }
})(LoadingIndicator);

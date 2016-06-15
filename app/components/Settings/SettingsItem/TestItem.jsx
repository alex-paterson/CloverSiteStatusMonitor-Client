var React = require('react');
import {connect} from 'react-redux';
import {LoadingComponent} from 'react-loading-indicator-component';

import LoadingIndicator from '../../LoadingIndicator';
import {beginDeleteTest} from 'actions';

export var TestItem = React.createClass({
  onDeleteTest: function() {
    var {dispatch, siteId, startLoading, endLoading} = this.props;
    startLoading("Deleting item...");
    dispatch(beginDeleteTest(siteId, this.props.testObject._id)).then(() => {
      endLoading();
    });
  },
  render: function() {
    var {testObject} = this.props;
    var {testObject: {name, extension, match}} = this.props;
    var testId = testObject._id;
    return (
      <div className="table-row">
        <div className="grow info-cell" colSpan="2">
          <h4>{name}</h4>
          <h5>{extension}</h5>
          <p>{match}</p>
        </div>
        <div style={{textAlign: 'right'}}>
          <span className="settings-action" onClick={this.onDeleteTest}><i className="fa fa-close"></i></span>
        </div>
      </div>
    );
  }
});

module.exports = connect()(LoadingComponent(TestItem, LoadingIndicator));

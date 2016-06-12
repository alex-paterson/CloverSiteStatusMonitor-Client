var React = require('react');
import {connect} from 'react-redux';

import {beginDeleteTest} from 'actions';

export var TestItem = React.createClass({
  onDeleteSite: function() {
    var {dispatch, siteId} = this.props;
    dispatch(beginDeleteTest(siteId, this.props.testObject._id));
  },
  render: function() {
    var {testObject} = this.props;
    var {testObject: {name, extension, match}} = this.props;
    var testId = testObject._id;
    return (
      <tbody>
        <tr>
          <td colSpan="2">
            <h4>{name}</h4>
            <h5>{extension}</h5>
            <p>{match}</p>
          </td>
          <td style={{textAlign: 'right'}}>
            <span className="settings-action" onClick={this.onDeleteSite}><i className="fa fa-close"></i></span>
          </td>
        </tr>
      </tbody>
    );
  }
});

module.exports = connect()(TestItem);

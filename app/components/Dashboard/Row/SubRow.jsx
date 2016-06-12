var React = require('react');
import {connect} from 'react-redux';

import {reloadTest} from 'actions';
import {getTestItemFromSitesArray} from 'helpers';


export var SubRow = React.createClass({
  refreshItem: function() {
    var {sites, siteId, testId} = this.props;
    var {name, extension, match, status} = getTestItemFromSitesArray(sites, siteId, testId);
    var {dispatch, baseUrl, siteId} = this.props;
    var testUrl = `${baseUrl}${extension}`;

    dispatch(reloadTest(siteId, testId, testUrl, match));
  },
  componentWillMount: function() {
    this.refreshItem();
  },
  render: function() {
    var {sites, siteId, testId} = this.props;
    var {name, extension, match, status} = getTestItemFromSitesArray(sites, siteId, testId);

    var renderStatus = () => {
      if (status == 'loading') {
        return (
          <span>LOADING <i className="fa fa-spin fa-refresh"></i></span>
        );
      } else if (status == 'okay') {
        return (
          <span>OKAY <i className="okay fa fa-dot-circle-o"></i></span>
        );
      } else {
        return (
          <span>FAIL <i className="failure fa fa-dot-circle-o"></i></span>
        );
      }
    }
    return (
      <tr>
        <td>{this.props.children}</td>
        <td>{name}</td>
        <td className="status-cell" onClick={this.refreshItem}>{renderStatus()}</td>
      </tr>
    );
  }
});


module.exports = connect((state) => {
  return {
    sites: state.sites.siteObjects
  }
})(SubRow);

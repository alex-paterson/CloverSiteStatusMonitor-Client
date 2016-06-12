var React = require('react');
import {connect} from 'react-redux';
var {browserHistory} = require('react-router');

import {getSiteItemFromSitesArray} from 'helpers';
import {beginDeleteSite} from 'actions';


export var SiteItem = React.createClass({
  onDeleteSite: function() {
    var {dispatch, siteId} = this.props;
    dispatch(beginDeleteSite(this.props.siteId));
  },
  onClickSettings: function() {
    var {siteId} = this.props;
    browserHistory.push(`settings/${siteId}`);
  },
  render: function() {
    var {sites, siteId} = this.props;
    var site = getSiteItemFromSitesArray(sites, siteId);
    return (
      <tbody>
        <tr>
          <td><a className="site-url" href={site.url}>{site.name}</a></td>
          <td style={{textAlign: 'right'}}>
            <span className="settings-action" onClick={this.onClickSettings}><i className="fa fa-cog"></i></span>
            <span className="settings-action" onClick={this.onDeleteSite}><i className="fa fa-close"></i></span>
          </td>
        </tr>
      </tbody>
    );
  }
});

module.exports = connect((state) => {
  return {
    sites: state.sites.siteObjects
  }
})(SiteItem);

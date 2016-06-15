var React = require('react');
import {connect} from 'react-redux';
var {browserHistory} = require('react-router');
import {LoadingComponent} from 'react-loading-indicator-component';

import LoadingIndicator from '../../LoadingIndicator';
import {getSiteItemFromSitesArray} from 'helpers';
import {beginDeleteSite} from 'actions';


export var SiteItem = React.createClass({
  onDeleteSite: function() {
    var {dispatch, siteId, startLoading, endLoading} = this.props;
    startLoading();
    dispatch(beginDeleteSite(this.props.siteId)).then(() => {
      endLoading();
    });
  },
  onClickSettings: function() {
    var {siteId} = this.props;
    browserHistory.push(`settings/${siteId}`);
  },
  render: function() {
    var {sites, siteId} = this.props;
    var site = getSiteItemFromSitesArray(sites, siteId);
    return (
      <div className="site-item">
        <div><a className="site-url" href={site.url}>{site.name}</a></div>
        <div style={{textAlign: 'right'}}>
          <span className="settings-action" onClick={this.onClickSettings}><i className="fa fa-cog"></i></span>
          <span className="settings-action" onClick={this.onDeleteSite}><i className="fa fa-close"></i></span>
        </div>
      </div>
    );
  }
});

module.exports = connect((state) => {
  return {
    sites: state.sites.siteObjects
  }
})(LoadingComponent(SiteItem, LoadingIndicator));

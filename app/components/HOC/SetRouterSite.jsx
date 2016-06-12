import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSiteItemFromSitesArray } from 'helpers';

export default function(ComposedComponent) {
  class SetRouterSite extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    render() {
      var {dispatch, sites, params: {siteId}} = this.props;
      var site = getSiteItemFromSitesArray(sites, siteId);
      return <ComposedComponent site={site} {...this.props} />
    }
  }

  return connect((state) => {
    return {
      sites: state.sites.siteObjects
    }
  })(SetRouterSite);
}

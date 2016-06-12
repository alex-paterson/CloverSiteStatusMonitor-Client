var React = require('react');
import {connect} from 'react-redux';

import NewSiteForm from './SettingsHome/NewSiteForm';
import SiteItem from './SettingsHome/SiteItem';

export var SettingsHome = React.createClass({
  render: function() {
    var {sites} = this.props;

    var renderSiteItems = () => {
      return sites.map((site) => {
        return (
          <SiteItem key={site._id} siteId={site._id}/>
        );
      });
    }
    if (sites && sites.length != 0) {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Website</th>
                <th></th>
              </tr>
            </thead>
            {renderSiteItems()}
          </table>
          <NewSiteForm />
        </div>
      );
    } else {
      return (
        <div>
          <h2>You have no sites! Add one here.</h2>
          <NewSiteForm />
        </div>
      );
    }
  }
});

module.exports = connect((state) => {
  return {
    sites: state.sites.siteObjects
  }
})(SettingsHome);

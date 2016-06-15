var React = require('react');
import {connect} from 'react-redux';
import axios from 'axios';

import {getSites} from 'actions';
import Row from './Dashboard/Row';
import NewSiteForm from './Settings/SettingsHome/NewSiteForm';


export var Dashboard = React.createClass({
  componentWillMount: function() {
    var {dispatch} = this.props;
  },
  render: function() {
    var siteObjects = this.props.sites;

    var renderSites = (siteObjects) => {
      return siteObjects.map((siteObject) => {
        return (
          <Row key={siteObject._id} siteObject={siteObject}/>
        );
      });
    }


    var renderTable = (siteObjects) => {
      if (siteObjects.length != 0) {
        return (
          <table className="dashboard">
            <thead>
              <tr>
                <th>Website</th>
                <th>Test</th>
                <th style={{textAlign: 'right', width: '7rem'}}>Status</th>
              </tr>
            </thead>
            {renderSites(siteObjects)}
          </table>
        );
      } else {
        return (
          <div style={{display: 'block'}}>
            <h2>You have no sites! Add one here.</h2>
            <div>
              <NewSiteForm />
            </div>
          </div>
        );
      }
    }

    return (
      <div className="row dashboard">
        <div className="column small-centered small-11 large-8">
          <h1>Dashboard</h1>
          {renderTable(siteObjects)}
        </div>
      </div>
    );
  }
});


module.exports = connect((state) => {
  return {
    sites: state.sites.siteObjects
  }
})(Dashboard);

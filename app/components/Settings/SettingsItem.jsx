var React = require('react');
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import NewTestForm from './SettingsItem/NewTestForm';
import UpdateSiteForm from './SettingsItem/UpdateSiteForm';
import TestItem from './SettingsItem/TestItem';

export var SettingsItem = React.createClass({
  render: function() {
    var {site} = this.props;

    var renderTests = () => {
      var tests = site.tests;
      if (tests && tests.length != 0) {
        return tests.map((test) => {
          return <TestItem key={test._id} siteId={site._id} testObject={test}/>
        });
      } else {
        return (
          <h3 style={{textAlign: 'center', padding: '2rem 0rem', borderBottom: '2px solid #f1f1f1'}}>No tests</h3>
        );
      }
    }

    if (site) {
      return (
        <div className="site-settings">
          <UpdateSiteForm siteId={site._id} initialValues={site}/>
          <hr/>
          <h1 syle={{marginTop: '3rem'}}>Tests</h1>
          <div className="siteTestsTable">
            {renderTests()}
          </div>
          <NewTestForm site={site}/>
        </div>
      );
    } else {
      return (
        <h2>Couldn't find that site.</h2>
      )
    }
  }
});


export default SettingsItem;

var React = require('react');
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {beginUpdateSite} from 'actions';
import {reduxForm, initialize} from 'redux-form';
import {getSiteItemFromSitesArray} from 'helpers';

import NewTestForm from './SettingsItem/NewTestForm';
import TestItem from './SettingsItem/TestItem';

export var SettingsItem = React.createClass({
  onSubmit: function() {
    var {dispatch, params: {siteId}, fields: {name, url}} = this.props;
    dispatch(beginUpdateSite(siteId, {name: name.value, url: url.value}));
  },
  goBack: function(e) {
    e.preventDefault()
    browserHistory.push("/settings");
  },
  render: function() {
    var {handleSubmit, site, fields: {name, url}} = this.props;

    var renderTests = () => {
      var tests = site.tests;
      if (tests && tests.length != 0) {
        return tests.map((test) => {
          return <TestItem key={test._id} siteId={site._id} testObject={test}/>
        });
      } else {
        return (
          <tbody>
            <tr>
              <td colSpan="3"><h4>No tests</h4></td>
            </tr>
          </tbody>
        );
      }
    }

    if (site) {
      return (
        <div className="site-settings">
          <form onSubmit={handleSubmit(this.onSubmit)}>

            <label className="solid-text-grey">Name {name.touched && name.error && <span className="login-form-error"> - {name.error}</span>}</label>
            <input type="text" ref="name" className="h2-input" placeholder={site.name}  {...name}/>

            <label className="solid-text-grey">URL {url.touched && url.error && <span className="login-form-error"> - {url.error}</span>}</label>
            <input type="text" ref="url" className="h2-input" placeholder={site.url} {...url}/>

            <div className="row">
              <div className="columns small-6">
                <button onClick={this.goBack} className="button expanded hollow">Back</button>
              </div>
              <div className="columns small-6">
                <button className="button expanded">Update</button>
              </div>
            </div>
          </form>
          <hr/>
          <h1 syle={{marginTop: '3rem'}}>Tests</h1>
          <table>
            {renderTests()}
          </table>
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


function validate(formProps) {
  var errors = {};
  if (!formProps.name) {
    errors.name = "Please enter a name";
  }
  if (!formProps.url) {
    errors.url = "Please enter a url";
  }
  return errors;
}

var mapStateToProps = (state) => {
  return {
    sites: state.sites.siteObjects
  }
}

var formOptions = {
  form: 'settings-item',
  fields: ['name', 'url'],
  validate
}

export default reduxForm(formOptions, mapStateToProps, null)(SettingsItem);

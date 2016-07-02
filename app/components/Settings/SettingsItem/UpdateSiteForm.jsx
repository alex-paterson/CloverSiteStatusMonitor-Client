import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {LoadingComponent} from 'react-loading-indicator-component';
import {browserHistory} from 'react-router';

import LoadingIndicator from '../../LoadingIndicator';
import {beginUpdateSite} from 'actions';


// export var renderUpdateSiteForm(initialValues)
export var UpdateSiteForm = React.createClass({
  onSubmit: function() {
    var {dispatch, siteId, fields: {name, url}, startLoading, endLoading} = this.props;
    startLoading("Loading!");
    dispatch(beginUpdateSite(siteId, {name: name.value, url: url.value})).then(() => {
      endLoading();
    });
  },
  goBack: function(e) {
    e.preventDefault()
    browserHistory.push("/settings");
  },
  render: function() {
    var {handleSubmit, fields: {name, url}} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>

        <label className="solid-text-grey">Name {name.touched && name.error && <span className="login-form-error"> - {name.error}</span>}</label>
        <input type="text" ref="name" className="h2-input" {...name}/>

        <label className="solid-text-grey">URL {url.touched && url.error && <span className="login-form-error"> - {url.error}</span>}</label>
        <input type="text" ref="url" className="h2-input" {...url}/>

        <div className="row">
          <div className="columns small-6">
            <button onClick={this.goBack} className="button expanded hollow">Back</button>
          </div>
          <div className="columns small-6">
            <button type="submit" className="button expanded">Update</button>
          </div>
        </div>
      </form>
    );
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

var formOptions = {
  form: 'settings-item',
  fields: ['name', 'url'],
  validate
}


export default reduxForm(formOptions, null, null)(LoadingComponent(UpdateSiteForm, LoadingIndicator));

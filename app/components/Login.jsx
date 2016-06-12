import React from 'react';
import {browserHistory} from 'react-router';
import { reduxForm } from 'redux-form';

import {loginUser} from 'actions';

export var Login = React.createClass({
  onSubmit: function(formProps) {
    this.props.loginUser(formProps);
  },
  render: function() {
    var {handleSubmit, fields: {email, password}} = this.props;
    return (
      <div className="row">
        <div className="small-11 medium-6 columns small-centered">
          <h1>Login In</h1>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <label>Email {email.touched && email.error && <span className="login-form-error"> - {email.error}</span>}
              <input type="email" ref="email" placeholder="Email" {...email}/>
            </label>

            <label>Password {password.touched && password.error && <span className="login-form-error"> - {password.error}</span>}
              <input type="password" ref="password" placeholder="Password" {...password}/>
            </label>

            <button style={{width: '100%'}} className="button expand">Submit</button>
          </form>
        </div>
      </div>
    );
  }
});


function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = "Please enter an email";
  }
  if (!formProps.password) {
    errors.password = "Please enter a password";
  }
  return errors;
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password'],
  validate
}, null, {loginUser})(Login);

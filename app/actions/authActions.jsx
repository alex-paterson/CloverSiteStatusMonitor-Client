import axios from 'axios';
import {browserHistory} from 'react-router';

import {SIGNIN_URL, SIGNUP_URL} from 'api';

import * as alertActions from './alertActions';
import * as userActions from './userActions';
import {setAllSites} from './siteActions';


export function loginUser({email, password}) {
  return function(dispatch) {
    return axios.post(SIGNIN_URL, {email: email.toLowerCase(), password})
      .then((response) => {
        dispatch(authUser(response.data.user_id));
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        if (response.data.sites) {
          dispatch(setAllSites(response.data.sites));
        }
        browserHistory.push('/dashboard');
      })
      .catch((response) => {
        console.log(response)
        dispatch(alertActions.addAlert("Incorrect username or password.", 'danger'));
      });
  }
}

export function signupUser({email, password}) {
  return function(dispatch) {
    return axios.post(SIGNUP_URL, {email: email.toLowerCase(), password})
      .then(response => {
        dispatch(authUser(response.data.user_id));
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        browserHistory.push('/dashboard');
      })
      .catch((response) => {
        if (response.data && response.data.error) {
          dispatch(alertActions.addAlert(response.data.error, 'danger'));
        } else if (response.status === 422) {
          dispatch(alertActions.addAlert("Email address taken.", 'danger'));
        } else if (response.status === 404 || response.status === 500) {
          dispatch(alertActions.addAlert("Internal error.", 'danger'));
        } else {
          dispatch(alertActions.addAlert("Could not create alert.", 'danger'));
        }
      });
  }
}

// export function submitResetPassword({email}) {
//   return function(dispatch) {
//     dispatch(loadingActions.startLoadingScreen("Submitting reset request..."));
//     axios.post(RESET_PASSWORD_URL, {email: email.toLowerCase()})
//       .then(response => {
//         dispatch(alertActions.addAlert("Check your email for a password reset link!", 'success'));
//         dispatch(loadingActions.stopLoadingScreen());
//       })
//       .catch(response => {
//         if (response.data && response.data.error) {
//           dispatch(alertActions.addAlert(response.data.error, 'danger'));
//         } else if (response.status === 500) {
//           dispatch(alertActions.addAlert("Internal error.", 'danger'));
//         } else {
//           dispatch(alertActions.addAlert("Could not reset password. Please contact support.", 'danger'));
//         }
//         dispatch(loadingActions.stopLoadingScreen());
//       });
//   }
// }
//
// export function submitResetPasswordComplete({password}, user_id, token) {
//   return function(dispatch) {
//     dispatch(loadingActions.startLoadingScreen("Resetting password..."));
//     axios.post(RESET_PASSWORD_COMPLETE_URL(user_id), {password, token})
//       .then(response => {
//         dispatch(alertActions.addAlert("Password reset!", 'success'));
//         browserHistory.push("/login");
//         dispatch(loadingActions.stopLoadingScreen());
//       })
//       .catch(response => {
//         console.log(response);
//         if (response.data && response.data.error) {
//           dispatch(alertActions.addAlert(response.data.error, 'danger'));
//         } else if (response.status === 500) {
//           dispatch(alertActions.addAlert("Internal error.", 'danger'));
//         } else {
//           dispatch(alertActions.addAlert("Could not reset password. Please contact support.", 'danger'));
//         }
//         dispatch(loadingActions.stopLoadingScreen());
//       });
//   }
// }

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  return {type: 'UNAUTH_USER'};
}

export function authUser(user_id) {
  return {type: 'AUTH_USER', user_id};
}

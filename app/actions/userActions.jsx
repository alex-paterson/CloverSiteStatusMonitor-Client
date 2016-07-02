import axios from 'axios';

import {USER_URL} from 'api';
import {startLoading, endLoading} from 'react-loading-indicator-component';
import {setAllSites} from './siteActions';
import {addAlert} from './alertActions';
import {signoutUser} from './authActions';
import {userPayloadLoader} from 'loaders';
import {browserHistory} from 'react-router';


var AUTH_TOKEN = () => {
  return localStorage.getItem('token');
}

export function getUserPayload() {
  return function(dispatch) {
    dispatch(startLoading(userPayloadLoader, "Logging in..."));
    return axios.get(USER_URL(localStorage.getItem('user_id')), {
      headers: { authorization: AUTH_TOKEN() }
    })
      .then((response) => {
        dispatch(setAllSites(response.data.sites));
        dispatch(endLoading(userPayloadLoader));
      })
      .catch((response) => {
        console.log(response);
        dispatch(endLoading(userPayloadLoader));
      });
  }
}

export function beginDeleteAccount() {
  return function(dispatch) {
    dispatch(startLoading(userPayloadLoader, "Deleting Account..."));
    return axios.delete(USER_URL(localStorage.getItem('user_id')), {
      headers: { authorization: AUTH_TOKEN() }
    })
      .then((response) => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('token');
        dispatch(addAlert("Account deleted!", "success"));
        dispatch(signoutUser());
        dispatch(setAllSites([]));
        browserHistory.push("/");
        dispatch(endLoading(userPayloadLoader));
      })
      .catch((response) => {
        console.log(response);
        dispatch(endLoading(userPayloadLoader));
      });
  }
}

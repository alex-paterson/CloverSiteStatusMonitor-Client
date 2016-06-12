import axios from 'axios';

import {USER_URL} from 'api';
import {toggleLoadingScreen} from './loadingActions';
import {setAllSites} from './siteActions';
import {addAlert} from './alertActions';

var AUTH_TOKEN = () => {
  return localStorage.getItem('token');
}

export function getUserPayload() {
  return function(dispatch) {
    dispatch(toggleLoadingScreen("Logging in..."));
    axios.get(USER_URL(localStorage.getItem('user_id')), {
      headers: { authorization: AUTH_TOKEN() }
    })
      .then((response) => {
        dispatch(setAllSites(response.data.sites));
        dispatch(toggleLoadingScreen(""));
      })
      .catch((response) => {
        dispatch(toggleLoadingScreen(""));
      });
  }
}

import axios from 'axios';

import {USER_URL} from 'api';
import {startLoading, endLoading} from 'react-loading-indicator-component';
import {setAllSites} from './siteActions';
import {addAlert} from './alertActions';
import {userPayloadLoader} from 'loaders';


var AUTH_TOKEN = () => {
  return localStorage.getItem('token');
}

export function getUserPayload() {
  return function(dispatch) {
    dispatch(startLoading(userPayloadLoader, "Logging in..."));
    axios.get(USER_URL(localStorage.getItem('user_id')), {
      headers: { authorization: AUTH_TOKEN() }
    })
      .then((response) => {
        dispatch(setAllSites(response.data.sites));
        dispatch(endLoading(userPayloadLoader));
      })
      .catch((response) => {
        dispatch(endLoading(userPayloadLoader));
      });
  }
}

import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './authReducer';
import alertReducer from './alertReducer';
// import loadingReducer from './loadingReducer';
import {loadingReducer} from 'react-loading-indicator-component';
import siteReducer from './siteReducer';


export default combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  form: formReducer,
  loading: loadingReducer,
  sites: siteReducer
});

import axios from 'axios';

import {QUERY_URL, USER_SITES_URL, SITE_URL, TESTS_URL, TEST_URL} from 'api';
import {startLoading, endLoading} from 'react-loading-indicator-component';
import {mainLoader} from 'loaders';
import {addAlert} from './alertActions';

var AUTH_TOKEN = () => {
  return localStorage.getItem('token');
}
var USER_ID = () => {
  return localStorage.getItem('user_id')
}


export var setSiteStatus = (site_id, test_id, status) => {
  return {
    type: 'SET_SITE_STATUS',
    site_id,
    test_id,
    status
  };
};

export var updateSite = (site) => {
  return {
    type: 'UPDATE_SITE',
    site
  };
};

export var createSite = (site) => {
  return {
    type: 'CREATE_SITE',
    site
  };
};

export var deleteSite = (site_id) => {
  return {
    type: 'DELETE_SITE',
    site_id
  };
};

export var setAllSites = (sites) => {
  return {
    type: 'SET_ALL_SITES',
    sites
  };
};


export function beginCreateSite(url) {
  return (dispatch, getStore) => {
    dispatch(startLoading(mainLoader, "Creating site..."));
    return axios.post(USER_SITES_URL(USER_ID()), {url}, {headers: {authorization: AUTH_TOKEN()} })
    .then((response) => {
      dispatch(createSite(response.data.site));
      dispatch(endLoading(mainLoader));
    })
    .catch((response) => {
      console.log(response);
      dispatch(addAlert("Could not create site.", 'danger'));
      dispatch(endLoading(mainLoader));
    });
  }
}

export function beginCreateTest(siteId, testObject) {
  return (dispatch, getStore) => {
    dispatch(startLoading(mainLoader, "Creating test..."));
    return axios.post(TESTS_URL(USER_ID(), siteId), testObject, {headers: {authorization: AUTH_TOKEN()} })
    .then((response) => {
      dispatch(updateSite(response.data.site));
      dispatch(endLoading(mainLoader));
    })
    .catch((response) => {
      console.log(response);
      dispatch(addAlert("Could not create test.", 'danger'));
      dispatch(endLoading(mainLoader));
    });
  }
}

export function beginDeleteTest(siteId, testId) {
  return (dispatch, getStore) => {
    dispatch(startLoading(mainLoader, "Deleting test..."));
    return axios.delete(TEST_URL(USER_ID(), siteId, testId), {headers: {authorization: AUTH_TOKEN()} })
    .then((response) => {
      dispatch(updateSite(response.data.site));
      dispatch(endLoading(mainLoader));
    })
    .catch((response) => {
      console.log(response);
      dispatch(addAlert("Could not delete test.", 'danger'));
      dispatch(endLoading(mainLoader));
    });
  }
}

export function beginDeleteSite(site_id) {
  return (dispatch, getStore) => {
    dispatch(startLoading(mainLoader, "Deleting site..."));
    return axios.delete(SITE_URL(USER_ID(), site_id), {headers: {authorization: AUTH_TOKEN()}})
      .then((response) => {
        dispatch(deleteSite(site_id));
        dispatch(endLoading(mainLoader));
      })
      .catch((response) => {
        console.log(response);
        dispatch(addAlert("Could not delete site.", 'danger'));
        dispatch(endLoading(mainLoader));
      });
  }
}

export function beginUpdateSite(site_id, {name, url}) {
  return (dispatch, getStore) => {
    return axios.patch(
      SITE_URL(USER_ID(), site_id), {
        name,
        url,
      }, {
        headers: {
          authorization: AUTH_TOKEN()
        }
      }
    ).then((response) => {
      dispatch(updateSite(response.data.site));
    }).catch((response) => {
      console.log(response);
      dispatch(addAlert("Could not update site.", 'danger'));
    });
  }
}

export function reloadAllTests(sites) {
  return (dispatch, getStore) => {
    if (sites) {
      sites.forEach((site) => {
        site.tests.forEach((test) => {
          var testUrl = `${site.url}${test.extension}`;
          dispatch(reloadTest(site._id, test._id, testUrl, test.match));
        });
      });
    } else {
      console.log("reloadAllTests called but no sites");
    }
  }
}


// export function getSites() {
//   return function(dispatch) {
//     dispatch(startLoading(mainLoader, ));
//     axios.get(USER_SITES_URL)
//       .then((response) => {
//         dispatch(setAllSites(response.data.sites));
//         dispatch(startLoading(mainLoader, ));
//       })
//       .catch((response) => {
//         dispatch(startLoading(mainLoader, ));
//       });
//   }
// }


export function reloadTest(site_id, test_id, url, match) {
  return function(dispatch) {
    dispatch(setSiteStatus(site_id, test_id, 'loading'));
    return axios.get(QUERY_URL, {params: {url, match}, headers: {authorization: AUTH_TOKEN()}})
      .then((response) => {
        if (response.data.success) {
          dispatch(setSiteStatus(site_id, test_id, 'okay'));
        } else {
          dispatch(setSiteStatus(site_id, test_id, 'fail'));
        }
      })
      .catch((response) => {
        dispatch(setSiteStatus(site_id, test_id, 'fail'));
      });
  }
}

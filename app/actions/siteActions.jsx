import axios from 'axios';

import {QUERY_URL, USER_SITES_URL, SITE_URL, TESTS_URL, TEST_URL} from 'api';
import {toggleLoadingScreen} from './loadingActions';
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
    dispatch(toggleLoadingScreen("Creating site..."));
    axios.post(USER_SITES_URL(USER_ID()), {url}, {headers: {authorization: AUTH_TOKEN()} })
    .then((response) => {
      dispatch(createSite(response.data.site));
      dispatch(toggleLoadingScreen(""));
    })
    .catch((response) => {
      dispatch(addAlert("Could not create site.", 'danger'));
      dispatch(toggleLoadingScreen(""));
    });
  }
}

export function beginCreateTest(siteId, testObject) {
  return (dispatch, getStore) => {
    dispatch(toggleLoadingScreen("Creating test..."));
    axios.post(TESTS_URL(USER_ID(), siteId), testObject, {headers: {authorization: AUTH_TOKEN()} })
    .then((response) => {
      console.log(response);
      dispatch(updateSite(response.data.site));
      dispatch(toggleLoadingScreen(""));
    })
    .catch((response) => {
      dispatch(addAlert("Could not create test.", 'danger'));
      dispatch(toggleLoadingScreen(""));
    });
  }
}

export function beginDeleteTest(siteId, testId) {
  return (dispatch, getStore) => {
    dispatch(toggleLoadingScreen("Deleting test..."));
    axios.delete(TEST_URL(USER_ID(), siteId, testId), {headers: {authorization: AUTH_TOKEN()} })
    .then((response) => {
      dispatch(updateSite(response.data.site));
      dispatch(toggleLoadingScreen(""));
    })
    .catch((response) => {
      dispatch(addAlert("Could not delete test.", 'danger'));
      dispatch(toggleLoadingScreen(""));
    });
  }
}

export function beginDeleteSite(site_id) {
  return (dispatch, getStore) => {
    dispatch(toggleLoadingScreen("Deleting site..."));
    axios.delete(SITE_URL(USER_ID(), site_id), {headers: {authorization: AUTH_TOKEN()}})
      .then((response) => {
        dispatch(deleteSite(site_id));
        dispatch(toggleLoadingScreen(""));
      })
      .catch((response) => {
        dispatch(addAlert("Could not delete site.", 'danger'));
        dispatch(toggleLoadingScreen(""));
      });
  }
}

export function beginUpdateSite(site_id, {name, url}) {
  return (dispatch, getStore) => {
    dispatch(toggleLoadingScreen("Updating site..."));
    axios.patch(
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
      dispatch(toggleLoadingScreen(""));
    }).catch((response) => {
      dispatch(addAlert("Could not update site.", 'danger'));
      dispatch(toggleLoadingScreen(""));
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
//     dispatch(toggleLoadingScreen());
//     axios.get(USER_SITES_URL)
//       .then((response) => {
//         dispatch(setAllSites(response.data.sites));
//         dispatch(toggleLoadingScreen());
//       })
//       .catch((response) => {
//         dispatch(toggleLoadingScreen());
//       });
//   }
// }


export function reloadTest(site_id, test_id, url, match) {
  return function(dispatch) {
    dispatch(setSiteStatus(site_id, test_id, 'loading'));
    axios.get(QUERY_URL, {params: {url, match}, headers: {authorization: AUTH_TOKEN()}})
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

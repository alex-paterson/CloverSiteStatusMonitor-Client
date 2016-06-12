exports.getTestItemFromSitesArray = function(sitesArray, siteId, testId) {
  var siteObject = sitesArray.filter((site) => {
    if (site._id === siteId) {
      return true;
    } else {
      return false;
    }
  })[0];
  var testObject = siteObject.tests.filter((test) => {
    if (test._id === testId) {
      return true;
    } else {
      return false;
    }
  })[0];
  return testObject;
}

exports.getSiteItemFromSitesArray = function(sitesArray, siteId) {
  var siteObject = sitesArray.filter((site) => {
    if (site._id === siteId) {
      return true;
    } else {
      return false;
    }
  })[0];
  return siteObject;
}

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

exports.intersectionOfArrays = function(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        if (b.indexOf(e) !== -1) return true;
    });
}

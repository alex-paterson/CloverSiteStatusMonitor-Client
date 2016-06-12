import update from 'react-addons-update';

var defaultState = {
  siteObjects: [
    {
      name: 'isitporn.com',
      url: 'http://isitporn.com',
      _id: 'lkjdfsjkdsdsjjnjnjlksdjkl',
      tests: [
        {
          name: 'Homepage Test',
          extension: '/',
          match: 'This is where we tinker with our algorithm. Results may vary.',
          status: 'loading',
          _id: 'dsfhkjjkddasadshjhdfsa'
        },
        {
          name: 'Show Post',
          extension: '/show-image',
          match: 'nice image!',
          status: 'loading',
          _id: 'shkddsadassdjakhsadhkjadshjk'
        }
      ]
    },
    {
      name: 'alexanderpaterson.com',
      url: 'http://alexanderpaterson.com',
      _id: 'lkjdfsjkdsddasadsdassjlksdjkl',
      tests: [
        {
          name: 'Homepage Test',
          extension: '/',
          match: 'Clearsite',
          status: 'loading',
          _id: 'dsfhkjjkdhjdsasdadsahdfsa'
        },
        {
          name: 'Show Chapter',
          extension: '/show-image',
          match: 'nice image!',
          status: 'loading',
          _id: 'shkdsdjakadssaddsahsadhkjadshjk'
        }
      ]
    }
  ]
}

defaultState = {
  siteObjects: []
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case 'SET_SITE_STATUS':
      var newSites = state.siteObjects.map((site) => {
        if (site._id === action.site_id) {
          site.tests = site.tests.map((test) => {
            if (test._id === action.test_id) {
              test.status = action.status;
            }
            return test;
          });
        }
        return site;
      });
      return update(state,
        {
          siteObjects: {
            $set: newSites
          }
        }
      );

    case 'DELETE_SITE':
      var newSites = state.siteObjects.filter((site) => {
        if (site._id === action.site_id) {
          return false;
        } else {
          return true;
        }
      });
      return update(state,
        {
          siteObjects: {
            $set: newSites
          }
        }
      );

    case 'UPDATE_SITE':
      var newSites = state.siteObjects.map((site) => {
        if (site._id === action.site._id) {
          site = action.site;
        }
        return site;
      });
      return update(state,
        {
          siteObjects: {
            $set: newSites
          }
        }
      );

    case 'CREATE_SITE':
      return update(state,
        {
          siteObjects: {
            $push: [action.site]
          }
        }
      );

    case 'SET_ALL_SITES':
      return update(state,
        {
          siteObjects: {
            $set: action.sites
          }
        }
      );

    default:
      return state;
  }
}

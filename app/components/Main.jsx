var React = require('react');
import {connect} from 'react-redux';

import LoadingIndicator from './LoadingIndicator';
import Alerts from './Alerts';
import Footer from './Footer';
import Navbar from './Navbar';
import {reloadAllTests, getUserPayload} from 'actions';

export var Main = React.createClass({
  componentWillMount: function() {
    var {sites, authenticated} = this.props;
    if (sites && sites.length > 0) {
      this.props.dispatch(reloadAllTests());
    } else if (authenticated) {
      this.props.dispatch(getUserPayload());
    }
  },
  render: function() {
    var {loading} = this.props;

    var hideIfTrue = (bool) => {
      if (bool) {
        return {
          display: 'none'
        }
      }
    }

    return (
      <div>
        <Navbar/>
        <Alerts/>
        <div style={hideIfTrue(loading)}>
          <div style={{minHeight: "70vh"}}>
            {this.props.children}
          </div>
        </div>
        <div style={hideIfTrue(!loading)}>
          <LoadingIndicator/>
        </div>
        <Footer/>
      </div>
    );
  }
});


module.exports = connect((state) => {
  return {
    loading: state.loading.screenIsLoading,
    sites: state.sites.siteObjects,
    authenticated: state.auth.authenticated
  }
})(Main);

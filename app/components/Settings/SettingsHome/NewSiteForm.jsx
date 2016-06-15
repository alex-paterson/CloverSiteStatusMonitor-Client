var React = require('react');
import {connect} from 'react-redux';
import {LoadingComponent} from 'react-loading-indicator-component';

import LoadingIndicator from '../../LoadingIndicator';
import {beginCreateSite} from 'actions';

export var NewSiteForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var {dispatch, startLoading, endLoading} = this.props;
    startLoading("Creating site...");
    dispatch(beginCreateSite(this.refs.newSiteText.value)).then(() => {
      endLoading();
    });
    this.refs.newSiteText.value = "";
  },
  render: function() {

    return (
      <form onSubmit={this.handleSubmit} style={{width: '100%', marginTop: '2rem'}}>
        <div className="row">
          <div className="large-12 columns">
            <div className="row collapse" style={{width: '100%'}}>
              <div className="small-10 columns">
                <input type="text" ref="newSiteText" placeholder="Enter a domain name"/>
              </div>
              <div className="small-2 columns">
                <button href="#"
                  className="button postfix"
                  style={{width: '100%', paddingBottom: '11.240px'}}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = connect()(LoadingComponent(NewSiteForm, LoadingIndicator));

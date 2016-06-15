var React = require('react');
import {connect} from 'react-redux';
import {LoadingComponent} from 'react-loading-indicator-component';

import LoadingIndicator from '../../LoadingIndicator';
import {beginCreateTest} from 'actions';

export var NewTestForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var {dispatch, site, startLoading, endLoading} = this.props;
    var {extensionText, nameText, matchText} = this.refs;
    var extension = extensionText.value;
    var name = nameText.value;
    var match = matchText.value;

    startLoading("Creating test...");
    dispatch(beginCreateTest(site._id, {match, name, extension})).then(() => {
      endLoading();
    });
    extensionText.value = "";
    nameText.value = "";
    matchText.value = "";
  },
  render: function() {

    return (
      <form onSubmit={this.handleSubmit} className="test" style={{width: '100%'}}>
        <div className="row">
          <div className="large-12 columns">
            <div className="row collapse" style={{width: '100%'}}>
              <div className="small-6 columns">
                <input type="text" ref="nameText" placeholder="Test Name"/>
              </div>
              <div className="small-6 columns">
                <input type="text" ref="extensionText" placeholder="URL Extension"/>
              </div>
            </div>
            <div className="row collapse" style={{width: '100%'}}>
              <div className="small-12 columns">
                <input type="text" ref="matchText" placeholder="Text To Match"/>
              </div>
            </div>
            <div className="row collapse" style={{width: '100%'}}>
              <div className="small-12 columns">
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

module.exports = connect()(LoadingComponent(NewTestForm, LoadingIndicator));

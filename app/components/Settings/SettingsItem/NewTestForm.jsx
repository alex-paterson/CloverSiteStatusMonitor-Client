var React = require('react');
import {connect} from 'react-redux';

import {beginCreateTest} from 'actions';

export var NewTestForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var {dispatch, site} = this.props;
    var extension = this.refs.extensionText.value;
    var name = this.refs.nameText.value;
    var match = this.refs.matchText.value;
    this.props.dispatch(beginCreateTest(site._id, {match, name, extension}));
    this.refs.extensionText.value = "";
    this.refs.nameText.value = "";
    this.refs.matchText.value = "";
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

module.exports = connect()(NewTestForm);

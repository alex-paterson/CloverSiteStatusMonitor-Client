var React = require('react');
import {Link} from 'react-router';

var Home = (props) => {
  return (
    <div className="row home">
      <div className="column small-centered small-11 large-8">
        <h1 style={{textAlign: 'center'}}>Clover</h1>
        <h2 style={{textAlign: 'center'}}>Keeping An Eye On Your Web Assets</h2>
        <div className="btn-group">
          <Link className="button hollow" to="/login" style={{marginRight: '1rem'}}><div>Sign In</div></Link>
          <Link className="button" to="/signup"><div>Sign Up</div></Link>
        </div>
        <div className="img-container">
          <img src="/preview.png"/>
        </div>
      </div>
    </div>
  );
};

module.exports = Home;

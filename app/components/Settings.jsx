var React = require('react');

var Settings = (props) => {
  return (
    <div className="row">
      <div className="column small-centered small-11 large-8">
        <h1>Settings</h1>
        {props.children}
      </div>
    </div>
  );
};

module.exports = Settings;

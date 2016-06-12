var React = require('react');
var {Link} = require('react-router');
import SubRow from './Row/SubRow';

export var Row = React.createClass({
  render: function() {
    var {siteObject} = this.props;
    var baseUrl = siteObject.url;
    var site_id = siteObject._id;
    var tests = siteObject.tests;

    var renderSubrows = (tests) => {
      return tests.map((testObject) => {
        return (
          <SubRow key={testObject._id} testId={testObject._id} baseUrl={baseUrl} siteId={site_id}/>
        );
      });
    }

    var settingsUrl = `/settings/${siteObject._id}`;

    if (tests && tests.length != 0) {
      return (
        <tbody>
          <SubRow key={tests[0]._id} testId={tests[0]._id} testObject={tests[0]} baseUrl={baseUrl} siteId={site_id}>
            <div style={{justifyContent: 'flex-start'}}>
              <a className="site-url" href={siteObject.url}>{siteObject.name}</a>
              &nbsp; | &nbsp;

              <Link className="settings-url" to={settingsUrl}>settings</Link>
            </div>
          </SubRow>
          {renderSubrows(tests.slice(1))}
        </tbody>
      );
    } else {
      return (
        <tbody>
          <tr>
            <td colSpan="3">
              <div style={{justifyContent: 'flex-start'}}>
                <a className="site-url" href={siteObject.url}>{siteObject.name}</a>
                &nbsp; | &nbsp;

                <Link className="settings-url" to={settingsUrl}>settings</Link>
              </div>
            </td>
          </tr>
        </tbody>
      );
    }
  }
});

module.exports = Row;

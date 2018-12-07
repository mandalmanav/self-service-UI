import React from 'react';
import './header.css';


class HeaderComponent extends React.Component {
  render() {
    return (
      <div className="header_section">
          <h1>Self-Service</h1>
          <span><i className="fa fa-times-circle" aria-hidden="true"></i></span>
      </div>
    );
  }
}

export default (HeaderComponent);

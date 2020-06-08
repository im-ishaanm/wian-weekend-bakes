import React, { Component } from "react";
import "../css/Nav.css";

class Nav extends Component {
  render() {
    return (
      <div className="nav-container">
        <h3>LOGO</h3>
        <ul className="nav-links">
          <li>Home</li>
          <li>Menu</li>
          <li>Contact</li>
        </ul>
      </div>
    );
  }
}

export default Nav;

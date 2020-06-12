import React, { Component } from "react";
import "../css/Nav.css";
import Cart from "./home/Cart";

import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div className="nav-container">
        <Link to="/">
          <img id="nav-logo" src="../images/nav-logo.png" alt="Logo" />
        </Link>
        <ul className="nav-links">
          <Cart />
        </ul>
      </div>
    );
  }
}

export default Nav;

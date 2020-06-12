import React, { Component } from "react";
import "../css/Nav.css";
import Cart from "./home/Cart";

import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div className="nav-container">
        <Link to="/">
          <h3>LOGO</h3>
        </Link>
        <ul className="nav-links">
          <Cart />
        </ul>
      </div>
    );
  }
}

export default Nav;

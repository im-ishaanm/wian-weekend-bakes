import React, { Component } from "react";
import "../css/Nav.css";
import Cart from "./home/Cart";

class Nav extends Component {
  render() {
    return (
      <div className="nav-container">
        <h3>LOGO</h3>
        <ul className="nav-links">
          <Cart />
        </ul>
      </div>
    );
  }
}

export default Nav;

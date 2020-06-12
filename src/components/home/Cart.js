import React, { Component, Fragment } from "react";

import "../../css/home/Cart.css";

import { Link } from "react-router-dom";

class Cart extends Component {
  render() {
    return (
      <Fragment>
        <Link to="/checkout">
          <button className="cart-button underline">My Cart</button>
        </Link>
      </Fragment>
    );
  }
}

export default Cart;

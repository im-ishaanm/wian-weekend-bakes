import React, { Component } from "react";

// Redux
import { connect } from "react-redux";

class Checkout extends Component {
  render() {
    const { cart } = this.props.data;
    return (
      <div>
        <p>
          {cart.map((cartItem) => (
            <p>
              {cartItem.name} {cartItem.quantity}
            </p>
          ))}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(Checkout);

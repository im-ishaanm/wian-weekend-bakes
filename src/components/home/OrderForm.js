import React, { Component } from "react";
import "../../css/home/Checkout.css";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class OrderForm extends Component {
  render() {
    return (
      <div className="order-form-container">
        <h1>Delivery Information</h1>
        <form className="checkout-form">
          <h2>To get in touch</h2>
          <TextField
            className="t-field"
            required
            name="name"
            label="Enter your name"
            defaultValue=""
            placeholder="Name"
            fullWidth
          />
          <TextField
            required
            name="phone"
            label="Enter your Phone Number"
            defaultValue=""
            placeholder="Phone No."
            fullWidth
          />
          <h2 className="divider-header">To deliver to you</h2>
          <TextField
            className="t-field"
            required
            name="addLone"
            label="Address Line 1"
            defaultValue=""
            placeholder="Address Line 1"
            fullWidth
          />
          <TextField
            className="t-field"
            required
            name="addLtwo"
            label="Address Line 2"
            defaultValue=""
            placeholder="Address Line 2"
            fullWidth
          />
          <TextField
            className="t-field"
            required
            name="addLthree"
            label="Address Line 3"
            defaultValue=""
            placeholder="Address Line 3"
            fullWidth
          />
          <Button id="submit-btn" variant="contained" color="primary">
            Submit Order
          </Button>
        </form>
      </div>
    );
  }
}

export default OrderForm;

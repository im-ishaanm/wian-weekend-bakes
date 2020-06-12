import React, { Component, Fragment } from "react";
import "../../css/home/Checkout.css";
import axios from "axios";
// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";

class OrderForm extends Component {
  state = {
    open: false,
    name: "",
    phone: "",
    addLone: "",
    addLtwo: "",
    addLthree: "",
    items: null,
    total: null,
  };

  componentDidMount() {
    const { items, total } = this.props;
    this.setState({
      items: items,
      total: total,
    });
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
    window.location.reload();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let orderData = {
      items: this.state.items,
      total: this.state.total,
      name: this.state.name,
      phone: this.state.phone,
      addLone: this.state.addLone,
      addLtwo: this.state.addLtwo,
      addLthree: this.state.addLthree,
    };
    console.log(orderData);
    axios.post("/order/create", orderData);
    this.handleOpen();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  verifyData = () => {
    if (this.state.name.length && this.state.phone.length) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const disabled = !this.verifyData();
    return (
      <Fragment>
        <div className="order-form-container">
          <h1>Delivery Information</h1>
          <form className="checkout-form">
            <h2>To get in touch</h2>
            <TextField
              className="t-field"
              name="name"
              label="Enter your name"
              placeholder="Name"
              fullWidth
              value={this.state.name}
              onChange={this.handleChange}
            />
            <TextField
              name="phone"
              label="Enter your Phone Number"
              placeholder="Phone No."
              fullWidth
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <h2 className="divider-header">To deliver to you</h2>
            <TextField
              className="t-field"
              name="addLone"
              label="Address Line 1"
              placeholder="Address Line 1"
              fullWidth
              value={this.state.addLone}
              onChange={this.handleChange}
            />
            <TextField
              className="t-field"
              name="addLtwo"
              label="Address Line 2"
              placeholder="Address Line 2"
              fullWidth
              value={this.state.addLtwo}
              onChange={this.handleChange}
            />
            <TextField
              className="t-field"
              name="addLthree"
              label="Address Line 3"
              placeholder="Address Line 3"
              value={this.state.addLthree}
              onChange={this.handleChange}
              fullWidth
            />
            <h4>
              Delivery address can be changed once our delivery executive gets
              in touch with you.
            </h4>
            <h4>
              Mode of Payment can be finalized once we get in touch with you. We
              accept{" "}
              <span id="payment-span">
                Google Pay, PayTM, Netbanking and Cash
              </span>
              .
            </h4>
            <Button
              type="submit"
              id="submit-btn"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              disabled={disabled}
            >
              Submit Order
            </Button>
          </form>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Order sent!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Thank you for your order. Our delivery executive will get in touch
              with you shortly.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default OrderForm;

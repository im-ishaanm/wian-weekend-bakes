import React, { Component, Fragment } from "react";
import "../css/Order.css";
import dayjs from "dayjs";

// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

class Order extends Component {
  state = {
    open: false,
  };

  handleDelete = () => {
    console.log("delete");
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { order } = this.props;

    return (
      <Fragment>
        <div onClick={this.handleOpen} className="order-card">
          <div className="content-one">
            <p>Name: {order.name}</p>
            <p>Contact: {order.phone}</p>
          </div>
          <div className="content-two">
            <p>
              Order placed on {dayjs(order.submittedOn).format("DD/MM/YYYY")}
            </p>
            <p className="order-total">Total: Rs. {order.total}/-</p>
          </div>
        </div>
        <Dialog
          className="order-dialog"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
        >
          <DialogContent>
            <h2>
              Review order of ID{" "}
              <span className="order-id">{order.orderID}</span>
            </h2>
            <div className="user-details">
              <h3>Name</h3>
              <p>{order.name}</p>
              <h3>Contact Number</h3>
              <p>{order.phone}</p>
              <hr />
              <h3>Address</h3>
              <p>{order.addLone}</p>
              <p>{order.addLtwo}</p>
              <p>{order.addLthree}</p>
            </div>
            <hr />
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="order-item order-headers">
                <p>Item</p>
                <p>Quantity</p>
              </div>
              {order.items.map((item) => (
                <div className="order-item">
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                </div>
              ))}
              <h3>Total Amount</h3>
              <p>Rs. {order.total}/-</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleDelete}
            >
              Delete Order
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default Order;

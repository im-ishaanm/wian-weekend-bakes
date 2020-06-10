import React, { Component } from "react";
import "../css/Order.css";
import dayjs from "dayjs";

class Order extends Component {
  render() {
    const { order } = this.props;
    return (
      <div className="order-card">
        <div className="content-one">
          <p>Name: {order.name}</p>
          <p>Contact: {order.phone}</p>
        </div>
        <div className="content-two">
          <p>Order placed on {dayjs(order.submittedOn).format("DD/MM/YYYY")}</p>
          <p className="order-total">Total: Rs. {order.total}/-</p>
        </div>
      </div>
    );
  }
}

export default Order;

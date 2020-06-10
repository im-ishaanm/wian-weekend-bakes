import React, { Component } from "react";
import "../css/Admin.css";

import Item from "../components/Item";
import CreateItem from "../components/CreateItem";
import Order from "../components/Order";

// Redux
import { connect } from "react-redux";
import { getItems, getOrders } from "../redux/actions/dataActions";

class Admin extends Component {
  componentDidMount() {
    this.props.getItems();
    this.props.getOrders();
  }

  render() {
    const { items, orders } = this.props.data;

    let itemsMarkup = items ? (
      items.map((item) => <Item key={item.itemId} item={item} />)
    ) : (
      <p>Loading Items</p>
    );

    let ordersMarkup = orders ? (
      orders.map((order) => <Order key={order.orderID} order={order} />)
    ) : (
      <p>No Orders Found</p>
    );

    return (
      <div className="admin-page-container">
        <div className="items-container">
          <h2>Your Items</h2>
          <div className="items-list">{itemsMarkup}</div>
          <CreateItem />
        </div>
        <hr className="order-item-divider" />
        <div className="orders-container">
          <h2>Your Orders</h2>
          <div className="orders-list">{ordersMarkup}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getItems, getOrders })(Admin);

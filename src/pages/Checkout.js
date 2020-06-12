import React, { Component } from "react";
import CartItem from "../components/home/CartItem";
import OrderForm from "../components/home/OrderForm";

import "../css/home/Checkout.css";

// Redux
import { connect } from "react-redux";

// Material UI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class Checkout extends Component {
  render() {
    const { cart, total } = this.props.data;

    let checkoutItemsMarkup =
      cart.length > 0 ? (
        cart.map((cartItem) => (
          <CartItem key={cartItem.itemId} item={cartItem} />
        ))
      ) : (
        <p className="no-items">No items in your cart yet.</p>
      );

    let orderFormMarkup =
      cart.length > 0 ? <OrderForm items={cart} total={total} /> : " ";

    return (
      <div className="checkout-container">
        <h1>Order Summary</h1>
        <div className="checkout-items-container">
          <TableContainer component={Paper}>
            <Table aria-label="simple-table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price (individual)</TableCell>
                  <TableCell align="right">Price (total)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{checkoutItemsMarkup}</TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="total">
          <h3>Total</h3>
          <p className="total-amt">Rs. {total}/-</p>
        </div>
        {orderFormMarkup}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(Checkout);

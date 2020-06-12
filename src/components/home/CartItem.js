import React, { Component } from "react";
import "../../css/home/Checkout.css";

// Material UI
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export class CartItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <TableRow key={item.itemId}>
        <TableCell component="th" scope="row">
          {item.name}
        </TableCell>
        <TableCell align="right">{item.quantity}</TableCell>
        <TableCell align="right">{item.price}</TableCell>
        <TableCell align="right">
          {parseInt(item.price, 10) * item.quantity}
        </TableCell>
      </TableRow>
    );
  }
}

export default CartItem;

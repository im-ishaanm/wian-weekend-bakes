import React, { Component } from "react";

import "../../css/home/ItemCard.css";

import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/dataActions";

class ItemCard extends Component {
  state = {
    itemId: "",
    cartQuantity: 0,
  };

  componentDidMount() {
    const { item } = this.props;
    this.setState({
      itemId: item.itemId,
    });
  }

  handleAddToCart = () => {
    this.props.addToCart(this.state.itemId);
    this.setState({
      cartQuantity: this.state.cartQuantity + 1,
    });
  };

  handleRemoveFromCart = () => {
    this.props.removeFromCart(this.state.itemId);
    this.setState({
      cartQuantity: this.state.cartQuantity - 1,
    });
  };

  render() {
    const { item } = this.props;

    let removeItemMarkup =
      this.state.cartQuantity > 0 ? (
        <button
          onClick={this.handleRemoveFromCart}
          className="remove-item-home change-item-quantity"
        >
          -
        </button>
      ) : (
        " "
      );

    return (
      <div className="card-container-home">
        <div className="image-container-home">
          <img src={item.imageUrl} alt="item" />
        </div>
        <div className="card-content-home">
          <h3>{item.name}</h3>
          <p className="desc-home">{item.desc}</p>
          <div className="selector-home">
            <p className="price-home">Rs. {item.price}/-</p>
            <button
              onClick={this.handleAddToCart}
              className="add-item-home change-item-quantity"
            >
              +
            </button>
            {removeItemMarkup}
            <p>{this.state.cartQuantity}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addToCart, removeFromCart })(ItemCard);

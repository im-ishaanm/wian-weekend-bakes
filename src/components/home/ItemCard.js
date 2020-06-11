import React, { Component } from "react";

import "../../css/home/ItemCard.css";

import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/dataActions";

class ItemCard extends Component {
  state = {
    itemId: "",
  };

  componentDidMount() {
    const { item } = this.props;
    this.setState({
      itemId: item.itemId,
    });
  }

  handleAddToCart = () => {
    console.log(this.state.itemId);
    this.props.addToCart(this.state.itemId);
  };

  render() {
    const { item } = this.props;

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
            <button onClick={this.handleAddToCart} className="add-item-home">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addToCart })(ItemCard);

import React, { Component } from "react";

import "../../css/home/ItemCard.css";

class ItemCard extends Component {
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
            <button className="add-item-home">Add to Cart</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemCard;

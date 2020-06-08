import React, { Component } from "react";
import "../css/Item.css";

class Item extends Component {
  testClick = () => {
    alert("Good");
  };

  render() {
    const { item } = this.props;

    let isImageUploaded = item.imageUploaded ? (
      <p className="image-yes">Image Uploaded</p>
    ) : (
      <p className="image-no">No Image Found</p>
    );

    return (
      <div onClick={this.testClick} className="admin-item-wrapper">
        <div className="content-one">
          <h3>{item.name}</h3>
          <p>{item.desc}</p>
        </div>
        <div className="content-two">
          <h3 className="price-tag">Rs. {item.price}/-</h3>
          <div className="image-upload-check">{isImageUploaded}</div>
        </div>
      </div>
    );
  }
}

export default Item;

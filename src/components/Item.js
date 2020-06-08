import React, { Component } from "react";

class Item extends Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        <p>{item.name}</p>
      </div>
    );
  }
}

export default Item;

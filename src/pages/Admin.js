import React, { Component } from "react";
import "../css/Admin.css";

import Item from "../components/Item";

// Redux
import { connect } from "react-redux";
import { getItems } from "../redux/actions/dataActions";

class Admin extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.data;

    let itemsMarkup = items ? (
      items.map((item) => <Item key={item.itemId} item={item} />)
    ) : (
      <p>Loading Items</p>
    );

    return (
      <div className="admin-page-container">
        <div className="items-container">
          <h2>Your Items</h2>
          <div className="items-list">{itemsMarkup}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getItems })(Admin);

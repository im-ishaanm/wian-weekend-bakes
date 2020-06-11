import React, { Component } from "react";
import ItemCard from "../components/home/ItemCard";

import "../css/home/Home.css";

// Redux
import { connect } from "react-redux";
import { getItems } from "../redux/actions/dataActions";

class Home extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.data;

    let itemsMarkup = items ? (
      items.map((item) => <ItemCard key={item.itemId} item={item} />)
    ) : (
      <p>Loading Items</p>
    );

    return (
      <div className="home-page-container">
        <h2>The Bakes</h2>
        <div className="menu-container">{itemsMarkup}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getItems })(Home);

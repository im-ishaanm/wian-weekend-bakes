import React, { Component, Fragment } from "react";
import "../css/Admin.css";

// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

// Redux
import { connect } from "react-redux";
import { createItem } from "../redux/actions/dataActions";

class CreateItem extends Component {
  state = {
    name: "",
    desc: "",
    price: "",
    open: false,
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      name: "",
      desc: "",
      price: "",
      open: false,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newItem = {
      name: this.state.name,
      desc: this.state.desc,
      price: this.state.price,
    };
    this.props.createItem(newItem);
    this.handleClose();
  };

  render() {
    return (
      <Fragment>
        <div className="create-item-button-wrapper">
          <button onClick={this.handleOpen}>Add Item</button>
        </div>
        <Dialog
          className="create-item-form-dialog"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
        >
          <DialogContent>
            <h3>Create an Item</h3>
            <form autoComplete="off" className="create-item-form">
              <label htmlFor="name">Name</label>
              <input
                placeholder="Name of the Item"
                className="text-form"
                onChange={this.handleChange}
                type="text"
                name="name"
                id="item-name"
                value={this.state.name}
              />
              <label htmlFor="desc">Description</label>
              <input
                placeholder="Item Description"
                className="text-form"
                onChange={this.handleChange}
                type="text"
                name="desc"
                id="task-desc"
                value={this.state.desc}
              />
              <label htmlFor="desc">Price</label>
              <input
                placeholder="Item Price"
                className="text-form"
                onChange={this.handleChange}
                type="text"
                name="price"
                id="task-price"
                value={this.state.price}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Add Item
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, { createItem })(CreateItem);

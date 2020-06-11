import {
  GET_ITEMS,
  CREATE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  GET_ORDERS,
  DELETE_ORDER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_FROM_CART,
} from "../types";

import axios from "axios";

export const getItems = () => (dispatch) => {
  axios
    .get("/items")
    .then((res) => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createItem = (newItem) => (dispatch) => {
  axios
    .post("/item/create", newItem)
    .then((res) => {
      dispatch({
        type: CREATE_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editItem = (editItem, itemId) => (dispatch) => {
  axios
    .post(`/item/update/${itemId}`, editItem)
    .then((res) => {
      dispatch({
        type: EDIT_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteItem = (itemId) => (dispatch) => {
  axios
    .delete(`/item/${itemId}`)
    .then(() => {
      dispatch({
        type: DELETE_ITEM,
        payload: itemId,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadItemImage = (formData, itemId) => (dispatch) => {
  axios
    .post(`/item/image/${itemId}`, formData)
    .then(() => {
      dispatch(getItems());
    })
    .catch((err) => console.log(err));
};

// Orders

export const getOrders = () => (dispatch) => {
  axios
    .get("/orders")
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteOrder = (orderID) => (dispatch) => {
  axios
    .delete(`/order/${orderID}`)
    .then(() => {
      dispatch({
        type: DELETE_ORDER,
        payload: orderID,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Cart Actions

export const getCartItems = () => (dispatch) => {
  dispatch({
    type: GET_CART_ITEMS,
  });
};

export const addToCart = (itemId) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: itemId,
  });
  dispatch(getCartItems());
};

export const removeFromCart = (itemId) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: itemId,
  });
  dispatch(getCartItems());
};

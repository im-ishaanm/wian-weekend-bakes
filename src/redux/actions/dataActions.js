import { GET_ITEMS, CREATE_ITEM, EDIT_ITEM, DELETE_ITEM } from "../types";

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
      console.error(err);
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
      console.error(err);
    });
};

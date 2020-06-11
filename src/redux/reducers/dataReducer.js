import {
  GET_ITEMS,
  CREATE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  GET_ORDERS,
  DELETE_ORDER,
} from "../types";

const initialState = {
  items: null,
  orders: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case CREATE_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case EDIT_ITEM:
      let index_to_update = state.items.findIndex(
        (item) => item.itemId === action.payload.itemId
      );
      state.items[index_to_update] = action.payload;
      return {
        ...state,
      };
    case DELETE_ITEM:
      let index_to_delete = state.items.findIndex(
        (item) => item.itemId === action.payload
      );
      state.items.splice(index_to_delete, 1);
      return {
        ...state,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case DELETE_ORDER:
      let order_index = state.orders.findIndex(
        (order) => order.orderID === action.payload
      );
      state.orders.splice(order_index, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}

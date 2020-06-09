import { GET_ITEMS, CREATE_ITEM, EDIT_ITEM, DELETE_ITEM } from "../types";

const initialState = {
  items: null,
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
    default:
      return state;
  }
}

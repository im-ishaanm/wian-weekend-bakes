import { GET_ITEMS } from "../types";

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
    default:
      return state;
  }
}

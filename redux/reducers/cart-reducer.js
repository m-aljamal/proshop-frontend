import {
  ADD_TO_CART,
  ADD_TO_CART_NO_DROPDOWN,
  CART_FROM_SERVER,
  EMPTY_CART,
  APPLY_COUPONE,
  CASH_ON_DELEVERY,
} from "../actions/types";

let initialState = {
  cartList: [],
  showHover: false,
  checkoutItems: null,
  discount: null,
  payCashOnDelevery: false,
};
if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    initialState.cartList = JSON.parse(localStorage.getItem("cart"));
  }
}

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartList: payload,

        showHover: true,
      };
    case "HIDE_CART_LIST":
      return {
        ...state,
        showHover: false,
      };
    case ADD_TO_CART_NO_DROPDOWN:
      return {
        ...state,
        cartList: payload,
        showHover: false,
      };
    case CART_FROM_SERVER:
      return {
        ...state,
        checkoutItems: payload,
      };
    case EMPTY_CART:
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
      return {
        ...state,
        checkoutItems: null,
        cartList: [],
        discount: null,
        payCashOnDelevery: false,
      };
    case APPLY_COUPONE:
      console.log(payload);
      return {
        ...state,
        discount: payload,
      };
    case "CASH_ON_DELEVERY":
      return {
        ...state,
        payCashOnDelevery: payload,
      };
    default:
      return state;
  }
}

import {
  LOAD_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  CLEAR_PRODUCT,
  GET_PRODUCTS_PAGINATION,
  ADD_COUPONE,
  GET_COUPONES,
  REMOVE_COUPONE,
} from "../actions/types";

const initialState = {
  productsList: [],
  product: {},
  coupones: [],
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS_PAGINATION:
    case LOAD_PRODUCTS:
      return {
        ...state,
        productsList: payload,
      };
    case GET_PRODUCT_BY_SLUG:
      return {
        ...state,
        product: payload,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: {},
      };
    case ADD_COUPONE:
      return {
        ...state,
        coupones: [...state.coupones, payload],
      };
    case GET_COUPONES:
      return {
        ...state,
        coupones: payload,
      };
    case REMOVE_COUPONE:
      return {
        ...state,
        coupones: state.coupones.filter((c) => c._id !== payload),
      };
    default:
      return state;
  }
}

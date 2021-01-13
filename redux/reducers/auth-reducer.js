import {
  LOGOUT,
  CURRENT_USER,
  ADD_ADDRESS,
  GET_USER_ORDERS,
  CLEAR_ORDERS,
  GET_ORDERS_ADMIN,
  CREATE_ORDER,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: {},
  users: [],
  orders: [],
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CURRENT_USER:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: null,
        loading: true,
        user: {},
      };
    case ADD_ADDRESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, address: payload },
      };
    case CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders, payload],
      };
    case GET_ORDERS_ADMIN:
    case GET_USER_ORDERS:
      return {
        ...state,
        orders: payload,
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
}

import axios from "axios";
import {
  ADD_TO_CART,
  ADD_TO_CART_NO_DROPDOWN,
  CART_FROM_SERVER,
  EMPTY_CART,
  APPLY_COUPONE,
} from "./types";

export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: product,
  });
};
export const addToCartWithNoDropdown = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART_NO_DROPDOWN,
    payload: product,
  });
};

export const hideCartList = () => (dispatch) => {
  dispatch({
    type: "HIDE_CART_LIST",
  });
};

export const saveCartToDatabase = (items, router) => async () => {
  try {
    const { data } = await axios.post(
      `${process.env.API_DEV}/cart/add`,
      { cartList: items },
      { withCredentials: true }
    );

    data.ok && router.push("/checkout");
  } catch (error) {
    console.log(error);
  }
};

export const getCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${process.env.API_DEV}/cart`, {
      withCredentials: true,
    });
    dispatch({
      type: CART_FROM_SERVER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const emptycart = () => async (dispatch) => {
  try {
    await axios.delete(`${process.env.API_DEV}/cart/remove`, {
      withCredentials: true,
    });
    dispatch({
      type: EMPTY_CART,
    });
  } catch (error) {
    console.log(error);
  }
};

export const applyCoupone = (coupone) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_DEV}/auth/cart/coupone`,
      coupone,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: APPLY_COUPONE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

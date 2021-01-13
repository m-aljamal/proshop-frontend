import {
  LOGOUT,
  CURRENT_USER,
  GET_USER_ORDERS,
  CLEAR_ORDERS,
  GET_ORDERS_ADMIN,
} from "./types";
import axios from "axios";
import { message } from "antd";

export const signin = (user, router) => async () => {
  try {
    await axios.post(`${process.env.API_DEV}/auth/signin`, user, {
      withCredentials: true,
    });
    router.router.query.from
      ? router.push(`/${router.router.query.from}`)
      : router.push("/");
  } catch (error) {
    error.response.data.errors.map((err) => message.error(err.message));
  }
};

// export const loadUser = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get(`${process.env.API_DEV}/auth/me`, {
//       withCredentials: true,
//     });
//     dispatch({
//       type: CURRENT_USER,
//       payload: data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const loadUser = (user) => (dispatch) => {
  if (user) {
    dispatch({
      type: CURRENT_USER,
      payload: user,
    });
  }
};

export const logout = (router) => async (dispatch) => {
  dispatch({
    type: CLEAR_ORDERS,
  });
  try {
    await axios.get(`${process.env.API_DEV}/auth/logout`, {
      withCredentials: true,
    });
    router.push("/auth/signin");
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createAccount = (user, router) => async () => {
  try {
    await axios.post(`${process.env.API_DEV}/auth/signup`, user, {
      withCredentials: true,
    });
    router.router.query.from
      ? router.push(`/${router.router.query.from}`)
      : router.push("/");

    message.success("account created successfuly");
  } catch (error) {
    error.response.data.errors.map((err) => message.error(err.message));
  }
};

export const addAdress = (address) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_DEV}/auth/address/add`,
      address,
      { withCredentials: true }
    );
    dispatch({
      type: ADD_ADDRESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (stripeResponse) =>
  await axios.post(`${process.env.API_DEV}/auth/order/create`, stripeResponse, {
    withCredentials: true,
  });

export const getUserOrders = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${process.env.API_DEV}/auth/orders`, {
      withCredentials: true,
    });
    dispatch({
      type: GET_USER_ORDERS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${process.env.API_DEV}/orders`, {
      withCredentials: true,
    });
    dispatch({
      type: GET_ORDERS_ADMIN,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

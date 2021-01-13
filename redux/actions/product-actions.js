import {
  LOAD_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  CLEAR_PRODUCT,
  GET_PRODUCTS_PAGINATION,
  ADD_COUPONE,
  GET_COUPONES,
  REMOVE_COUPONE,
} from "./types";
import axios from "axios";
import { message } from "antd";
export const getProducts = (products) => async (dispatch) => {
  dispatch({
    type: LOAD_PRODUCTS,
    payload: products,
  });
};
export const createProduct = (product, router) => async (dispatch) => {
  try {
    await axios.post(`${process.env.API_DEV}/products/add`, product, {
      withCredentials: true,
    });
    router.push("/");
    setFormSubmit(true);
  } catch (error) {
    // error.response.data.errors.map((err) => message.error(err.message));
    console.log(error);
  }
};
console.log('************', process.env.API_DEV);
export const getProductBySlug = (slug) => async (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT,
  });
  try {
    const { data } = await axios.get(
      `${process.env.API_DEV}/products?slug=${slug}`
    );

    dispatch({
      type: GET_PRODUCT_BY_SLUG,
      payload: data.data[0],
    });
  } catch (error) {
    error.response.data.errors.map((err) => message.error(err.message));
  }
};

export const getProductsWithFilter = (limit, page, name, price) => async (
  dispatch
) => {
  try {
    let url = name
      ? `products?limit=${limit}&page=${page}&name=${name}`
      : `products?limit=${limit}&page=${page}`;
    if (price)
      url = `products?limit=${limit}&page=${page}&name=${name}&price[lte]=${price[1]}&price[gt]=${price[0]}`;
    console.log("url", url);
    const { data } = await axios.get(`${process.env.API_DEV}/${url}`);
    console.log(data);
    dispatch({
      type: GET_PRODUCTS_PAGINATION,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createCoupone = (coupone) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_DEV}/coupones/add`,
      coupone,
      { withCredentials: true }
    );
    dispatch({
      type: ADD_COUPONE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllCoupones = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${process.env.API_DEV}/coupones`, {
      withCredentials: true,
    });
    dispatch({
      type: GET_COUPONES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCoupone = (id) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.API_DEV}/coupones/${id}/remove`, {
      withCredentials: true,
    });
    dispatch({
      type: REMOVE_COUPONE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

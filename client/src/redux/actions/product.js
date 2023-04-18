import axios from "axios";
import { ProductActionTypes } from "./../action-types";
import { FETCH_ALL_PRODUCT, FETCH_CATEGORIES, SERVER_BASE_URL } from "../../api/constants";

// To add a product to the cart
export const fetchAllProduct = () => async (dispatch) => {
  try {
   
    const {data} = await axios.get(`${SERVER_BASE_URL}/${FETCH_ALL_PRODUCT}`, {
      withCredentials: true,
    });

    dispatch({
      type: ProductActionTypes.FETCH_ALL_PRODUCTS,
      payload: data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ProductActionTypes.FETCH_FAILURE,
      payload : error.response.data.message
    });
  }
};
export const fetchCategories = () => async (dispatch) => {
  try {
   
    const {data} = await axios.get(`${SERVER_BASE_URL}/${FETCH_CATEGORIES}`, {
      withCredentials: true,
    });

    dispatch({
      type: ProductActionTypes.FETCH_CATEGORIES,
      payload: data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ProductActionTypes.FETCH_FAILURE,
      payload : error.response.data.message
    });
  }
};

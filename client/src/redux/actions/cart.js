import axios from "axios";
import { ADD_PRODUCT_TO_CART, FETCH_CART, REMOVE_PRODUCT_FROM_CART, SERVER_BASE_URL } from "../../api/constants";
import { CartActionTypes } from "../action-types";

export const fetchCartItems = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/${FETCH_CART}`, {
      withCredentials: true,
    });

    dispatch({
      type: CartActionTypes.FETCH_CART_ITEMS,
      payload: data.cart,
    });
  } catch (error) {
    console.log(error);
    
  }
};

// To add a product to the cart
export const addItemToCart = (id) => async (dispatch) => {

  try {
    const { data } = await axios.post(`${SERVER_BASE_URL}/${ADD_PRODUCT_TO_CART}`,{productId : id}, {
      withCredentials: true,
    });

    console.log(data);

    dispatch({ type: CartActionTypes.ADD_TO_CART, payload: data });
  } catch (error) {
    console.log(error);
   
  }
};

//   To remove a product from the cart
export const removeItemFromCart = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${SERVER_BASE_URL}/${REMOVE_PRODUCT_FROM_CART}/${id}`, {
      withCredentials: true,
    });

    console.log(data);

    dispatch({ type: CartActionTypes.REMOVE_FROM_CART, payload: data });
  } catch (error) {
    console.log(error);

  }
};

//   To increase the quantity of the product present in the cart
export const increaseQty = (id) => async (dispatch) => {
  dispatch({ type: CartActionTypes.INCREASE_PROD_QUANTITY, payload: id });
};

//   To decrease the quantity of the product present in the cart
export const decreaseQty = (id) => async (dispatch) => {
  dispatch({ type: CartActionTypes.DECREASE_PROD_QUANTITY, payload: id });
};

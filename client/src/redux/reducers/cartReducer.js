import { CartActionTypes } from "../action-types";

const initialState = {
  cartItems: [],
  message: null,
  notification_type: null,
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CartActionTypes.FETCH_CART_ITEMS:
      // Fetch products
      return { ...state, cartItems: payload };
    case CartActionTypes.REMOVE_FROM_CART:

      // Fetch products
      return {
        ...state,
        cartItems: state.cartItems.filter((ele) => ele._id !== payload.item._id),
        notification_type: "success",
        message: payload.message,
      };
    case CartActionTypes.ADD_TO_CART:
 

        return {
          ...state,
          cartItems: [...state.cartItems, { ...payload.item }],
        };
    //   }

    default:
      return state;
  }
};

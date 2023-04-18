import {  ProductActionTypes } from "../action-types";

const initialState = {
  loading: false,
  allProduct: [],
  error: null,
  success_message : null,
  categories : []
  
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ProductActionTypes.FETCH_ALL_PRODUCTS:
      // Fetch products
      return { ...state, allProduct : payload.products  };
    case ProductActionTypes.FETCH_CATEGORIES:
      // Fetch products
      return { ...state, categories : payload.categories  };
    case ProductActionTypes.FETCH_FAILURE:
      // Fetch products
      return { ...state, error : payload  };

    default:
      return state;
  }
};

import { UserActionTypes } from "../action-types";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserActionTypes.USER_FETCH_LOADING:
      // Fetch products
      return { ...state, loading: true };
    case UserActionTypes.USER_FETCH_SUCCESS:
      // Fetch products
      return { ...state, loading: false, isAuthenticated: true, user: payload };
    case UserActionTypes.USER_FETCH_FAILURE:
      // Fetch products
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: payload,
      };

    default:
      return state;
  }
};

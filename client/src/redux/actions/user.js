import axios from "axios";
import { UserActionTypes } from "./../action-types";
import { SERVER_BASE_URL } from "../../api/constants";

// To add a product to the cart
export const fetchUserDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: UserActionTypes.USER_FETCH_LOADING
    });
    const resp = await axios.get(`${SERVER_BASE_URL}/users/get-loggedIn-user`, {
      withCredentials: true,
    });

    dispatch({
      type: UserActionTypes.USER_FETCH_SUCCESS,
      payload: resp.data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UserActionTypes.USER_FETCH_FAILURE,
      payload: error.response.data.message,
    });
  }
};

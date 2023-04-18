import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";

// Using combined reducer to be able to use multiple reducers
const reducers = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
});

export default reducers;

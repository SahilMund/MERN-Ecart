import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";

// Enabling redux dev tool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Using thunk middleware to be able to use async calls
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;

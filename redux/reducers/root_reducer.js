import authReducer from "./auth-reducer";
import { combineReducers } from "redux";
import products from "./product-reducer";
import cart from "./cart-reducer";
const rootReducer = combineReducers({
  user: authReducer,
  products,
  cart,
});

export default rootReducer;

import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/root_reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";

const initialState = {};
const middleware = [thunk];

const makeStore = (context) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};

export const wrapper = createWrapper(makeStore, { debug: true });

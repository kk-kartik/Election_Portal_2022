import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import importantDates from "./reducers/importantDates";
import FAQ from "./reducers/faq";
import auth from "./reducers/auth";
import positions from "./reducers/positions";
import candidate from "./reducers/candidate";
const reducer = combineReducers({
  importantDates,
  FAQ,
  auth,
  positions,
  candidate,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

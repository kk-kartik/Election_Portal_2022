import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import candidates from "./reducers/candidates";
import votes from "./reducers/votes";
import voterInfo from "./reducers/voter";

const reducer = combineReducers({ candidates, votes, voterInfo });

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

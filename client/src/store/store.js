import { combineReducers } from "redux";
import reducer from "./reducer";
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from "redux";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const rootReducers = combineReducers({
  data: reducer,
});

export const  store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

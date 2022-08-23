import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";

export const rootReducers = combineReducers({
  userReducer,
});

import {combineReducers} from "redux";
import categories from "./categories";
import items from "./items";
import url from "./url";
import catalogue from "./catalogue";

const rootReducer = combineReducers({
  categories,
  catalogue,
  items,
  url
});

export default rootReducer;


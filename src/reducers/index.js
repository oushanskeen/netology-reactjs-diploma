import {combineReducers} from "redux";
import categories from "./categories";
import items from "./items";
import url from "./url";
import catalogue from "./catalogue";
import cart from "./cart";

const rootReducer = combineReducers({
  categories,
  catalogue,
  items,
  url,
  cart
});

export default rootReducer;


//import  from "./catalogue";
//import { formatParams } from "../utils/formatParams";
//console.log("Catalogue: ");
/*const categories = [
  { id: 11, name: "All" },
  { id: 12, name: "Men" },
  { id: 13, name: "Women" },
  { id: 14, name: "Unisex" }
];*/
import {
  ADD_ITEM_TO_CART,
  POST_ORDER_STARTED,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCEED,
  DELETE_ORDER_ITEM
} from "../constants/actionTypes";
const mergeItems = require("../utils/merge");
const initState = {
  cart: [],
  postOrderIsLoading: false,
  postOrderIsError: "",
  postOrderResponse: ""
};

//export default function (state = initState, action){
const cart = (state = initState, action) => {
  const { type, payload } = action;
  //console.log("STATE IN CART REDUCER: ", state);
  //console.log("TYPE OF MESSAGE IN CART REDUCER: ", type);
  //console.log("PAYLOAD IN CART REDUCER: ", payload);
  const store = JSON.parse(localStorage.getItem("cart"));
  //console.log("STORE IN CART REDUCER: ", store);
  //const {cart} = store.length > 0 ? store : state;
  const { cart } = store || state;
  //console.log("CART IN CART REDUCER: ", cart);

  switch (type) {
    case ADD_ITEM_TO_CART:
      //console.log("LOCAL STORAGE BEFORE WRITE: ", store);
      //console.log("CART BEFORE WRITE: ", cart);
      //console.log("ADD ITEM TO CART reducer triggered with payload: ", payload);
      /*
    localStorage.setItem(
        "cart",
        JSON.stringify({cart:mergeItems([...state.cart,payload])})
      );
    */
      const out = { cart: mergeItems([...cart, payload]) };
      //console.log("CART OUT: ", out);
      /*
      store 
      ? (() => {
          console.log("STORE IS NOT EMPTY");
          console.log("STORE IS: ", store);
          console.log("CART IS: ", cart);
          return [...cart,payload]
        })()
      : (() => {
          console.log("STORE IS EMPTY");
          return [...cart,payload]
        })()
    )};
    */
      //const writeToLocalhost = (name,value) =>
      localStorage.setItem("cart", JSON.stringify(out));
      //writeToLocalhost("cart",out);
      //console.log(
      //  "LOCAL STORAGE AFTER ADD CART ITEM: ",
      //  localStorage.getItem("cart")
      //);
      //return out;
      return JSON.parse(localStorage.getItem("cart"));
    case POST_ORDER_STARTED:
      console.log("POST ORDER REDUCER STARTED");
      return { ...state, postOrderIsLoading: true, postOrderIsError: "" };
    case POST_ORDER_FAILED:
      console.log("POST ORDER REDUCER FAILED wit error", payload.error);
      return {
        ...state,
        postOrderIsLoading: true,
        postOrderIsError: payload.error
      };
    case POST_ORDER_SUCCEED:
      console.log("POST ORDER REDUCER SUCEED with response: ", payload);
      return {
        ...state,
        cart: [],
        postOrderResponse: payload,
        postOrderIsLoading: true,
        postOrderIsError: payload.error
      };
    case DELETE_ORDER_ITEM:
      return { ...state, cart: cart.filter(item => item.id !== payload) };
    default:
      return { ...state, cart: cart };
  }
};

export default cart;

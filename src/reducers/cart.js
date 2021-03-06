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
  cart:[],
  postOrderIsLoading:false,
  postOrderIsError:"",
  postOrderResponse:""
};

export default function (state = initState, action){
  const {type,payload} = action;
  const {cart} = state;
  console.log("Current cart state: ", state);
  console.log("Merged items: ", mergeItems(state.cart));
  switch(type){
  case ADD_ITEM_TO_CART:
      console.log("ADD ITEM TO CART reducer triggered with payload: ", payload);
      return {cart:mergeItems([...cart,payload])};
  case POST_ORDER_STARTED:
      console.log("POST ORDER REDUCER STARTED");
      return {...state,postOrderIsLoading:true,postOrderIsError:""};
  case POST_ORDER_FAILED:
      console.log("POST ORDER REDUCER FAILED wit error", payload.error);
      return {...state,postOrderIsLoading:true,postOrderIsError:payload.error};
  case POST_ORDER_SUCCEED:
      console.log("POST ORDER REDUCER SUCEED with response: ", payload);
      return {...state,cart:[],postOrderResponse:payload,postOrderIsLoading:true,postOrderIsError:payload.error};
  case DELETE_ORDER_ITEM:
      return {...state,cart:cart.filter(item => item.id !== payload)}
  default:
    return state;
  }
};


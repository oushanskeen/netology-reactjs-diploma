import * as types from "../constants/actionTypes";
import axios from "axios";
import configData from "../config.json";

export const addItemToCart = (item) => {
  console.log(`ADD_ITEM_TO_CART with ${item}`);
  return {type:types.ADD_ITEM_TO_CART, payload:item};
};

export const postOrderStarted = (order) => {
  console.log("POST ORDER STARTED with data: ", order);
  return {type:types.POST_ORDER_STARTED, payload:order};
};
export const postOrderFailed = (error) => {
  console.log("POST ORDER FAILED with data: ", error);
  return {type:types.POST_ORDER_FAILED, payload:error};
};
export const postOrderSucceed = (data) => {
  console.log("POST _RDER SUCCEED with data: ", data);
  return {type:types.POST_ORDER_SUCCEED, payload:data};
};

export const postOrder = (order) => {
  console.log("POST ORDER STARTED");
  return (dispatch) => {
    console.log("POST_ORDER initiated with payload: ", order);
    dispatch(postOrderStarted(order));
    axios
      .post(`${configData.BACKEND_API}/order`,{...order})
      //.post(`${process.env.BACKEND_API}/order`,{...order})
      .then(res => dispatch(postOrderSucceed(res.data)))
      .catch(err => dispatch(postOrderFailed(err.message)))
  };
};

export const deleteOrderItem = (id) => 
  ({type:types.DELETE_ORDER_ITEM,payload:id});

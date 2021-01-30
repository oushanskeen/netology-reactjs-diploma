import * as types from "../constants/actionTypes";
import axios from "axios";


export const getItemsStarted = () => {
  console.log("GET_ITEMS_STARTED");
  return {type:types.GET_ITEMS_STARTED};
};
export const getItemsFailed = (error) => {
  console.log("GET_ITEMS_FAILED with data: ", error);
  return {type:types.GET_ITEMS_FAILED, payload:error};
};
export const getItemsSucceed = (data) => {
  console.log("GET_ITEMS_SUCCEED with data: ", data);
  return {type:types.GET_ITEMS_SUCCEED, payload:data};
};

export const getItems = (tail) => {
  console.log("GET ITEMS TRIGGERED");
  return (dispatch) => {
    console.log("GET_ITEMS initiated with tail: ", tail);
    dispatch(getItemsStarted());
    axios
      .get(`http://localhost:7070/api/items${tail}`)
      .then(res => dispatch(getItemsSucceed(res.data)))
      .catch(err => dispatch(getItemsFailed(err.message)))
  };
};

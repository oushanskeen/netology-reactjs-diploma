import * as types from "../constants/actionTypes";
import axios from "axios";

export const getCategoriesStarted = () => {
  console.log("GET_CATEGORIES_STARTED");
  return {type:types.GET_CATEGORIES_STARTED};
};
export const getCategoriesFailed = (error) => {
  console.log("GET_CATEGORIES_FAILED with data: ", error);
  return {type:types.GET_CATEGORIES_FAILED, payload:error};
};
export const getCategoriesSucceed = (data) => {
  console.log("GET_CATEGORIES_SUCCEED with data: ", data);
  return {type:types.GET_CATEGORIES_SUCCEED, payload:data};
};
export const getCategories = () => {
  return (dispatch) => {
    console.log("GET_CATEGORIES initiated");
    dispatch(getCategoriesStarted());
    axios
      .get("http://localhost:7070/api/categories")
      .then(res => dispatch(getCategoriesSucceed(res.data)))
      .catch(err => dispatch(getCategoriesFailed(err.message)))
  };
};

export const setCategory = (category) => {
  console.log("Categories action triggered");
  return {type:types.SET_CATEGORY,payload:category};
};
export const incrementOffset = () => {
  console.log("Offset increase triggered");
  return {type:types.INCREMENT_OFFSET};
};

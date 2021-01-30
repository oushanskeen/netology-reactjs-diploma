//import * as types from "../constants/actionTypes";
import axios from "axios";

export const getUsers = () => dispatch => {
  dispatch({
    type: "GET_USERS",
    payload: axios.get("http://localhost:7070/users")
  });
};

/*
//GET_CATEGORIES
export const getCategoriesStarted = () => ({
  type: types.GET_CATEGORIES_STARTED
});
export const getCategoriesFailed = error => ({
  type: types.GET_CATEGORIES_FAILED,
  payload: error
});
export const getCategoriesSucceed = data => ({
  type: types.GET_CATEGORIES_SUCCEED,
  payload: data
});
*/
export const getCategories = () => dispatch => {
    //console.log("GET_CATEGORIES initiated");
    //dispatch(getCategoriesStarted());
    axios.get("http://localhost:7070/api/categories")
     // .then(res => res.json())
     // .then(res => dispatch(getCategoriesSucceed(res.data)))
     // .catch(err => dispatch(getCategoriesFailed(err.message)));
};

/*
export const setCategory = (category) => {
  console.log("Categories action triggered");
  return {type:types.SET_CATEGORY,payload:category};
};
export const incrementOffset = () => {
  console.log("Offset increase triggered");
  return {type:types.INCREMENT_OFFSET};
};
*/

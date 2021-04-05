//import * as types from "../constants/actionTypes";
import axios from "axios";
import configData from "../config.json";

export const getUsers = () => dispatch => {
  dispatch({
    type: "GET_USERS",
    payload: axios.get("http://localhost:7070/users")
  });
};
/*
export const getCategories = () => dispatch => {
  dispatch({
    type: "GET_CATEGORIES",
    payload: axios.get("http://localhost:7070/categories")
  });
};
*/

const getCategoriesStarted = () => {
  console.log("GET_CATEGORIES_STARTED");
  return  {type:"GET_CATEGORIES_STARTED"}
};
const getCategoriesSucceed = (data) => 
  ({type:"GET_CATEGORIES_SUCCEED",payload:data});
const getCategoriesFailed = (error) => 
  ({type:"GET_CATEORIES_FAILED", payload:error});
export const getCategories = () => dispatch => {
  console.log("GET CATEGORIES TRIGGERED WITH");
  dispatch(getCategoriesStarted());
  console.log("BACKEND API: ", configData);
  axios
    //.get("http://localhost:7070/api/categories")
    .get(`${configData.BACKEND_API}/categories`)
    .then(res => dispatch(getCategoriesSucceed(res.data)))
    .catch(err => dispatch(getCategoriesFailed(err.message)))
  //dispatch({
  //  type: "GET_ITEMS",
  //  //payload: axios.get(url)
  //  payload: "GET ItEMS STUB RESPONSE"
  //});
};

const getItemsStarted = () => 
  ({type:"GET_ITEMS_STARTED"});
const getItemsSucceed = (data) => 
  ({type:"GET_ITEMS_SUCCEED",payload:data});
const getItemsFailed = (error) => 
  ({type:"GET_ITEMS_FAILED", payload:error});
export const getItems = (url) => dispatch => {
  console.log("GET ITEMS TRIGGERED WITH URL: ", url);
  dispatch(getItemsStarted());
  axios
    .get(url)
    .then(res => dispatch(getItemsSucceed(res.data)))
    .catch(err => dispatch(getItemsFailed(err.message)))
  //dispatch({
  //  type: "GET_ITEMS",
  //  //payload: axios.get(url)
  //  payload: "GET ItEMS STUB RESPONSE"
  //});
};
const getItemStarted = () => 
  ({type:"GET_ITEM_STARTED"});
const getItemSucceed = (data) => 
  ({type:"GET_ITEM_SUCCEED",payload:data});
const getItemFailed = (error) => 
  ({type:"GET_ITEM_FAILED", payload:error});
export const getItem = (itemId) => dispatch => {
  console.log("GET ITEM TRIGGERED WITH URL: ", itemId);
  dispatch(getItemStarted());
  axios
    .get(`${configData.BACKEND_API}/items/${itemId}`)
    .then(res => dispatch(getItemSucceed(res.data)))
    .catch(err => dispatch(getItemFailed(err.message)))
  //dispatch({
  //  type: "GET_ITEMS",
  //  //payload: axios.get(url)
  //  payload: "GET ItEMS STUB RESPONSE"
  //});
};


export const chooseCategory = (category) => dispatch => {
  dispatch({
    type: "CHOOSE_CATEGORY",
    payload: category
  });
};
export const moreItems = (offset) => dispatch => {
  dispatch({
    type: "MORE_ITEMS",
    payload: offset
  });
};
export const makeQuery = (query) => dispatch => {
  console.log("MAKE QUERY ACTION IS TRIGGERED");  
  dispatch({
    type: "MAKE_QUERY",
    payload: query
  });
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

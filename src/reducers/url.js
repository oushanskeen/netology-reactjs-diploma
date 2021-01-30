 import {
   SET_URL
 } from "../constants/actionTypes";

const initialState = {
  urlName:""
};
export default function (state = initialState, action){
  //const {urlName} = state;
  switch(action.type){
    case SET_URL:
      return (
        {urlName:
          action.payload === "All"
          ? "http://localhost:7070/items"
          : `http://localhost:7070/items?categoryId=${action.payload}`
        }
      );
    default:
      return state;
  };
};

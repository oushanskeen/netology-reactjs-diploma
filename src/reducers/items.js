 import {
  // GET_ITEMS,
   GET_ITEMS_STARTED,
   GET_ITEMS_FAILED,
   GET_ITEMS_SUCCEED,
 } from "../constants/actionTypes";

const initialState = {
  items:[],
  isLoading:false,
  error:null
};
export default function (state = initialState, action){
  const {items,isLoading,error} = state;
  switch(action.type){
    case GET_ITEMS_STARTED:
      return {...state, isLoading:true}
    case GET_ITEMS_FAILED:
      return {...state,error:action.payload}
    case GET_ITEMS_SUCCEED:
      const out = {
        ...state, 
        items:[...action.payload],
      };
      return out;
    default:
      return state;
  };
};

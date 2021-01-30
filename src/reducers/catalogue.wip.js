 import {

   GET_CATEGORIES,
   GET_CATEGORIES_STARTED,
   GET_CATEGORIES_FAILED,
   GET_CATEGORIES_SUCCEED,
   
   SET_CATEGORY,
   INCREMENT_OFFSET
 } from "../constants/actionTypes";

const initialState = {
  categories:[],
  category:[], 
  offset:6,
  isLoading:false,
  error:""
};
export default function (state = initialState, action){
  const {categories,category,offset,isLoading,error} = state;
  switch(action.type){
    case GET_CATEGORIES_STARTED:
      return {...state, isLoading:true}
    case GET_CATEGORIES_FAILED:
      return {...state,error:action.payload}
    case GET_CATEGORIES_SUCCEED:
      const out = {
        ...state, 
        categories:[{id:11,title:"All"},...action.payload],
        category:{id:11,title:"All"}
      };
      console.log("GET_CATEGORIES_SUCCEED OUT: ", out);
      return out;
    case SET_CATEGORY:
      console.log("CATEGORIES REDUCER TRIGGERED!");
      console.log("CATEGORIES REDUCER input: ", action);
      const out2 = {...state, category: action.payload, offset:6};
      console.log("OUT AFTER SET CATEGORY: ", out2);
      return out2;
    case INCREMENT_OFFSET:
      return{...state, offset: offset + 6}
    default:
      return state;
  };
};

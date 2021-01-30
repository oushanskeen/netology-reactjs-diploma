import * as types from "../constants/actionTypes";
//import axios from "axios";

export const setURL = (category) => {
  console.log("SET_URL withparams: ", category);
  return {type:types.SET_URL};
};

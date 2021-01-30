import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
//import fetchMock from "fetch-mock";
//import * as types from "../constants/actionTypes";
//import axios from "axios";
import mockAxios from "axios";
import promise from "redux-promise-middleware";
//import * as actions from "./catalogue";
import {getUsers} from "./catalogue";


const mockStore = configureMockStore([thunk,promise]);
describe("User Actions", () => {
  let store;
  beforeEach(() => store = mockStore({users:{}}));

  describe("getUsers action creator", () => {
    it("dispatches GET_USERS action and returns data on success", async () => {
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({
        data:[{id:1, name:"Vasilis"}]
      }))

      await store.dispatch(getUsers());
      const actions = store.getActions();
      // [ {type:"GET_USERS_PENDING"},
      //   {type:"GET_USERS_FULFILLED",payload:{data:"som stub data"}}
      //
      // ]
      expect.assertions(3);
      expect(actions[0].type).toEqual("GET_USERS_PENDING");
      expect(actions[1].type).toEqual("GET_USERS_FULFILLED");
      expect(actions[1].payload.data[0].name).toEqual("Vasilis");

    });
  });
});

/*
describe("async actions", () => {
  afterEach(() => fetchMock.restore());
  it("WHEN fetching is ok, THEN FETCH_CATEGORIES_SUCCESS", () => {
    fetchMock.getOnce("/categories", {
      body: { categories: ["All"] },
      headers: { "content-type": "application/json" }
    });
    const expectedActions = [
      { type: types.FETCH_CATEGORIES_STARTED },
      { type: types.FETCH_CATEGORIES_SUCCESS, body:{categories:["All"]} }
    ];
    const store = mockStore({ categories: [] });
    return store.dispatch(actions.fetchCategories()).then(() => {
      // return of async functions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
// GET_CATEGORIES
/*
describe("WHEN GET_CATEGORIES  action is triggered",() => {
  it("THEN GET_CATEGORIES_STARTED is triggered without payload",() => {
     
  });
*/
/*
  it("THEN if ok GET_CATEGORIES_SUCCEED is triggered with data from back-end",() => {
     
  });
  it("THEN if bad GET_CATEGORIES_FAILED is triggered with error message",() => {
     
  });
  */
//});

/*
export const getCategoriesStarted = () => {
  console.log("GET_CATEGORIES_STARTED");
  return {type:types.GET_CATEGORIES_STARTED};
};
*/

/*
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
*/

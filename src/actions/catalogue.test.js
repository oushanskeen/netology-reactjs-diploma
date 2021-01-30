import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
//import fetchMock from "fetch-mock";
//import * as types from "../constants/actionTypes";
//import axios from "axios";
import mockAxios from "axios";
import promise from "redux-promise-middleware";
//import * as actions from "./catalogue";
import { 
  getCategories,
  getItems,
  chooseCategory,
  moreItems
} from "./catalogue";

const doMockAxios = data =>
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: data }));

const mockStore = configureMockStore([thunk, promise]);

describe("Catalogue actions creator emits:", () => {
  let store;
  beforeEach(() => (store = mockStore({ 
    categories: [],
    items:[],
    category:"",
    offset:0
  })));

  it("1. GET_CATEGORIES action and returns data on success", async () => {
    doMockAxios(["All", "Men", "Women", "Unisex", "Kids"]);
    await store.dispatch(getCategories());
    const actions = store.getActions();
    expect.assertions(3);
    expect(actions[0].type).toEqual("GET_CATEGORIES_PENDING");
    expect(actions[1].type).toEqual("GET_CATEGORIES_FULFILLED");
    expect(actions[1].payload.data).toEqual(["All","Men","Women","Unisex","Kids"]);
  });

  it("2. GET_ITEMS action and returns data on success", async () => {
    doMockAxios([{id:1,name:"item one"},{id:2,name:"item two"}]);
    await store.dispatch(getItems());
    const actions = store.getActions();
    expect.assertions(4);
    expect(actions[0].type).toEqual("GET_ITEMS_PENDING");
    expect(actions[1].type).toEqual("GET_ITEMS_FULFILLED");
    expect(actions[1].payload.data[0].id).toEqual(1);
    expect(actions[1].payload.data[0].name).toEqual("item one");
  });

  it("3. CHOOSE_CATEGORY action and returns category", async () => {
    await store.dispatch(chooseCategory("Men"));
    const actions = store.getActions();
    expect.assertions(2);
    expect(actions[0].type).toEqual("CHOOSE_CATEGORY");
    expect(actions[0].payload).toEqual("Men");
  });

  it("4. MORE_ITEMS action and returns data on success", async () => {
    doMockAxios([{id:3,name:"item three"},{id:4,name:"item four"}]);
    await store.dispatch(moreItems(6));
    const actions = store.getActions();
    expect.assertions(2);
    expect(actions[0].type).toEqual("MORE_ITEMS");
    expect(actions[0].payload).toEqual(6);
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
  });:w

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

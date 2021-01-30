import catalogue from "./catalogue";
import { formatParams } from "../utils/formatParams";
import { dispatch } from "./catalogue";
//console.log("Catalogue: ");
const categories = [
  { id: 11, name: "All" },
  { id: 12, name: "Men" },
  { id: 13, name: "Women" },
  { id: 14, name: "Unisex" }
];
const initState = {
  categories: categories,
  category: "All",
  offset: 0,
  isLoading: false,
  error: "",
  url: "http://localhost:7070/items",
  items: [],
  query: ""
};

describe("WHEN GET_CATEGORIES is received with categories", () => {
  it("THEN categories and relevant url are saved in new state", () => {
    expect(
      dispatch(initState, {
        type: "GET_CATEGORIES",
        payload: ["c1", "c2", "c3", "c4"]
      })
    ).toEqual({
      ...initState,
      categories: ["c1", "c2", "c3", "c4"]
    });
  });
});
describe("WHEN GET_ITEMS is triggered and items return from endpoint", () => {
  it("THEN items and relevant url are saved in new state", () => {
    expect(
      dispatch(initState, {
        type: "GET_ITEMS",
        payload: ["i1", "i2", "i3", "i4"]
      })
    ).toEqual({
      ...initState,
      items: ["i1", "i2", "i3", "i4"]
    });
  });
});
describe("WHEN CHOOSE_CATEGORY is received with category", () => {
  it("THEN new category and nulled offset are saved in new state", () => {
    expect(
      dispatch(
        { ...initState, offset: 6, category: "Pet" },
        {
          type: "CHOOSE_CATEGORY",
          payload: "Men"
        }
      )
    ).toEqual({
      ...initState,
      offset: 0,
      category: "Men",
      url: "http://localhost:7070/items?categoryId=12"
    });
  });
});
describe("WHEN MORE_ITEMS is triggered", () => {
  it(`THEN offset incremented by 6 and newly formed url are saved to new state`, () => {
    expect(
      dispatch(
        { ...initState, categories: categories },
        {
          type: "MORE_ITEMS"
        }
      )
    ).toEqual({
      ...initState,
      offset: 6,
      categories: categories,
      url: "http://localhost:7070/items?offset=6"
    });
  });
});
describe("WHEN MAKE_QUERY is triggered with request", () => {
  it("THEN relevant query request and new url for request are saved to state", () => {
    expect(
      dispatch(initState, {
        type: "MAKE_QUERY",
        payload: "black"
      })
    ).toEqual({
      ...initState,
      query: "black",
      url: "http://localhost:7070/items?q=black"
    });
  });
});

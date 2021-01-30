const assert = require("./assert");
const categories = [
  { id: 11, name: "All" },
  { id: 12, name: "Men" },
  { id: 13, name: "Women" }
];
const formatParams = ({ category, offset = "", query = "" }) => {
  const getCategory = category =>
    category === "All"
      ? ""
      : `categoryId=${categories.filter(e => e.name === category)[0].id}`;
  const getOffset = (offset = "") => (offset === 0 ? "" : `offset=${offset}`);
  const getQuery = (query = "") => (query === "" ? "" : `q=${query}`);
  const filterEmptyStrokes = array => array.filter(e => e !== "");
  const ifNoParams = array => filterEmptyStrokes(array).length === 0;
  const formatParams = array => `?${array.join("&")}`;
  const $ = {
    getCategory: () => getCategory(category),
    getOffset: () => getOffset(offset),
    getQuery: () => getQuery(query),
    outputArray: () => [$.getCategory(), $.getOffset(), $.getQuery()],
    ifNoParams: () => ifNoParams($.outputArray()),
    formatParams: () =>
      $.ifNoParams() ? "" : formatParams(filterEmptyStrokes($.outputArray()))
  };
  const output = $.formatParams();
  console.log("OUTPUT IN makeParams: ", output);
  return `${output}`;
};
assert(
  "formatParams: GIVEN {category='All',offset=0,query=''}",
  formatParams({ category: "All", offset: 0, query: "" }),
  ""
);
assert(
  "formatParams: GIVEN {category='All',offset=6,query=''}",
  formatParams({ category: "All", offset: 6, query: "" }),
  "?offset=6"
);
assert(
  "formatParams: GIVEN {category='All',offset=6,query='black'}",
  formatParams({ category: "All", offset: 6, query: "black" }),
  "?offset=6&q=black"
);
assert(
  "formatParams: GIVEN {category='Men',offset=0,query=''}",
  formatParams({ category: "Men", offset: 0, query: "" }),
  "?categoryId=12"
);
assert(
  "formatParams: GIVEN {category='Men',offset=6,query=''}",
  formatParams({ category: "Men", offset: 6, query: "" }),
  "?categoryId=12&offset=6"
);
assert(
  "formatParams: GIVEN {category='Men',offset=6,query='black'}",
  formatParams({ category: "Men", offset: 6, query: "black" }),
  "?categoryId=12&offset=6&q=black"
);

/*  
const composeRoute = ({category, offset="", query=""}) => { 

  // isNotNull :: a -> "" | a
  //makeParams :: (String,Num,String) -> String;
  const makeParams = () => Object.entries({
    category:category,
    offset: offset ,
    query: query
  });
  console.log("PARAMS: ", makeParams());
  const root = `http://localhost:7070/items`;
  console.log("INPUT category = ", category);
  const categoryTail = 
    category === "All" 
    ? ""
    : `?categoryId=${categories.filter(e => e.name === category)[0].id}`;
  const offsetTail =  (category === "All" ? "?" : "&") + `offset=${offset}`;
  const queryTail =  (category === "All" ? "?" : "&") + `q=${query}`;
  return root + categoryTail + (query && queryTail) + (offset && offsetTail);
};
assert(
  "GIVEN {category:'All',offset:0,query:''}",
  composeRoute({category:"All",offset:0,query:""}),
  "http://localhost:7070/items"
);
/*
assert(
  "GIVEN 'All' category",
  composeRoute({category:"Men"}),
  "http://localhost:7070/items?categoryId=12"
);
assert(
  "GIVEN offset category:'All', offset:6",
  composeRoute({category:"All", offset:6}),
  "http://localhost:7070/items?offset=6"
);
assert(
  "GIVEN offset category:'Men', offset:6",
  composeRoute({category:"Men", offset:6}),
  "http://localhost:7070/items?categoryId=12&offset=6"
);
assert(
  "GIVEN offset category:'All', offset:6, query:black",
  composeRoute({category:"All", offset:6, query:"black"}),
  "http://localhost:7070/items?q=black&offset=6"
);
*/

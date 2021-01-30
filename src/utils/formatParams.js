const assert = require("./assert");

const categories = [
  { id: 11, name: "All" },
  { id: 12, name: "Men" },
  { id: 13, name: "Women" }
];

// type Category = All | Men | Women | Unisex | Kids;
// type Offset = Num;
// type Query = String;
// type URL = String;
// formatParams :: (Category,Offset,Query) -> URL
const formatParams = ({
  category,
  offset = "",
  query = "",
  categories
}) => {
  console.log("formatParams input: ", category, offset, query, categories);
  const getCategory = category =>
    category === "All"
      ? ""
      : `categoryId=${categories.filter(e => e.title === category)[0].id}`;
  const getOffset = (offset = "") => (offset === 0 ? "" : `offset=${offset}`);
  const getQuery = (query = "") => (query === "" ? "" : `q=${query}`);
  const filterEmptyStrokes = array => array.filter(e => e !== "");
  const ifNoParams = array => filterEmptyStrokes(array).length === 0;
  const formatParams = array => `?${array.join("&")}`;
  const $ = {
    getCategory: () => getCategory(category.title),
    getOffset: () => getOffset(offset),
    getQuery: () => getQuery(query),
    outputArray: () => [$.getCategory(), $.getOffset(), $.getQuery()],
    ifNoParams: () => ifNoParams($.outputArray()),
    formatParams: () =>
      $.ifNoParams() ? "" : formatParams(filterEmptyStrokes($.outputArray()))
  };
  const output = $.formatParams();
  //console.log("OUTPUT IN makeParams: ", output);
  return `${output}`;
};
/*
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
*/
module.exports = { formatParams };

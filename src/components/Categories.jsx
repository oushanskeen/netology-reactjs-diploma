import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as categoriesActions from "../actions/categories.js";
import * as itemsActions from "../actions/items.js";

const box = {
  display: "flex",
  flexDirection: "column",
  border: "3px solid grey"
};

const Categories = ({
  categoriesState,
  itemsState,
  urlState,
  onGetItems,
  onSetCategory,
  onGetCategories,
  onIncrementOffset
}) => {
  const { categories, category, offset } = categoriesState;
  const [data, setData] = useState([]);
  const rootURL = "http://localhost:7070/api/items";
  const address = x => (x === 11 ? `` : `?categoryId=${x}`);
  const onGetMoreItems = () => {
    const address =
      category.id === 11
        ? `?offset=${offset}`
        : `?categoryId=${category.id}&offset=${offset}`;
  };
  console.log(`
    categories: ${categories},
    category: ${category},
    offset: ${offset}
    `);
  useEffect(() => categories.length < 1 && onGetCategories(), []);
  useEffect(() => onGetItems(address(category.id)), [category]);
  console.log(`
    ON OFFSET CHANGE: ${JSON.stringify(offset)}
    ON DATA CHANGE: ${JSON.stringify(data)}
    `);
  useEffect(() => onGetItems(onGetMoreItems), [offset]);

  return (
    <div style={box}>
      <div style={box}>
        <div style={box}>{JSON.stringify(categoriesState)}</div>
        <div style={box}>{JSON.stringify(itemsState)}</div>
        <div style={box}>{JSON.stringify(urlState)}</div>
      </div>
      <div style={box}>
        {categories.map(e => (
          <button 
            onClick={() => onSetCategory(e)}
            style={{backgound: e === category.title && "grey"}}
          >{JSON.stringify(e)}</button>
        ))}
        <h1>category</h1>
        <h1>{category.title}</h1>
      </div>
      <div style={box}>
        <button onClick={onIncrementOffset}>LOAD MORE</button>
      </div>
    </div>
  );
};

const mapStateToProps = _state => ({
  categoriesState: _state.categories,
  itemsState: _state.items,
  urlState: _state.url
});
const mapDispatchToProps = _dispatch => ({
  onGetCategories: categories => _dispatch(categoriesActions.getCategories()),
  onGetItems: tail => _dispatch(itemsActions.getItems(tail)),
  onSetCategory: category => _dispatch(categoriesActions.setCategory(category)),
  onIncrementOffset: () => _dispatch(categoriesActions.incrementOffset())
});
export default connect(mapStateToProps, mapDispatchToProps)(Categories);

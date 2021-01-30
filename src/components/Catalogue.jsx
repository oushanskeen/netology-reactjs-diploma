//import React,{ useState, useEffect } from "react";
import React from "react";
import {useLocation} from "react-router-dom";
//import Categories from "./Categories.jsx";
import {connect} from "react-redux";
import * as catalogueActions from "../actions/catalogue.js";

export const Catalogue = ({
  state,
  onSetCategory,
  onGetCategories,
  onGetItems,
  onMoreItems
}) => {
  console.log("STATE INSIDE CATALOGUE: ", state);
 // const [model, setModel] = useState({...state});
  const {categories,category, isLoading, error, items,url} = state;
  console.log("CURRENT LOCATION: ", 
    useLocation().pathname.split("/").slice(-1));
  console.log("URL INSIDE STATE: ", url);
  const hadleSetCategoryClick = (category) =>
    onSetCategory(category);
  React.useEffect(() => {
    categories.length === 1 && onGetCategories()
  },[]);
  React.useEffect(() => {
    console.log("URL INSIDE HOOK: ", url);
    onGetItems(url)
  },[url]);
  return (
    <div>
      <h3>model</h3><br/>
      {JSON.stringify(state)}
      {/*<Categories/>*/}
      <div id="categories">
      <h3>catalogue component</h3>
        {categories.length > 1 && categories.map(
          ({id,title}) => 
            <button 
              key={title}
              id={title}
              onClick={() => hadleSetCategoryClick({id,title})}
            >
              {title}
            </button>)
        }
      </div>
      <div id="itemsList">
        {isLoading 
          ? "is loading" 
          : error !== ""
            ? error
            : items.map(e => <div key={e}>{JSON.stringify(e)}</div>)
        }
      </div>
      <div>
        <button id="moreButton" onClick={onMoreItems}>MORE ITEMS</button>
      </div>
    </div>
  );
};
const mapStateToProps = _state => ({
  state:_state.catalogue
  //categoriesState: _state.categories,
  //itemsState: _state.items,
  //urlState: _state.url
});
const mapDispatchToProps = _dispatch => ({
  onGetCategories: () =>
    _dispatch(catalogueActions.getCategories()),
  onGetItems: (url) =>
    _dispatch(catalogueActions.getItems(url)),
    //_dispatch(catalogueActions.getItems(tail)),
  onSetCategory: category =>
    _dispatch(catalogueActions.chooseCategory(category)),
  onMoreItems: (offset) =>
    _dispatch(catalogueActions.moreItems(offset))
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);


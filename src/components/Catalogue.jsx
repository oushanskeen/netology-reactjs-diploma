import React,{ useState, useEffect } from "react";
import {useLocation, useHistory} from "react-router-dom";
//import Categories from "./Categories.jsx";
import {connect} from "react-redux";
import * as catalogueActions from "../actions/catalogue.js";
import {Card} from "../style/beauty.js";
import {box, boxRow} from "../style/zen.js";
import Search from "./Search.jsx";
import {ItemCard} from "./ItemCard.jsx"; 
const errorImg = "https://populus.ru/wp-content/uploads/2019/11/no-image-500x500.jpg";

export const Catalogue = ({
  state,
  onSetCategory,
  onGetCategories,
  onGetItems,
  onMoreItems
}) => {
  const history = useHistory();
  console.log("STATE INSIDE CATALOGUE: ", state);
 // const [model, setModel] = useState({...state});
  const {categories,category, isLoading, error, items,url, upload} = state;
  console.log("CURRENT LOCATION: ", 
    useLocation().pathname.split("/").slice(-1));
  console.log("URL INSIDE STATE: ", url);
  const currentRoute = useHistory().location.pathname;
  const hadleSetCategoryClick = (category) =>
    onSetCategory(category);
  React.useEffect(() => {
    categories.length === 1 && onGetCategories()
  },[]);
  React.useEffect(() => {
    console.log("URL INSIDE HOOK: ", url);
    onGetItems(url)
  },[url]);
  const LocalSearch = () => {
    return (
      <input value="search" />
    );
  };
  return (
    <div>
      {/*<LocalSearch/>*/}
      {/*JSON.stringify(items)*/}
      {/*items.map(item => <div>{JSON.stringify(item)}</div>)*/}
      {currentRoute === "/catalog" && <Search fold="false" inCatalogue={true}/>}    
      <div>
        categories
      </div>
      <div 
        id="categories" 
        style={{
          ...box,
          justifyContent:"center",
        }}
    >
        {categories.length > 1 && categories.map(
          ({id,title}) => 
            <button 
              key={title}
              id={title}
              onClick={() => hadleSetCategoryClick({id,title})}
              style={{color: category.title === title && "red"}}
            >
              {title}
            </button>)
        }
      </div>
      <div id="itemsList" style={{...box,flexWrap:"wrap"}}>
        {isLoading 
          ? "is loading" 
          : error !== ""
            ? error
            : items.map(item => <ItemCard key={item} data={item}/>)
        }
      </div>
      <div>
        {isLoading 
          ? <div>items are loading</div> 
          :!(upload.length < 6) &&
            <button id="moreButton" onClick={onMoreItems}>MORE ITEMS</button>
        }
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


import { useState } from "react";
import { box, boxRow } from "../style/zen.js";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import * as catalogueActions from "../actions/catalogue.js";
import searchIcon from "../img/search.png";

const Search = ({ state, onMakeQuery, fold = true, inCatalogue }) => {
  const [model, setModel] = useState({
    isFolded: fold,
    search: "",
    loco: useLocation()
      .pathname.split("/")
      .slice(-1)
  });
  const history = useHistory();
  const { isFolded, search } = model;
  const LeCross = () => (
    <span
      style={{ margin: "4px" }}
      onClick={() => {
        setModel({
          ...model,
          search: "",
          isFolded: inCatalogue ? false : !isFolded
        });
        onMakeQuery("");
      }}
    >
      x
    </span>
  );
  const handleSearchbarPress = e =>
    e.code === "Enter" &&
    (search !== ""
      ? (() => {
          history.push("/catalog");
          onMakeQuery(search);
        })()
      : (() => {
          setModel({ ...model, isFolded: !isFolded });
          onMakeQuery("");
        })());
  const SearchStrip = () => (
    <>
      {/*!inCatalogue &&*/ (
        <div style={{ ...box, width: "100%", flexWrap:"row" }}>
          {" "}
          <input
            name="search"
            value={search}
            style={{border:"0px", color:"grey"}}
            onChange={e => setModel({ ...model, search: e.target.value })}
          />
          <LeCross />
        </div>
      )}
    </>
  );
  const SearchIcon = () => (
    <div onClick={() => setModel({ ...model, isFolded: !isFolded })}>
      {isFolded && <img src={searchIcon} alt="search" />}
    </div>
  );
  const FoldableSearchStrip = () =>
      <div onKeyPress={e => handleSearchbarPress(e)}>
        {!inCatalogue && isFolded ? "" : <SearchStrip />}
      </div>
  return (
    <div>
      {!inCatalogue && <SearchIcon />}
      {/*"IN CATALOGUE: " + inCatalogue + " IS FOLDED: " + isFolded*/}
      <FoldableSearchStrip />
    </div>
  );
};
const mapStateToProps = _state => ({
  state: _state.catalogue
});
const mapDispatchToProps = _dispatch => ({
  onMakeQuery: query => _dispatch(catalogueActions.makeQuery(query))
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);

import {useState} from "react";
import {box} from "../style/zen.js";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import * as catalogueActions from "../actions/catalogue.js";

const Search = ({state, onMakeQuery}) => {
  const [model,setModel] = useState({
    isFolded:true,
    search:"",
    loco: useLocation().pathname.split("/").slice(-1)
  });
  const {isFolded,search} = model; 
  return (
    <div style={box}>
      <div onClick={() => setModel({...model,isFolded:!isFolded})}>
        do search
      </div>
      <div 
        onKeyPress={e => e.code==="Enter" && onMakeQuery(search)}
      >
        {
          isFolded 
          ? "" 
          : <input 
              name="search" 
              value={search}
              onChange={e => setModel({...model,search: e.target.value})}
            />}
       {/*do search{isFolded ? "" : <input name="search" value={search}/>}*/}
      </div>
    </div>
  );
};
const mapStateToProps = _state =>({
  state:_state.catalogue
});
const mapDispatchToProps = _dispatch => ({
  onMakeQuery: (query) => _dispatch(catalogueActions.makeQuery(query))
});
export default connect(mapStateToProps,mapDispatchToProps)(Search);

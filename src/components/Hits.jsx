import {useState, useEffect} from "react";
import {box} from "../style/zen.js";

export const Hits = () => {
  const [state,setState] = useState({
    hits:[],
  });
  const {hits} = state;
  //const handleFetchHits = () =>
  useEffect(() => {
    hits.length < 1 && fetch("http://localhost:7070/api/top-sales")
    .then(res => res.json())
    .then(data => setState({...state, hits:[...data]}));
  });
  console.log("STATE in hits component: ", state);
  return (
    <div id="hits" style={{...box,flexDirection:"column"}}>
      <div>
        <h3>hits</h3>
      </div>
      <div>
        {JSON.stringify(hits)}
      </div>
    </div>
  )
};

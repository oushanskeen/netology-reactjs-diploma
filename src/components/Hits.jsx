import { useState, useEffect } from "react";
import { box } from "../style/zen.js";
import {Card} from "../style/beauty.js";
import {ItemCard} from "./ItemCard.jsx";

export const Hits = () => {
  const [state, setState] = useState({
    hits: []
  });
  const { hits } = state;
  //const handleFetchHits = () =>
  useEffect(() => {
    hits.length < 1 &&
      fetch("http://localhost:7070/api/top-sales")
        .then(res => res.json())
        .then(data => setState({ ...state, hits: [...data] }));
  });
  const Hit = ({ data:{title,images,price} }) => 
    <Card>
      <img src={images} alt="" style={{width:"100%"}}/>
        <div>{title}</div>
        <div>{price}</div>
      <button>Заказать</button>
    </Card>;
  const ListOfHits = ({ hits }) => (
    <div style={{...box}}>
      {hits.length > 0 && (
        <div id="hits" style={{ ...box, width:"100%" }}>
          <h3>hits</h3>
          {hits.map(hit => (
            <ItemCard data={hit} />
          ))}
        </div>
      )}
    </div>
  );
  console.log("STATE in hits component: ", state);
  return <ListOfHits hits={hits} />
};

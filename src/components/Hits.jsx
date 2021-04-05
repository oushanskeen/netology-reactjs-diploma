import { useState, useEffect } from "react";
import { box } from "../style/zen.js";
import {Card} from "../style/beauty.js";
import {ItemCard} from "./ItemCard.jsx";
import configData from "../config.json";

export const Hits = () => {
  const [state, setState] = useState({
    hits: []
  });
  const { hits } = state;
  //const handleFetchHits = () =>
  useEffect(() => {
    hits.length < 1 &&
      fetch(`${configData.BACKEND_API}/top-sales`)
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
        <div id="hits" style={{ ...box, width:"100%"}}>
          {hits.map(hit => (
            <ItemCard data={hit} />
          ))}
        </div>
      )}
    </div>
  );
  console.log("STATE in hits component: ", state);
  return (
    <>
      <h1 style={{...box, justifyContent:"center", padding:"1vw"}}>Хиты продаж!</h1>
      <ListOfHits hits={hits} />
    </>
  );
};

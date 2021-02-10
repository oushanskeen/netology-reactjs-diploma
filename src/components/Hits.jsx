import { useState, useEffect } from "react";
import { box } from "../style/zen.js";

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
  const Hit = ({ data }) => <div>{JSON.stringify(data)}</div>;
  const ListOfHits = ({ hits }) => (
    <>
      {hits.length > 0 && (
        <div id="hits" style={{ ...box, flexDirection: "column" }}>
          <h3>hits</h3>
          {hits.map(hit => (
            <Hit data={hit} />
          ))}
        </div>
      )}
    </>
  );
  console.log("STATE in hits component: ", state);
  return <ListOfHits hits={hits} />
};

import { box } from "../style/zen.js";
import banner from "../img/banner.jpg";

export const Banner = () => (
    <div
      style={{
        ...box,
        display:"grid",
        gridTemplateColumns:"1vw 1fr 1fr 1fr",
        //gridTemplateRows:"1fr 1fr 1fr 1fr"
      }}
  >
    <div
      style={{
        ...box,
        gridArea:"1/4/2/5",
        width:"100%",
        height:"10%",
        zIndex:2,
        background:"grey",
        opacity:0.8,
        color:"white",
        border:"0px",
        padding:30
      }}

    >
      <h1 style={{color:"white"}}>К весне готовы!</h1>
    </div>
      <img
        src={banner} 
        alt=""
        style={{width:"100vw"}}
      />
    </div>
);

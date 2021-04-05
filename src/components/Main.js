import { Banner } from "./Banner.jsx";
import { Hits } from "./Hits.jsx";
import  Catalogue  from "./Catalogue.jsx";
import {box} from "../style/zen";

export const Main = () => (
  <div box={{...box, width:"100%"}}>
    <Banner />
    <Hits />
    <Catalogue />
  </div>
);

import { Link } from "./Link";
import {useHistory} from "react-router-dom";
import { box, boxRow } from "../style/zen";
import Search from "./Search.jsx";
import Basket from "./Basket";
import logoIcon from "../img/headerIcon.jpg";

export const Head = () => {
  const history = useHistory();
  return(
  <div style={{...boxRow, background:"whiteSmoke"}}>
    <div style={{...box,background:"lightGrey", color:"black"}}>
        <img src={logoIcon}  alt="logo" onClick={() => history.push("/")}/>
    </div>
    <div style={{...box,width:"100%"}}>
      <Link address="/" name="main" style={{display:"flex", margin:"5px"}}/>
      <Link address="/catalog" name="catalogue" />
      <Link address="/about" name="about" />
      <Link address="/contacts" name="contacts" />
    </div>
    <div style={box}><Search/> <Basket/></div>
  </div>
)
};

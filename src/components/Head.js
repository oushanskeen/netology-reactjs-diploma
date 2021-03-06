import { Link } from "./Link";
import { box, boxRow } from "../style/zen";
import Search from "./Search.jsx";
import Basket from "./Basket";
import logo from "../img/header-logo.png";

export const Head = () => (
  <div style={{...boxRow, background:"whiteSmoke"}}>
    <div style={{...box,background:"lightGrey", color:"black"}}>
      <Link address="/" name="BOSA NOGA" >
        <img src={logo} alt=""/>
      </Link>
    </div>
    <div style={box}>
      <Link address="/" name="main" />
      <Link address="/catalog.html" name="catalogue" />
      <Link address="/about.html" name="about" />
      <Link address="/contacts.html" name="contacts" />
    </div>
    <div style={box}><Search/> <Basket/></div>
  </div>
);

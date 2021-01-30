import { Link } from "./Link";
import { box, boxRow } from "../style/zen";
import Search from "./Search.jsx";

export const Head = () => (
  <div style={boxRow}>
    <div style={box}>
      <Link address="/netology-reactjs-diploma/main" name="logo" />
    </div>
    <div style={box}>
      <Link address="/netology-reactjs-diploma/main" name="main" />
      <Link address="/netology-reactjs-diploma/catalogue" name="catalogue" />
      <Link address="/netology-reactjs-diploma/about" name="about" />
      <Link address="/netology-reactjs-diploma/contacts" name="contacts" />
    </div>
    <div style={box}><Search/> basket</div>
  </div>
);

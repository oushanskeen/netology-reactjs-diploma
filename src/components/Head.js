import { Link } from "./Link";
import { box, boxRow } from "../style/zen";
import Search from "./Search.jsx";

export const Head = () => (
  <div style={boxRow}>
    <div style={box}>
      <Link address="/" name="logo" />
    </div>
    <div style={box}>
      <Link address="/" name="main" />
      <Link address="/catalog.html" name="catalogue" />
      <Link address="/about.html" name="about" />
      <Link address="/contacts.html" name="contacts" />
    </div>
    <div style={box}><Search/> basket</div>
  </div>
);

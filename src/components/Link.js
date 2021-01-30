import { NavLink } from "react-router-dom";
import { box } from "../style/zen";

export const Link = ({ address, name }) => (
  <NavLink
    to={`${address}`}
    style={{ ...box, textDecoration: "none", color: "black" }}
    activeStyle={{ fontWeight: "bold", color: "LightGrey" }}
  >
    {name}
  </NavLink>
);

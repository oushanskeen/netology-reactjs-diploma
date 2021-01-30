import { Head } from "./Head";
import { Foot } from "./Foot";
import { box } from "../style/zen";

export const MainFrame = ({ kid }) => (
  <>
    <Head />
    <div style={box}>{kid}</div>
    <Foot />
  </>
);

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import basketIcon from "../img/basketIcon.png";
import { box } from "../style/zen";

const Basket = ({ cartItems }) => {
  const history = useHistory();
  const PinkLabel = ({ cartItems }) => (
    <div
      style={{
        ...box,
        background: "deepPink",
        borderRadius:"50%",
        width:"2vw",
        height:"2vw",
        gridArea: "1/2/2/3",
        justifyContent:"center"
      }}
    >
      {cartItems.length > 0 &&
        cartItems
          .map(({ quantity }) => quantity)
          .reduce((cur, sum) => cur + sum, 0)}
    </div>
  );
  const BasketIcon = () => (
    <img
      src={basketIcon}
      alt="basket"
      onClick={() => history.push("/cart")}
      //style={{ ...box, position: "absolute" }}
    />
  );
  return (
    <div
      style={{
        ...box,
          display:"grid",
          gridTemplateColumns: "1vw 1fr 1fr 1fr",
          gridTemplateRows: "1vw 1fr 1fr 1fr"
        //width: "100%"
      }}
    >
      {/* <button onClick={() => history.push("/cart")}>basket page</button>*/}
      <BasketIcon />
      <PinkLabel cartItems={cartItems} />
    </div>
  );
};
const mapStateToProps = state => ({
  cartItems: state.cart.cart
});
export default connect(mapStateToProps)(Basket);

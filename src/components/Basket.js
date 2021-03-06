import { connect } from "react-redux";
import {useHistory} from "react-router-dom";

const Basket = ({ cartItems }) => {
  const history = useHistory();
  const PinkLabel = ({ cartItems }) => (
    <>{
      cartItems.length > 0 
      && cartItems.map(({quantity}) => 
        quantity
      ).reduce((cur,sum) => cur + sum,0)}</>
  );
  return (
    <div>
      <button onClick={() => history.push("/cart.html")}>basket page</button>
      <br />
      <PinkLabel cartItems={cartItems} />
    </div>
  );
};
const mapStateToProps = state => ({
  cartItems: state.cart.cart
});
export default connect(mapStateToProps)(Basket);

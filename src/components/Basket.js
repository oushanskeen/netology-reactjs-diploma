import {connect} from "react-redux";

const Basket = ({cartItems}) => {
  const PinkLabel = ({cartItems}) => <>{cartItems.length > 0 && cartItems.length}</>
  return (
    <div>
      basket page<br/>
      <PinkLabel cartItems={cartItems}/>
    </div>)
};
const mapStateToProps = state => ({
  cartItems: state.cart.cart
});
export default connect(mapStateToProps)(Basket);

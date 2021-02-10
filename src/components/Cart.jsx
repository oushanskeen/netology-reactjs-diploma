import {useState} from "react";
import {connect} from "react-redux";
import * as cartActions from "../actions/cart.js";

const Cart = ({cartItems, onPostOrder}) => {
  const [model, setModel] = useState({
    positions:[],
    order:["sample order"],
    postOrderIsLoading: cartItems.postOrderIsLoading
  });
  const {order, postOrderIsLoading} = model;
  // [{id:1,q:1},{id:2,q:1}] => [{id:1, q:2}]

  const sumTheIds = (objects) => "";

  const Table = () => <div>
    hello me table

    </div>;
  const Order = () => {
    return (
      <div>
        { 
          postOrderIsLoading 
          ? <div></div>
          :
            (
              <div>
                hello me order
                <button onClick={()=>onPostOrder(order)}>
                POST ORDER
                </button>
            </div>
          )
      }
      </div>
    )
  };
  return (
    <div>}
      hello me cart
      {JSON.stringify(cartItems)}
      <Table/>
      <Order/>
    </div>
  );
};
const mapStateToProps = _state => ({
  cartItems: _state.cart
});
const mapDispatchToProps = _dispatch => ({
  onPostOrder: order => _dispatch(cartActions.postOrder(order))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

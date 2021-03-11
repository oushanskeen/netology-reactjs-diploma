import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as cartActions from "../actions/cart.js";
const mergeTheShopItems = require("../utils/merge.js");

const Cart = ({ cartItems, onPostOrder, onDeleteOrder }) => {
  const [model, setModel] = useState({
    positions: [],
    items: cartItems.cart,
    postOrderIsLoading: cartItems.postOrderIsLoading,
    sumToPay: cartItems.cart.map(({price}) => price).reduce((cur,sum)=> cur+sum,0)
  });
  const { items, postOrderIsLoading, sumToPay } = model;
  //localStorage.setItem("message", "saved in browser storage");
  console.log("LOCAL: ",localStorage.getItem("message"));
  // [{id:1,q:1},{id:2,q:1}] => [{id:1, q:2}]
  const sumTheIds = objects => "";
  useEffect(() => {
    setModel({ ...model, items: cartItems.cart });
  }, [cartItems]);

  const Table = () => (
    <div>
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Size</td>
            <td>Count</td>
            <td>Price</td>
            <td>Sum</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, quantity, size, price }) => (
            <tr>
              <td>{id}</td>
              <td>{"NAME"}</td>
              <td>{size}</td>
              <td>{quantity}</td>
              <td>{price}</td>
              <td>{"SUM"}</td>
              <td>
                <button onClick={() => onDeleteOrder(id)}>delete</button>
              </td>
              {/*item.map(i => <td>{i}</td>)*/}
            </tr>
          ))}
            <tr>
              Sum to pay: {sumToPay}
            </tr>
        </tbody>
      </table>
    </div>
  );
  const Order = () => {
    const [order, setOrder] = useState({
      owner: {
        phone: "",
        address: ""
      },
      orderIsReady: false,
      items:[...items],
    });
    const { owner } = order;
    const { phone, address } = owner;
    //console.log("Merged items: ", mergeTheShopItems(order));
    return (
      <div>
        {postOrderIsLoading ? (
          <div></div>
        ) : (
          <div>
            <form>
          {/*<div>ready to post model: {JSON.stringify(order)}</div>*/}
              <label>tele</label>
              <input
                name="phone"
                value={phone}
                onChange={e =>
                  setOrder({
                    ...order,
                    owner: { ...owner, phone: e.target.value }
                  })
                }
              />
              <label>address</label>
              <input
                name="address"
                value={address}
                onChange={e =>
                  setOrder({
                    ...order,
                    owner: {
                      ...owner,
                      address: e.target.value
                    }
                  })
                }
              />
              <label>agree</label>
              <input 
                type="checkbox" 
                name="agree" 
                onChange={e => 
                  setOrder({
                    ...order,
                    orderIsReady:e.target.value === "on" && !order.orderIsReady
                  })}
              />
              <button disabled={!order.orderIsReady} onClick={() => onPostOrder(order)}>POST ORDER</button>
            </form>
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      {/*JSON.stringify(model)*/}
      <Table />
      <Order />
    </div>
  );
};
const mapStateToProps = _state => ({
  cartItems: _state.cart
});
const mapDispatchToProps = _dispatch => ({
  onPostOrder: order => _dispatch(cartActions.postOrder(order)),
  onDeleteOrder: id => _dispatch(cartActions.deleteOrderItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

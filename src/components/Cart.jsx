import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as cartActions from "../actions/cart.js";
import {box} from "../style/zen.js";
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
  const colNames = ["#","Name","Size","Count","Price","Sum","Action"];
  const tdStyle = {
    borderCollapse:"collapse", 
    border:"1px solid lightGrey",
    padding:"5px",
  }
  const Table = () => (
    <div style={{...box, width:"100%"}}>
      <table style={{
        borderCollapse:"collapse", 
        border:"1px solid grey", 
        width:"100%",

      }}>
        <thead>
          <tr>
            {colNames.map(name => 
              <td style={tdStyle}>
              {name}
              </td>)
            }
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, quantity, size, price }) => (
            <tr>
              <td style={tdStyle}>{id}</td>
              <td style={tdStyle}>{"NAME"}</td>
              <td style={tdStyle}>{size}</td>
              <td style={tdStyle}>{quantity}</td>
              <td style={tdStyle}>{price}</td>
              <td style={tdStyle}>{quantity*price}</td>
              <td style={tdStyle}>
                <button 
                  onClick={() => onDeleteOrder(id)}
                  style={{color:"LightCoral", border:"1px solid LightCoral",padding:"0.5vw" }}
                >delete</button>
              </td>
            </tr>
          ))}
            <tr>
              <td style={{padding:"1vw"}}>Sum to pay: {sumToPay}</td>
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
    const field = {...box, padding:"5px", margin:"5px"};
    return (
          <div style={{...box,padding:"30px"}}>
       {postOrderIsLoading ? (
          <div></div>
        ) : (
          <div style={{...box, flexDirection:"column"}}>
            <form>
              <div style={field}>
              <label>tele<br/>
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
              </label>
              </div>
              <div style={field}>
              <label>address<br/>
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
              </label>
              </div>
              <div style={field}>
              <label>
              <input 
                type="checkbox" 
                name="agree" 
                onChange={e => 
                  setOrder({
                    ...order,
                    orderIsReady:e.target.value === "on" && !order.orderIsReady
                  })}
              />agree
              </label>
              </div>
              <div style={field}>
              <button disabled={!order.orderIsReady} onClick={() => onPostOrder(order)}>POST ORDER</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };
  return (
    <div style={{...box,flexDirection:"column", width:"100%"}}>
      {/*JSON.stringify(items)*/}
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

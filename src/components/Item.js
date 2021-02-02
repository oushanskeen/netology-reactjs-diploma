import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as cataloguActions from "../actions/catalogue";
import { box } from "../style/zen";

export const Item = ({ state, onGetItem }) => {
  //const { item } = state;
  const { id } = useParams();
  const itemId = id;
  console.log("PARAM ID: ", itemId);
  useEffect(() => {
    Object.keys(state).length < 1 && onGetItem(itemId);
  }, []);
  const { 
    sizes, 
    images, 
    sku, 
    manufacturer, 
    color, 
    material, 
    season, 
    reason } = state;
  const [model, setModel] = useState({
    // не понимаю почему работает именно такая конструкция
    art: sku ? sku : "",
    currMan: manufacturer ? manufacturer : "",
    currColor: color ? color : "",
    currMat: material ? material : "",
    currSeason: season ? season : "",
    currReason: reason ? reason : "",
    currSizes: sizes ? sizes.filter(({avalible}) => avalible === true) : [], //sizes,
    size: "",
    quantity: 0,
    image: state.images && state.images[0],
    orderBtnAvailable:true
  });
  const { currSizes, size, quantity, image } = model;
  //const { id } = useParams();
  //const itemId = id;
  /*
  useEffect(() => {
    Object.keys(state).length < 1 && onGetItem(itemId);
  }, []);
  */
  console.log("STATE INSIDE ITEM COMPONENT: ", state);
  console.log("MODEL INSIDE ITEM COMPONENT: ", model);
  return (
    <div>
      <div>
        <h4>item</h4>
        <div>model:{JSON.stringify(model)}</div>
        <div style={box}>{JSON.stringify(state)}</div>
        <div>
          sizes:
          {currSizes.map(e => (
            <button
              onClick={() => setModel({ ...model, size: e.size })}
              style={{ background: e.size === size && "lightGrey" }}
              disabled={model.orderBtnAvailable}
            >
              {e.size}
            </button>
          ))}
        </div>
        <div>
          quantity:
          <button
            onClick={() =>
              setModel({
                ...model,
                quantity: quantity === 0 ? 0 : quantity - 1
              })
            }
          >
            -
          </button>
          {quantity}
          <button
            onClick={() => setModel({ ...model, quantity: quantity + 1 })}
          >
            +
          </button>
        </div>
        <div>
          <button>do order</button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  state: state.catalogue.item
});
const mapDispatchToProps = dispatch => ({
  onGetItem: itemId => dispatch(cataloguActions.getItem(itemId))
});
export default connect(mapStateToProps, mapDispatchToProps)(Item);

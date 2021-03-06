import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as cataloguActions from "../actions/catalogue";
import * as cartActions from "../actions/cart";
import { box } from "../style/zen";

export const Item = ({ itemData, itemIsLoading, itemError, onGetItem, onAddItemToCart }) => {
  const { id } = useParams();
  const itemId = id;
  const history = useHistory();
  console.log("PARAM ID: ", itemId);
  useEffect(() => {
    Object.keys(itemData).length < 1 && onGetItem(itemId);
  }, []);
  const [model, setModel] = useState({
    itemId: itemId,
    quantity: "",
    currSizes: [],
    useFF: 0
  });
  useEffect(() => {
    !itemIsLoading &&
      Object.keys(itemData).length > 0 &&
      setModel({
        ...model,
        useFF: model.useFF + 1,
        price: itemData.price,
        currSizes: itemData.sizes.filter(({ avalible }) => avalible == true),
        art: itemData.sku || "",
        currMan: itemData.manufacturer || "",
        currColor: itemData.color || "",
        currMat: itemData.material || "",
        currSeason: itemData.season || "",
        currReason: itemData.reason || "",
        size: "",
        quantity: 0,
        image: itemData.images && itemData.images[0],
        orderBtnEnabled: false,
        order: []
      });
  }, [itemIsLoading]);
  const { currSizes, size, quantity, image, order, orderBtnEnabled, price, art, currMan, currColor, currMat, currSeason, currReason } = model;
  console.log("STATE INSIDE ITEM COMPONENT: ", itemData);
  const onAddItemToOrder = theSize => {
    setModel({
      ...model,
      size: theSize.size
    });
  };
  const Model = () => (
    <>
    {/*div>model:{JSON.stringify(model)}</div>*/}
      <div style={box}>{JSON.stringify(itemData)}</div>
      <img src={image} alt={image}/>
      <div>
        <div>articul:{art}</div>
        <div>manufacturer:{currMan}</div>
        <div>color:{currColor}</div>
        <div>material:{currMat}</div>
        <div>season:{currSeason}</div>
        <div>reason:{currReason}</div>
      </div>
    </>
  );
  const SizeButton = () => (
    <div>
      sizes:
      {itemIsLoading ? (
        <div>...item is loading</div>
      ) : (
        currSizes &&
        currSizes.map(e => (
          <button
            onClick={() => onAddItemToOrder(e)}
            style={{ background: e.size === size && "lightGrey" }}
          >
            {e.size}
          </button>
        ))
      )}
    </div>
  );
  const MinusButton = () => (
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
  );
  const PlusButton = () => (
    <button
      onClick={() =>
        setModel({ ...model, quantity: quantity === 10 ? 10 : quantity + 1 })
      }
    >
      +
    </button>
  );
  const SizesPanel = () => (
    <div>
      quantity:
      <MinusButton />
      {quantity}
      <PlusButton />
    </div>
  );
  const OrderButton = () => (
    <div>
      {currSizes.length > 0 && (
        <button
          disabled={!(quantity > 0 && size !== "" && currSizes.length > 0)}
          onClick={() => {
            console.log({id:itemId,quantity:quantity,size:size});
            onAddItemToCart({id:itemId,quantity:quantity,size:size, price:price});
            history.push("/cart.html")
          }}
        >
          do order
        </button>
      )}
    </div>
  );

  return (
    <div>
      {itemIsLoading ? (
        <div>...item is loading</div>
      ) : (
        <div>
        {/*<h4>item</h4>*/}
          <Model />
          <SizeButton />
          {currSizes.length > 0 && (
            <div>
              <SizesPanel />
              <OrderButton />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  itemData: state.catalogue.item,
  itemIsLoading: state.catalogue.itemIsLoading,
  itemError: state.catalogue.itemError
});
const mapDispatchToProps = dispatch => ({
  onGetItem: itemId => dispatch(cataloguActions.getItem(itemId)),
  onAddItemToCart: item =>
    dispatch(cartActions.addItemToCart(item))
});
export default connect(mapStateToProps, mapDispatchToProps)(Item);

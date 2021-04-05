import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as cataloguActions from "../actions/catalogue";
import * as cartActions from "../actions/cart";
import { box, boxRow } from "../style/zen";
const errorImg = "https://populus.ru/wp-content/uploads/2019/11/no-image-500x500.jpg";


export const Item = ({ itemData, itemIsLoading, itemError, onGetItem, onAddItemToCart }) => {
  const { id } = useParams();
  const itemId = id;
  const history = useHistory();
  console.log("PARAM ID: ", itemId);
  //useEffect(() => {
  //  Object.keys(itemData).length < 1 && onGetItem(itemId);
  //}, []);
  const [model, setModel] = useState({
    itemId: itemId,
    quantity: "",
    currSizes: [],
    useFF: 0
  });
  console.log("itemData.id === itemId: ", itemData.idi === itemId);
  useEffect(() => {
    console.log("HOOK IS TRIGGERED ON itemId change");
    //Object.keys(itemData).length < 1 
    //&& itemData.id !== itemId
    /*&&*/ onGetItem(itemId);
  }, [itemId]);

  useEffect(() => {
    !itemIsLoading &&
      Object.keys(itemData).length > 0 &&
      setModel({
        ...model,
        title: itemData.title,
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
  const { currSizes, size, quantity, image, title, orderBtnEnabled, price, art, currMan, currColor, currMat, currSeason, currReason } = model;
  console.log("STATE INSIDE ITEM COMPONENT: ", itemData);
  const onAddItemToOrder = theSize => {
    setModel({
      ...model,
      size: theSize.size
    });
  };
  const OrderImage = () =>
      <div style={{...box,width:"50vw"}}>
        <img
          style={{width:"30vw", height:"100%"}}
          src={image} 
          alt={image}
          onError={(e)=>
            {
              e.target.onerror = null; 
              e.target.src=errorImg;
            }
          }
        />
      </div>
  const OrderInfo = () => {
    const cellStyle = {border:"1px solid grey", margin:0, padding:10};
    const orderData = {
      articul: art,
      manufacturer: currMan,
      color: currColor,
      material: currMat,
      season: currSeason,
      reason: currReason
    };
      return (
      <div style={{
        ...box, 
        flexDirection:"column",
        width:"100%",
        height:"100%"
      }}>
      <table style={{border:"1px solid grey", width:"100%", borderCollapse:"collapse"}}>
        {Object.entries(orderData).map(param => (
          <tr>
            <td style={cellStyle}>{param[0]}</td>
            <td style={cellStyle}>{[param[1]]}</td>
          </tr>
        ))}
      </table>
      </div>
      );
  }
  const SizeButton = () => (
    <div style={{...box}}>
      Размеры в наличии:
      {itemIsLoading ? (
        <div>...item is loading</div>
      ) : (
        currSizes &&
        currSizes.map(e => (
          <div
            onClick={() => onAddItemToOrder(e)}
            style={{ background: e.size === size && "lightGrey" }}
          >
            <h4>{e.size}</h4>
          </div>
        ))
      )}
    </div>
  );
  const SizesPanel = () => {
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
    return (
    <div style={{...box, width:"100%"}}>
        Количество:
      <div style={{
        ...box, 
        border:"1px solid grey", 
      }}>
        <MinusButton />
        <span style={{padding:"0 5px"}}>
          {quantity}
        </span>
        <PlusButton />
      </div>
    </div>
    );
  };
  const OrderButton = () => (
    <div>
      {currSizes.length > 0 && (
        <button
          style={{width:"100%", padding:"1vw", background:"LightCoral",color:"white", border:"1px"}}
          disabled={!(quantity > 0 && size !== "" && currSizes.length > 0)}
          onClick={() => {
            console.log({id:itemId,quantity:quantity,size:size});
            onAddItemToCart({id:itemId,quantity:quantity,size:size, price:price});
            history.push("/cart")
          }}
        >
          В корзину
        </button>
      )}
    </div>
  );

  const OrderControl = () => 
        <div style={{...box, width:"100%", flexDirection:"column"}}>
          <SizeButton />
          {currSizes.length > 0 && (
            <div>
              <SizesPanel />
              <OrderButton />
            </div>
          )}
        </div>
  const OrderBar = () =>
        <div style={{...box, height:"100%",width:"50%", flexDirection:"column"}}>
          <OrderInfo/>
          <OrderControl/>
        </div>
  const ModelCard = () => (
    <div style={{...box, width:"100%", flexDirection:"column"}}>
        <div>
          <h2>{title}</h2>
        </div>
        <div style={{...box, width:"100%"}}>
          <OrderImage/>
          <OrderBar/>
        </div>
    </div>
  );
  return (
    itemIsLoading 
        ? <div>...item is loading</div>
        : <ModelCard />
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

import React,{ useState, useEffect } from "react";
import {useLocation, useHistory} from "react-router-dom";
//import Categories from "./Categories.jsx";
import {connect} from "react-redux";
import * as catalogueActions from "../actions/catalogue.js";
import {Card} from "../style/beauty.js";
import {box, boxRow} from "../style/zen.js";
import Search from "./Search.jsx";
const errorImg = "https://populus.ru/wp-content/uploads/2019/11/no-image-500x500.jpg";

  export const ItemCard = ({data:{title,price, images, id}}) => {
    const history = useHistory();
    return (
    <Card>
      <div style={{...box, height:"80%",objectFit:"contain"}}>
        <img 
          src={images[0]} 
          alt={images[0]} 
          style={{
            display:"inline-block", 
            width:"100%",
            height:"100%",
            objectFit:"contain", 
            overflow:"hide"
          }}
          onError={(e)=> { 
            e.target.onerror = null; 
            e.target.src=errorImg
          }}
        />
      </div>
      <div>
        <div style={{...box,padding:"5px"}}>{title}</div>
        <div style={{...box,padding:"5px"}}>{price}</div>
        <div style={{...box,padding:"5px"}} 
          onClick={() => history.push(`catalog/${id}`)}>Заказать
        </div>
      </div>
    </Card>
    );
};

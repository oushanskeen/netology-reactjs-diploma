import catalogue from "./catalogue";
import { formatParams } from "../utils/formatParams";
//console.log("Catalogue: ");
/*const categories = [
  { id: 11, name: "All" },
  { id: 12, name: "Men" },
  { id: 13, name: "Women" },
  { id: 14, name: "Unisex" }
];*/
const initState = {
  categories: ["All"]/*categories*/,
  category: {id:11,title:"All"},
  offset: 0,
  isLoading: false,
  error: "",
  url: "http://localhost:7070/api/items",
  items: [],
  item:{},
  itemIsLoading:false,
  itemError:"",
  query: "",
  upload:[]
};

export default function (state = initState, action){
  const { /*categories,*/ category, offset, /*isLoadingx/,  error, url*/ items } = state;
  const { type, payload } = action;
  switch (type) {
    case "GET_CATEGORIES_SUCCEED":
      console.log("GET_CATEGORIES_SUCCEED with data: ", payload)
      return { ...state, categories: [{id:11,title:"All"}, ...payload] };
    case "GET_ITEMS_STARTED":
      console.log("GET_STARTED_STARTED REDUCER TRIGGERED");
      return {...state ,isLoading:true};
    case "GET_ITEMS_SUCCEED":
      console.log("GET_ITEMS_SUCCEED REDUCER TRIGGERED with items: ", payload);
      return {...state,isLoading:false, error:"", items: 
        !(offset > 0) ? [...payload] : [...items,payload.length > 0 && payload].filter(e => e !== false),
        upload:payload
      }
      /*
      return { ...state, items:
        items.length < 1 || 
        (payload[0] === items[0])
        ? [...payload] : [...items,...payload]
      };
      */
    case "GET_ITEM_STARTED":
      console.log("GET_ITEM_STARTED with data: ", payload)
      return { ...state, itemIsLoading: true, item:{}, itemError:""};
    case "GET_ITEM_FAILED":
      return {...state , itemIsLoading:false, item:{}, itemError:"" };
    case "GET_ITEM_SUCCEED":
      console.log("GET_ITEM_SUCCEED REDUCER TRIGGERED with items: ", payload);
      return {...state,itemIsLoading:false, itemError:"", item: payload}; 
    case "CHOOSE_CATEGORY":
      const onChooseCatState = {
        ...state,
        offset: category === payload ? offset : 0,
        category: payload
      };
      console.log("onChooseCatState: ", onChooseCatState);
      const onChooseCatUrl = formatParams({ ...onChooseCatState });
      console.log("onChooseCatUrl: ", onChooseCatUrl);
      return { ...onChooseCatState, url: "http://localhost:7070/api/items" + onChooseCatUrl };
    case "MORE_ITEMS":
      const onMoreItemsState = { ...state, offset: offset + 6 };
      const onMoreItemsUrl = formatParams({ ...onMoreItemsState });
      return { ...onMoreItemsState, url: "http://localhost:7070/api/items" + onMoreItemsUrl };
    case "MAKE_QUERY":
      const onMakeQueryState = {...state,query:payload};
      const onMakeQueryUrl = formatParams({...onMakeQueryState});
      return {...onMakeQueryState,url:"http://localhost:7070/api/items"+onMakeQueryUrl};
    default:
      console.log("DEFAULT CATALGUE STATE SHOULD BE TRIGGERED");
      return {...state};
  }
};


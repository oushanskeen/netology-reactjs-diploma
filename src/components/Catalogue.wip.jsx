import { useState, useEffect } from "react";
import CategoriesBar from "./Categories.jsx";

export const Catalogue = () => {
  const root = "http://localhost:7070/api/";
  const [state, setState] = useState({
    items: [],
    categories: [],
    offset: 6,
    category: "",
    query: "",
    request: ""
  });
  const { items, categories, offset, category, query } = state;
  console.log("STATE IN CATALOGUE: ", state);

  useEffect(() => dispatch("FETCH_CATEGORIES"),[]);
  //const handleFetchItems = () =>
  //  fetch("http://localhost:7070/api/items")
  //    .then(res => res.json())
  //    .then(data => setState({ ...state, items: [...data], category: "All" }));
  //const handleFetchCategories = () =>
  //  fetch("http://localhost:7070/api/categories")
  //    .then(res => res.json())
  //    .then(data =>
  //      setState({ ...state, categories: [...data, { id: 11, title: "All" }] })
  //    );
  const handleLoadMore = () =>
    fetch(`http://localhost:7070/api/items?offset=${offset}`)
      .then(res => res.json())
      .then(data =>
        setState({ ...state, items: [...items, ...data], offset: offset + 6 })
      );
  const handleCategoryClick = (id, title) =>
    fetch(`http://localhost:7070/api/items?categoryId=${id}&offset=6`)
      .then(res => res.json())
      .then(data => setState({ ...state, category: title, items: [...data] }));
  const categoriesAcc = () => Object.entries(categories).map(e => e[1]);
  //  console.log("Categories acc: ", categoriesAcc().map(e => e.title));
  const dispatch = (msg, pld) => {
    const extractId = (givenTitle) => 
      categories.filter(e => e.title === givenTitle)[0].id;
    const countOffset = (category, title, offset) =>
      category === title ? offset + 6 : 6;
    switch (msg) {
      case "FETCH_ITEMS":
        fetch(root + "items")
          .then(res => res.json())
          .then(data =>
            setState({ 
              ...state, 
              items: [...data], 
              category: "All"
            })
          );
        return;
      case "FETCH_CATEGORIES":
        fetch(root + "categories")
          .then(res => res.json())
          .then(data =>
            setState({
              ...state,
              categories: [...data]
            })
          );
        return;
      case "FETCH_CATEGORY":
        fetch(root + `items?categoryId=${extractId(pld)}&offset=6`)
          .then(res => res.json())
          .then(data =>
            setState({ 
              ...state, 
              items: [...data],
              category: pld
            })
          );
        return;
      case "FETCH_MORE":
        category === "All"
        ? dispatch("FETCH_MORE_FROM_ALL")
        : dispatch(
            "FETCH_MORE_FROM_CATEGORY",
            {id:extractId(category),title:category}
          );
        return;
      case "FETCH_MORE_FROM_ALL":
        fetch(root + `items?offset=${countOffset(category, "All", offset)}`)
        .then(res => res.json())
        .then(data =>
          setState({ ...state, items: [...data]})
        );
        return;
      case "FETCH_MORE_FROM_CATEGORY":
        fetch(root + `items?categoryId=${category.id}&offset=
          ${countOffset(category.title, offset)}`)
          .then(res => res.json())
          .then(data =>
            setState({ ...state, items: [...data]})
          );
        return;
      case "FIND_IN_ALL":

      case "FIND_IN_CATEGORY":
      case "LOAD":
        pld.title === "All"
          ? fetch(`http://localhost:7070/api/items`)
              .then(res => res.json())
              .then(data =>
                setState({ ...state, items: [...data], category: "All" })
              )
          : fetch(
              "http://localhost:7070/api/items?categoryId=" +
                pld.id +
                "&offset=6" +
                (query.length > 0 ? `&q=${query}` : "")
            )
              .then(res => res.json())
              .then(data =>
                setState({ ...state, category: pld.title, items: [...data] })
              );
        return;
      case "MORE":
        pld.title === "All"
          ? fetch(`http://localhost:7070/api/items?offset=
              ${countOffset(category, "All", offset)}`)
              .then(res => res.json())
              .then(data =>
                setState({ ...state, items: [...data], category: "All" })
              )
          : fetch(`http://localhost:7070/api/items?categoryId=${pld.id}&offset=
              ${countOffset(category, pld.title, offset)}`)
              .then(res => res.json())
              .then(data =>
                setState({ ...state, items: [...data], category: pld.title })
              );
        return;
      case "SEARCH":
        dispatch("LOAD", { title: category, query: query });
        return;
      default:
        return;
    }
  };
  return (
    <div>
      {" "}
      <CategoriesBar />
      CATEGORY: {category}
      <br />
      OFFSET: {offset}
      <br />
      QUERY: {query}
      <br />{" "}
      <div>
        <button onClick={() => dispatch("FETCH_CATEGORIES")}>
          fetch categories
        </button>
        categories
        <br />
        CATEGORY SELECTED:{category}
        <br />
        {JSON.stringify({ ...categories })}
        {categoriesAcc().map(({ id, title }) => (
          <button
            onClick={() => dispatch("FETCH_CATEGORY", title)}
          >
            {id}
            {title}
          </button>
        ))}
      </div>
      <div onClick={() => dispatch("FETCH_ITEMS")}>
        <form>
          <label>SEARCH:</label>
          <input
            value={query}
            onChange={e => setState({ ...state, query: e.target.value })}
          />
          <button
            onClick={e => {
              e.preventDefault();
              dispatch("SEARCH");
            }}
          >
            send
          </button>
        </form>
        catalogue
        <br />
        {JSON.stringify(items)}
      </div>
      <div>
        <button onClick={() => dispatch("FETCH_MORE")}>load more ...</button>
      </div>
    </div>
  );
};

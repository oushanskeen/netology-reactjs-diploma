import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import  Catalogue  from "./components/Catalogue.jsx";
import { MainFrame } from "./components/MainFrame";
import { Info } from "./components/Info";
import { Main } from "./components/Main";
import { FourOwFour } from "./components/FourOwFour";
import { About } from "./components/About";
import Item from "./components/Item";
import Cart from "./components/Cart";

function App() {
  // root is left here for the sake of using on gh-pages
  //const root = "netology-reactjs-diploma";
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={`/`}>
            <MainFrame kid={<Main />} />
          </Route>
          <Route exact path={`/catalog`}>
            <MainFrame kid={<Catalogue />} />
          </Route>
          <Route exact path="/catalog/:id">
            <MainFrame kid={<Item />} />
          </Route>
          <Route exact path={`/info`}>
            <MainFrame kid={<Info />} />
          </Route>
          <Route exact path={`/about`}>
            <MainFrame kid={<About />} />
          </Route>
          <Route exact path={`/contacts`}>
            <MainFrame kid={<div>contacts</div>} />
          </Route>
          <Route exact path={`/cart`}>
            <MainFrame kid={<Cart />} />
          </Route>
          <Route>
            <MainFrame kid={<FourOwFour />} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

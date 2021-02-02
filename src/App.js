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
import { Basket } from "./components/Basket";
import { Main } from "./components/Main";
import { FourOwFour } from "./components/FourOwFour";
import { About } from "./components/About";
import Item from "./components/Item";

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
          <Route exact path={`/catalog.html`}>
            <MainFrame kid={<Catalogue />} />
          </Route>
          <Route exact path="/catalog.html/:id">
            <MainFrame kid={<Item />} />
          </Route>
          <Route exact path={`/info`}>
            <MainFrame kid={<Info />} />
          </Route>
          <Route exact path={`/basket`}>
            <MainFrame kid={<Basket />} />
          </Route>
          <Route exact path={`/404`}>
            <MainFrame kid={<FourOwFour />} />
          </Route>
          <Route exact path={`/about.html`}>
            <MainFrame kid={<About />} />
          </Route>
          <Route exact path={`/contacts.html`}>
            <MainFrame kid={<div>contacts</div>} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

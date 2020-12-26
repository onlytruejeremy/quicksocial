import React from "react";
import "./styles.css";

import { Switch, Route } from "react-router-dom";
import Register from "./components/signup/Register";
import NavBar from "./components/nav/NavBar";
import Main from "./components/main/Main";
import TopNews from "./components/news/TopNews";
import Account from "./components/profile/Account";
export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/news">
          <TopNews />
        </Route>
        <Route path="/profile">
          <p>Profile Page Not Ready Yet</p>
        </Route>
        <Route path="/login" exact>
          <Register />
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

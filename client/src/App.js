import React from "react";
import "./styles.css";
import { Switch, Route } from "react-router-dom";
import Register from "./components/signup/Register";
import NavBar from "./components/nav/NavBar";
import Main from "./components/main/Main";
import TopNews from "./components/news/TopNews";
import Account from "./components/profile/Account";
import * as userService from "./services/users";
import PrivateRoute from "./context/PrivateRoute";
import Profile from "./components/profile/Profile";
import AllPosts from "./components/posts/AllPosts";
export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
        <PrivateRoute path="/news" component={TopNews}></PrivateRoute>
        <PrivateRoute path="/account" component={Account}></PrivateRoute>
        <PrivateRoute path="/posts" component={AllPosts}></PrivateRoute>
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

import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import PostSuccess from "./PostSuccess";
import Post from "./Post";
import Footer from "./Footer";
import MapPosts from "./MapPosts";
import Profile from "./Profile";
import WatchPost from "./WatchPost";
import { useStateValue } from "./StateProvider";

import { db, auth } from "./firebase";
import logo from "./assets/logoHeader.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Input } from "@material-ui/core";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/post/success">
            <Header />
            <PostSuccess />
            <Footer />
          </Route>

          <Route path="/post/:postid">
            <Header />
            <WatchPost />
            <Footer />
          </Route>

          <Route path="/post">
            <Header />
            <Post />
          </Route>

          <Route path="/profile">
            <Header />
            <Profile />
            <Footer currentPath="profile" />
          </Route>

          <Route path="/">
            <Header />
            <MapPosts />
            <Footer currentPath="home" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

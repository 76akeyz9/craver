import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import PostSuccess from "./PostSuccess";
import Post from "./Post";
import Footer from "./Footer";
import MapPosts from "./MapPosts";
import Profile from "./Profile";
import WatchPost from "./WatchPost";
import { useStateValue } from "./StateProvider";

import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the User just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

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

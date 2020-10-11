import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import PostSuccess from "./PostSuccess";
import Post from "./Post";
import Footer from "./Footer";
import MapPosts from "./MapPosts";
import WatchPost from "./WatchPost";
import { useStateValue } from "./StateProvider";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/Theme";

import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BuyButton from "./BuyButton";
import Order from "./Order";
import Setting from "./Setting";
import Profile from "./components/Profile";

function App() {
  const [{}, dispatch] = useStateValue();
  var name, email, photoUrl, uid, emailVerified;

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("User from App.js >>> ", authUser);
      if (authUser) {
        // the User just logged in / the user was logged in

        name = authUser.displayName;
        email = authUser.email;
        photoUrl = authUser.photoURL;
        emailVerified = authUser.emailVerified;
        uid = authUser.uid;

        dispatch({
          type: "SET_USER",
          user: {
            name: name,
            email: email,
            photoUrl: photoUrl,
            emailVerified: emailVerified,
            uid: uid,
          },
          // user: authUser,
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
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>

        <Switch>
          <Route path="/post/success">
            <ThemeProvider theme={theme}>
              <PostSuccess />
              <Footer />
            </ThemeProvider>
          </Route>

          <Route path="/post/:postid">
            <ThemeProvider theme={theme}>
              <WatchPost />
            </ThemeProvider>
          </Route>

          <Route path="/order">
            <Order />
          </Route>

          <Route path="/post">
            <Post />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/setting">
            <Setting />
          </Route>

          <Route path="/">
            <ThemeProvider theme={theme}>
              <MapPosts />
              <Footer currentPath="home" />
            </ThemeProvider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

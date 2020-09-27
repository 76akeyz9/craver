import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import logo from "./assets/logoHeader.png";
import { Button, CssBaseline, Input } from "@material-ui/core";
import "./Header.css";
import { auth } from "./firebase";
import { fade, makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/Theme";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const signUp = (event) => {
    console.log("This is OK");
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in...
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  const bodySignup = (
    <div style={modalStyle} className={classes.paper}>
      <form className="app__signup">
        <center>
          <img src={logo} alt="" height="32px" />
        </center>

        <Input
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signUp}>
          Sign Up
        </Button>
      </form>
    </div>
  );

  const bodySignIn = (
    <div style={modalStyle} className={classes.paper}>
      <form className="app__signup">
        <center>
          <img src={logo} alt="" height="32px" />
        </center>

        <Input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signIn}>
          Sign In
        </Button>
      </form>
    </div>
  );

  // To hide to App bar
  function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };

  return (
    <div className="header">
      <Modal open={open} onClose={() => setOpen(false)}>
        {bodySignup}
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        {bodySignIn}
      </Modal>

      <React.Fragment>
        <CssBaseline />
        {/* <HideOnScroll {...props}> */}
        <div className={classes.root}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Link to="/" className={classes.title}>
                <div className="header__image__div">
                  <img className="header__image" src={logo} alt="" />
                </div>
              </Link>
              <Button color="inherit">
                <div className="header__signs__div">
                  {user ? (
                    <div
                      className="header__each"
                      type="button"
                      onClick={() => auth.signOut()}
                    >
                      Logout
                    </div>
                  ) : (
                    <div className="header__signs">
                      <div
                        className="header__each header__signin"
                        type="button"
                        onClick={() => setOpenSignIn(true)}
                      >
                        Sign In
                      </div>
                      <div
                        className="header__each"
                        type="button"
                        onClick={() => setOpen(true)}
                      >
                        Sign Up
                      </div>
                    </div>
                  )}
                </div>
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        {/* </HideOnScroll> */}
      </React.Fragment>
    </div>
  );
}

export default Header;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import logo from "./assets/logoHeader.png";
import { Button, Input } from '@material-ui/core';
import "./Header.css";
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Header(){
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
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        //user has logged in...
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    })

    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  const bodySignup = (
    <div style={modalStyle} className={classes.paper}>
      <form className="app__signup">
        <center>
          <img
            src={logo}
            alt=""
            height="32px"
          />
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
        <Button type="submit" onClick={signUp}>Sign Up</Button>

      </form>
    </div>
  );

  const bodySignIn = (
    <div style={modalStyle} className={classes.paper}>
      <form className="app__signup">
        <center>
          <img
            src={logo}
            alt=""
            height="32px"
          />
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
        <Button type="submit" onClick={signIn}>Sign In</Button>

      </form>
    </div>
  );

  return(
    <div className="app__header">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        >
        {bodySignup}
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        >
        {bodySignIn}
      </Modal>

      <Link to="/">
        <IconButton>
          <img
            className="app__headerImage"
            src={logo}
            alt=""
          />
        </IconButton>
      </Link>

      <div>
      {user ? (
          <IconButton type="button" onClick={() => auth.signOut()}>Logout</IconButton>
      ):(
        <div className="loginContainer">
          <IconButton type="button" onClick={() => setOpenSignIn(true)}>Sign In</IconButton>
          <IconButton type="button" onClick={() => setOpen(true)}>Sign Up</IconButton>
        </div>
      )}
      </div>
    </div>
  )
}

export default Header;

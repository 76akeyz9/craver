import React from 'react';
import "./Footer.css";
import IconButton from "@material-ui/core/IconButton";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Footer({currentPath}) {
  const isHome = currentPath === "home";
  const isAdd = currentPath ==="add";
  const isProfile = currentPath ==="profile";

  return (
    <div className="footer">
      <Link to="/">
        <IconButton className={isHome ? "footer__home__true" : "footer__home"}>
          <HomeOutlinedIcon fontSize="large" />
        </IconButton>
      </Link>

      <Link to="/post">
        <IconButton className={isAdd ? "footer__add__true" : "footer__add"}>
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </Link>

      <Link to="/profile">
        <IconButton className={isProfile ? "footer__profile__true" : "footer__profile"}>
          <PersonOutlineIcon fontSize="large" />
        </IconButton>
      </Link>
    </div>
  )
}


export default Footer;

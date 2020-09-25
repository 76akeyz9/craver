import React, { useEffect, useState } from "react";
import "./Footer.css";
import IconButton from "@material-ui/core/IconButton";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Link } from "react-router-dom";

function Footer({ currentPath }) {
  const isHome = currentPath === "home";
  const isAdd = currentPath === "add";
  const isProfile = currentPath === "profile";
  
  // const footer = document.getElementById("footer");
  // let pos = 0;
  // let prevPos = 0;
  // let scrollDown = false;

  // window.addEventListener("scroll", () => {
  //   prevPos = pos;
  //   pos = window.scrollY;
  //   if (pos > prevPos) {
  //     scrollDown = true;
  //     //  footer.classList.add("footer--unpinned");
  //   } else {
  //     scrollDown = false;
  //     // footer.classList.remove("footer--unpinned");
  //   }
  // });

  return (
    <div id="footer" className="footer">
      <Link to="/">
        <IconButton>
          <HomeOutlinedIcon
            className={isHome ? "footer__home__true" : "footer__home"}
          />
        </IconButton>
      </Link>

      <Link to="/post">
        <IconButton>
          <AddCircleOutlineIcon
            fclassName={isAdd ? "footer__add__true" : "footer__add"}
          />
        </IconButton>
      </Link>

      <Link to="/profile">
        <IconButton>
          <PersonOutlineIcon
            className={isProfile ? "footer__profile__true" : "footer__profile"}
          />
        </IconButton>
      </Link>
    </div>
  );
}

export default Footer;

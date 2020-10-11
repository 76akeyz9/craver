import React, { useEffect, useState } from "react";
import "./Footer.css";
import IconButton from "@material-ui/core/IconButton";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Link } from "react-router-dom";
import { AppBar, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import PersonIcon from "@material-ui/icons/Person";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import theme from "./ui/Theme";

function Footer({ currentPath, props }) {
  const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: "auto",
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: "0 auto",
    },
  }));
  const classes = useStyles();

  function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
      <Slide appear={false} direction="up" in={!trigger}>
        {children}
      </Slide>
    );
  }

  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };

  // for More Icon
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // For More Icon Ends

  return (
    <div id="footer" className="footer">
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HideOnScroll {...props}>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
              <Toolbar>
                <Link to="/" className="textDecoration">
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                  >
                    <HomeOutlinedIcon />
                  </IconButton>
                </Link>
                <Link to="/post" className="textDecoration">
                  <Fab
                    color="secondary"
                    aria-label="add"
                    className={classes.fabButton}
                  >
                    <AddIcon />
                  </Fab>
                </Link>

                <div className={classes.grow} />
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
                <Link to="/setting" className="textDecoration">
                  <IconButton edge="end" color="inherit">
                    <PersonIcon />
                  </IconButton>
                </Link>
              </Toolbar>
            </AppBar>
          </HideOnScroll>
        </ThemeProvider>
      </React.Fragment>

      {/* 
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
      </Link> */}
    </div>
  );
}

export default Footer;

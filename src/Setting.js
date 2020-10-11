import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function Setting() {
  const classes = useStyles();

  return (
    <div className="setting">
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItemLink href="/profile">
          <ListItemText primary="Edit Profile" />
        </ListItemLink>
        <ListItem button>
          <ListItemText primary="Referral" />
        </ListItem>
      </List>
    </div>
  );
}

export default Setting;

import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./MapPost.css"

function MapPost({ id, post }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: "#f56a79",
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Card className="mapPost__card">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />

        <Link to={`/post/${id}`}>
          <CardMedia
            className={classes.media}
            image={post.imageUrl}
            title="Paella dish"
            key={id}
          />
        </Link>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.caption}
            {/* This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like. */}
          </Typography>
        </CardContent>

        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </Card>

      {/*Previous Version of posts, have changed already  */}
      {/* <div className="showPost">
        <Link to={`/post/${id}`}>
          <div key={id} className="mapPosts__eachPost">
            <img className="mapPost__image" src={post.imageUrl} />
            {post.caption}
          </div>
        </Link>
      </div> */}
    </div>
  );
}

export default MapPost;

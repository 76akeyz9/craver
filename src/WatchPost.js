import React, { useState, useEffect } from "react";
import BuyButton from "./BuyButton";
import { db } from "./firebase";
import Avatar from "@material-ui/core/Avatar";
import "./WatchPost.css";
import { Typography } from "@material-ui/core";

function WatchPost() {
  const url = window.location.href.split("post/")[1];
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [timeStamp, setTimeStamp] = useState("");

  useEffect(() => {
    const docRef = db.collection("posts").doc(url);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("DocumentData is >>>", doc.data());
          setImageUrl(doc.data().imageUrl);
          setCaption(doc.data().caption);
          setTimeStamp(doc.data().timeStamp);
        } else {
          console.log("No Document Match!");
        }
      })
      .catch(function (error) {
        console.log("Error Getting Document:", error);
      });
  }, []);

  return (
    <div className="watchPost">
      <div className="watchPost__sticky">
        <img className="watchPost__image" src={imageUrl} />
        <div className="watchPost__user">
          <Avatar className="watchPost__avatar" alt="" src />
          <div className="watchPost__username">きいち</div>
          <div className="watchPost__follow">Follow</div>
        </div>
      </div>
      <Typography variant="body2" color="textSecondary" component="p">
        <div className="watchPost__caption">{caption}</div>
      </Typography>
      <div className="adjustment"></div>

      <div className="watchPost__footer">
        <BuyButton
          id={url}
          title="TEST"
          price={5000.0}
          image={imageUrl}
          rating={5}
        />
      </div>
    </div>
  );
}

export default WatchPost;

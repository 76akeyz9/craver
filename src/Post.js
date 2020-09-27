import React, { useState } from "react";
import "./Post.css";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import Avatar from "@material-ui/core/Avatar";
import firebase from "firebase";
import { storage, db } from "./firebase";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

function Post() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },

      (error) => {
        // error function ....
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              // To sort posts by uploaded date and time, not by rundom.
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              // username: user.displayName
            });

            setCaption("");
            setImage(null);
          });
      }
    );
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      // width: '25ch',
    },
  }));
  const classes = useStyles();

  const handleChangeText = (event) => {
    setCaption(event.target.value);
  };

  return (
    <div>

      <div className="postStory__head">
        <Avatar className="postStory__avatar" alt="" />
        <div className="postStory__avatar__name">
          <h2>Kiichi Okawa</h2>
        </div>
      </div>

      <div className={classes.root}>
        <TextField
          className="post__caption"
          id="outlined-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChangeText}
          value={caption}
        />
      </div>
      <div className={classes.root}>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={5}
          defaultValue="Default Value"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
        />
      </div>

      <label>
        <CropOriginalIcon className="postStory__imageIcon" />
        <input
          className="postStory__input__file"
          type="file"
          onChange={handleChange}
        />
      </label>

      <Link to="post/success">
        <button className="postStory__button" onClick={handleUpload}>
          投稿する
        </button>
      </Link>

      {/* <textarea
        className="postStory__caption"
        type="text"
        placeholder="商品の説明を追加してください"
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      ></textarea> */}
    </div>
  );
}

export default Post;

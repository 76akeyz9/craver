import React, { useState } from "react";
import "./Post.css";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import Avatar from "@material-ui/core/Avatar";
import firebase from "firebase";
import { storage, db } from "./firebase";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
// * The example data is structured as follows:
import image1 from "./assets/fujii878_1.jpg";
import image2 from "./assets/fujii878_2.jpg";
import image3 from "./assets/fujii878_3.jpg";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

function Post() {
  const [title, setTitle] = useState("");
  const [firstUsage, setFirstUsage] = useState("");
  const [caption, setCaption] = useState("");
  const [howToUse, setHowToUse] = useState("");

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
    root__button: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      // width: '25ch',
    },
    gridList__root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    root__camera: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  }));
  const classes = useStyles();
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeFirstUsage = (event) => {
    setFirstUsage(event.target.value);
  };
  const handleChangeCaption = (event) => {
    setCaption(event.target.value);
  };
  const handleChangeHowToUse = (event) => {
    setHowToUse(event.target.value);
  };
  const tileData = [
    {
      img: image1,
      title: "Test1",
      author: "author",
    },
    {
      img: image2,
      title: "Test2",
      author: "author",
    },
    {
      img: image3,
      title: "Test3",
      author: "author",
    },
  ];

  return (
    <div>
      <div className={classes.gridList__root}>
        <GridList className={classes.gridList} cols={2.5}>
          {tileData.map((tile) => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              ></GridListTileBar>
            </GridListTile>
          ))}
        </GridList>
      </div>

      {/* <label>
        <CropOriginalIcon className="postStory__imageIcon" />
        <input
          className="postStory__input__file"
          type="file"
          onChange={handleChange}
        />
      </label> */}

      <div className={classes.root__camera}>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </div>

      {/* <div className="postStory__head">
        <Avatar className="postStory__avatar" alt="" />
        <div className="postStory__avatar__name">
          <h2>Kiichi Okawa</h2>
        </div>
      </div> */}

      <div className={classes.root}>
        <TextField
          className="post__caption"
          id="outlined-full-width"
          label="紹介タイトル"
          style={{ margin: 8 }}
          placeholder="どんな商品をオススメしたいですか？"
          helperText="   "
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChangeTitle}
          value={title}
        />
      </div>

      <div className={classes.root}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={3}
          defaultValue="Default Value"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          label="きっかけ"
          placeholder="この商品に出会ったきっかけは？"
          onChange={handleChangeFirstUsage}
          value={firstUsage}
        />
      </div>
      <div className="post__adjust"></div>

      <div className={classes.root}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={3}
          defaultValue="Default Value"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          label="好きなポイント"
          placeholder="この商品のどんなところが好きですか？"
          onChange={handleChangeCaption}
          value={caption}
        />
      </div>
      <div className="post__adjust"></div>

      <div className={classes.root}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={3}
          defaultValue="Default Value"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          label="使い方"
          placeholder="オススメの使い方はありますか？"
          onChange={handleChangeHowToUse}
          value={howToUse}
        />
      </div>

      <Link
        to="post/success"
        style={{ textDecoration: "none" }}
        className="post__button"
      >
        <div className={classes.root__button}>
          <Button variant="contained" color="primary" onClick={handleUpload}>
            投稿する
          </Button>
        </div>
      </Link>

      {/* <Link to="post/success">
        <button className="postStory__button" onClick={handleUpload}>
          投稿する
        </button>
      </Link> */}

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

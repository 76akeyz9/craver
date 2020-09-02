import React, { useState, useEffect} from 'react';
import "./Post.css";
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import Avatar from "@material-ui/core/Avatar";
import firebase from "firebase";
import { storage, db, auth} from "./firebase";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Post() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);

    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on('state_changed',
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
      () =>{
        // complete function ....
        storage
        .ref('images')
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          db.collection("posts").add({
            // To sort posts by uploaded date and time, not by rundom.
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            // username: user.displayName
          });

          setCaption("");
          setImage(null);
        })

      }
    );
  };

  return (
    <div className="postStory">
      <div className="postStory__head">
        <Avatar className="postStory__avatar" alt="" />
        <div className="postStory__avatar__name">
          <h2>Kiichi Okawa</h2>
        </div>
      </div>


      <h4>説明を追加   </h4>

      <textarea
        className="postStory__caption"
        type="text"
        placeholder='商品の説明を追加してください'
        value={caption}
        onChange={event => setCaption(event.target.value)}>
      </textarea>
      <label>
        <CropOriginalIcon className="postStory__imageIcon" />
        <input className="postStory__input__file" type="file" onChange={handleChange} />
      </label>
      <Link to="post/success">
        <button className="postStory__button" onClick={handleUpload}>
          投稿する
        </button>
      </Link>
    </div>

  )
}

export default Post;

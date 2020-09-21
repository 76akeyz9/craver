import React, { useState, useEffect} from 'react';
import { db, auth } from './firebase';
import "./MapPost.css";
import IconButton from "@material-ui/core/IconButton";
import { BrowserRouter as Router, Link } from "react-router-dom";

function MapPosts({key, postId, caption}) {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([
    "https://static.wixstatic.com/media/a99d5f_3cabd06c6e04484ba50a4a8dd77ba47c~mv2.jpg/v1/fill/w_1291,h_723,al_c,q_85/IMG_6911_JPG.webp"
  ]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // everytime a new post is added, this code fires.
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data(),
      })));
    })
  },[]);

  return(
    <div className="mapPosts">
      {
        posts.map(({id, post}) => (
          <Link
            to={`/post/${id}`}
            id={id}
          >
            <div key={id} className="mapPosts__eachPost">
              <img className="mapPost__image" src={post.imageUrl}/>
              {post.caption}
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default MapPosts;

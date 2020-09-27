import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import MapPost from "./MapPost";
import "./MapPosts.css"

function MapPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // everytime a new post is added, this code fires.
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="mapPosts">
      <div className="adjustment"></div>
      {posts.map(({ id, post }) => (
        <MapPost id={id} post={post} />
      ))}
    </div>
  );
}

export default MapPosts;

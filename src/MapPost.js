import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function MapPost({ id, post }) {
  //const [{ postData }, dispatch] = useStateValue();

  // const setPost = () => {
  //   dispatch({
  //     type: "SET_POSTDATA",
  //     item: {
  //       id: id,
  //       imageUrl: post.imageUrl,
  //       caption: post.caption,
  //     },
  //   });
  // };

  return (
    <div className="showPost">
      <Link to={`/post/${id}`}>
        <div key={id} className="mapPosts__eachPost">
          <img className="mapPost__image" src={post.imageUrl} />
          {post.caption}
        </div>
      </Link>
    </div>
  );
}

export default MapPost;

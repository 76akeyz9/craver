import React, { useState, useEffect} from 'react';
import { db } from './firebase';

function WatchPost(props) {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [id, setId] = useState('55Pb9A89YJqCGQrFfdAi');

  useEffect(()=> {
    fetch("localhost:3000/post/"+props.match.params.id)
    .then(res => res.json())
    .then(
      (result) => {
        setId(result);
      }
    );
  },[]);

  useEffect(() => {
    const docRef = db.collection("posts").doc(id);
    docRef.get().then(function(doc) {
      setCaption(doc.data().caption);
      setImageUrl(doc.data().imageUrl);
      setTimestamp(doc.data().timestamp);
      console.log("document ImageUrl is", String(doc.data().imageUrl))
    });
    console.log("Image Url is ", imageUrl);
  },[]);

  return (
    <div className="">
      {
          <div key={id} className="">
            <img className="" src={imageUrl}/>
            {caption}
          </div>
      }

    </div>
  )
}

export default WatchPost;

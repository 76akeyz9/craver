import React, { useState } from "react";
import "./Profile.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { auth, db } from "../firebase";

function Profile() {
  const [age, setAge] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [address4, setAddress4] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleUpload = () => {
    auth.onAuthStateChanged((authUser) => {
      //  https://firebase.google.com/docs/auth/web/manage-users?hl=ja
      if (authUser) {
        console.log("Auth from Profile >>>", authUser);
        authUser.updateProfile({
          displayName: "Kiichi Tiger",
          photoUrl:
            "https://s1.r29static.com/bin/entry/6c8/680x817,85/2036818/image.webp",
        });

        //   https://firebase.google.com/docs/firestore/manage-data/add-data
        db.collection("users").doc(authUser.uid).set({
          age: age,
          address1: address1,
          address2: address2,
          address3: address3,
          address4: address4,
          familyName: familyName,
          firstName: firstName,
          postalCode: postalCode,
        });
      } else {
      }
    });
  };

  return (
    //   use Divider for lists and use Text Field for edit profile
    <div className="profile">
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        className="profile__save"
      >
        保存する
      </Button>
      <div className="profile__list profile__top">
        <div className="profile__list__title"> Age </div>
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Age"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeAge}
        />
      </div>
      <div className="profile__list">
        <div className="profile__list__title"> Name </div>
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="profile__list">
        <div className="profile__list__title"> Address </div>
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Address"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="profile__list">
        <div className="profile__list__title"> Number </div>
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Number"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="profile__list">
        <div className="profile__list__title"> email </div>
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Number"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
}

export default Profile;

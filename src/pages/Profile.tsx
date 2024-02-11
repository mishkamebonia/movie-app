import { useState, useRef } from "react";
import { useAuthContext } from "../providers/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>profile</h1>
      <p>name: {user?.displayName}</p>
      <p>gmail: {user?.email}</p>
      <p>photo:</p>
      <img
        src={`${user?.photoURL}`}
        alt=""
        style={{ width: "300px", height: "300px", background: "red" }}
      />
    </div>
  );
};

export default Profile;

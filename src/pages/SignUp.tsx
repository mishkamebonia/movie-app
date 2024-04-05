import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../App";
import { useAuthContext } from "../providers/auth";
import { useState, useRef } from "react";
import logo from "../assets/logo.svg";
import "../scss/form.scss";
import { updateProfile } from "firebase/auth";
import { auth, db, storage } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import userImg from "../assets/user.png";

const signUp = () => {
  const { signUp, user } = useAuthContext();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign up the user
      if (name !== "" && password === repeatPassword && image !== null) {
        await signUp(email, password);
        const user = auth.currentUser;

        if (!user) return;

        const imageRef = ref(storage, `profile_images/${user.uid}`);

        // Upload the image to Firebase Storage
        await uploadBytes(imageRef, image);

        // Get the download URL of the uploaded image
        const imageURL = await getDownloadURL(imageRef);

        // Update user profile with name and photoURL
        await updateProfile(user, {
          displayName: name,
          photoURL: imageURL,
        });

        // Add user data to Firestore

        console.log({
          uid: user.uid,
          displayName: name,
          email: email,
          photoURL: imageURL,
        });

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: name,
          email: email,
          photoURL: imageURL,
        });

        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="form-container">
        <img src={logo} alt="logo" className="logo" />
        <form className="form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label className="image-label">
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              id="image-input"
            />
            {imageUrl ? (
              <img src={imageUrl} className="profile-image" alt="userImg" />
            ) : (
              <div className="profile-image">
                <p className="profile-image-text">Upload photo</p>
              </div>
            )}
          </label>
          <input
            className="input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <button type="submit" className="button">
            Create an account
          </button>
          <p>
            Already have an account?
            <NavLink to={routes.login} className="link">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default signUp;

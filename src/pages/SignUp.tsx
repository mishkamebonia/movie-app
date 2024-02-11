import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../App";
import { useAuthContext } from "../providers/auth";
import { useState } from "react";
import logo from "../assets/logo.svg";
import "../scss/form.scss";
import { auth, db, storage } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const signUp = () => {
  const { signUp } = useAuthContext();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [image, setImage] = useState<string>(null);
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await updateProfile(signUp.user, {
  //       displayName: name,
  //       photoURL: image,
  //     });

  //     await setDoc(doc(db, "users", signUp.user.uid), {
  //       uid: signUp.user.uid,
  //       displayName: name,
  //       email: email,
  //       photoURL: image,
  //     });

  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   // if (password === repeatPassword) {
  //   //   navigate(routes.home);
  //   //   return signUp(email, password);
  //   // }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign up the user
      await signUp(email, password);

      // Upload the image to Firebase Storage
      const imageRef = storage.ref().child(`profile_images/${email}`);
      await imageRef.put(image);

      // Get the download URL of the uploaded image
      const imageURL = await imageRef.getDownloadURL();

      // Update user profile with name and photoURL
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: name,
        photoURL: imageURL,
      });

      // Add user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: name,
        email: email,
        photoURL: imageURL,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <img src={logo} alt="logo" />
        <form className="form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
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
          <input type="file" onChange={(e) => setImage(e.target.value)} />
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

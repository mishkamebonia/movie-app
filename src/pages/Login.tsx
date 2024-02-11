import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../App";
import { useAuthContext } from "../providers/auth";
import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import "../scss/form.scss";
import { auth } from "../config/firebase";

const Login = () => {
  const { user, signIn } = useAuthContext();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate(routes.home);
      }
    });

    return unsubscribe;
  }, [user, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <img src={logo} alt="logo" />
        <form className="form" onSubmit={handleSubmit}>
          <h1>Login</h1>
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
          <button type="submit" className="button">
            Login to your account
          </button>
          <p>
            Don’t have an account?
            <NavLink to={routes.signUp} className="link">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

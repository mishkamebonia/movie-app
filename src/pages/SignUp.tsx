import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../App";
import { useAuthContext } from "../providers/auth";
import { useState } from "react";
import logo from "../assets/logo.svg";
import "../scss/form.scss";

const signUp = () => {
  const { signUp } = useAuthContext();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === repeatPassword) {
      navigate(routes.home);
      return signUp(email, password);
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
          <button className="button">Create an account</button>
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

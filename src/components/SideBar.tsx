import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import main from "../assets/main.svg";
import film from "../assets/film.svg";
import tv from "../assets/tv.svg";
import marked from "../assets/marked.svg";
import "./SideBar.scss";
import { useAuthContext } from "../providers/auth";
import { routes } from "../App";

const SideBar = () => {
  const { logOut } = useAuthContext();

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate(routes.login);
  };

  return (
    <nav className="side-bar">
      <div className="menu">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <div className="btn-row">
          <NavLink to="/">
            <img src={main} alt="main" />
          </NavLink>
          <NavLink to="/movies">
            <img src={film} alt="film" />
          </NavLink>
          <NavLink to="/series">
            <img src={tv} alt="tv" />
          </NavLink>
          <NavLink to="/bookmarked">
            <img src={marked} alt="marked" />
          </NavLink>
        </div>
      </div>

      <div className="user">
        <button>
          <i className="fa-solid fa-circle-user"></i>
        </button>
        <button style={{ color: "white" }} onClick={() => handleLogOut()}>
          log out
        </button>
      </div>
    </nav>
  );
};

export default SideBar;

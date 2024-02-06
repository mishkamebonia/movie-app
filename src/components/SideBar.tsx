import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import main from "../assets/main.svg";
import film from "../assets/film.svg";
import tv from "../assets/tv.svg";
import marked from "../assets/marked.svg";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./SideBar.scss";
import { useAuthContext } from "../providers/auth";
import { routes } from "../App";

const SideBar = () => {
  const { logOut } = useAuthContext();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logOut();
    navigate(routes.login);
  };

  return (
    <nav className="side-bar">
      <div className="menu">
        <NavLink to={routes.home}>
          <img src={logo} alt="logo" />
        </NavLink>
        <div className="btn-row">
          <NavLink to={routes.home}>
            <img src={main} alt="main" />
          </NavLink>
          <NavLink to={routes.movies}>
            <img src={film} alt="film" />
          </NavLink>
          <NavLink to={routes.series}>
            <img src={tv} alt="tv" />
          </NavLink>
          <NavLink to={routes.bookmarked}>
            <img src={marked} alt="marked" />
          </NavLink>
        </div>
      </div>

      <div className="user">
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i className="fa-solid fa-circle-user"></i>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;

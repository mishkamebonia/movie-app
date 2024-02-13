import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./SideBar.scss";
import { useAuthContext } from "../providers/auth";
import { routes } from "../App";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import LocalMoviesSharpIcon from "@mui/icons-material/LocalMoviesSharp";
import LiveTvSharpIcon from "@mui/icons-material/LiveTvSharp";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";

const SideBar = () => {
  const { user, logOut } = useAuthContext();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate(routes.profile);
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logOut();
    navigate(routes.login);
  };

  return (
    <nav className="side-bar">
      <div className="menu">
        <img src={logo} alt="logo" />
        <div className="btn-row">
          <NavLink to={routes.home} activeClassName="active-link">
            <GridViewSharpIcon className="nav-link" />
          </NavLink>
          <NavLink to={routes.movies} activeClassName="active-link">
            <LocalMoviesSharpIcon className="nav-link" />
          </NavLink>
          <NavLink to={routes.series} activeClassName="active-link">
            <LiveTvSharpIcon className="nav-link" />
          </NavLink>
          <NavLink to={routes.bookmarked} activeClassName="active-link">
            <BookmarkSharpIcon className="nav-link" />
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
            <img className="profile-img" src={user?.photoURL} alt="" />
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
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;

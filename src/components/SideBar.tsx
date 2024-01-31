import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import main from "../assets/main.svg";
import film from "../assets/film.svg";
import tv from "../assets/tv.svg";
import marked from "../assets/marked.svg";
import "./SideBar.scss";

const SideBar = () => {
  return (
    <nav>
      <div className="menu">
        <button>
          <img src={logo} alt="logo" />
        </button>
        <div className="btn-row">
          <button>
            <img src={main} alt="main" />
          </button>
          <button>
            <img src={film} alt="film" />
          </button>
          <button>
            <img src={tv} alt="tv" />
          </button>
          <button>
            <img src={marked} alt="marked" />
          </button>
        </div>
      </div>

      <div className="user">
        <button>
          <i className="fa-solid fa-circle-user"></i>
        </button>
      </div>
    </nav>
  );
};

export default SideBar;

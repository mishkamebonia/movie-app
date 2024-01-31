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
          <img src={logo} alt="" />
        </button>
        <div className="btn-row">
          <button>
            <img src={main} alt="" />
          </button>
          <button>
            <img src={film} alt="" />
          </button>
          <button>
            <img src={tv} alt="" />
          </button>
          <button>
            <img src={marked} alt="" />
          </button>
        </div>
      </div>

      <div className="user">
        <i className="fa-solid fa-circle-user"></i>
      </div>
    </nav>
  );
};

export default SideBar;

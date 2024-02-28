import "../scss/search.scss";
import "../scss/input.scss";
import * as React from "react";
import { FormEvent } from "react";
import Content from "../components/Content";
import { searchMovieAndSeriesApi } from "../config/movieApi";
import { Backdrop } from "@mui/material";
import { Movie } from "../@types";
// import Loader from "../components/Loader";
// import { Movie } from "../@types";

const Home = () => {
  const [datas, setDatas] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`${searchMovieAndSeriesApi}?query=${query}`)
      .then((res) => res.json())
      .then((json) => setDatas(json.results));
  };

  return (
    <main>
      <div className="search-input">
        <label htmlFor="search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </label>
        <form onSubmit={handleSubmit}>
          <input
            id="search"
            placeholder="search"
            type="search"
            name="search"
            onChange={(e) => setQuery(e.target.value)}
            onClick={handleOpen}
          />
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <div className="search-module">
              <div className="row">
                {datas.map((data: Movie) => (
                  <div className="card">{data.title}</div>
                ))}
              </div>
            </div>
          </Backdrop>
        </form>
      </div>
      <Content />
    </main>
  );
};

export default Home;

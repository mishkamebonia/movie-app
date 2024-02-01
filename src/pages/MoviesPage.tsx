import { useEffect, useState } from "react";
import Search from "../components/Search";
import "./pages.scss";
import { apiKey } from "../config/movieApi";

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);

  const getMovie = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((json) => setMovieList(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieList);

  return (
    <main>
      <Search />
      <div className="card">
        <h1>Movies</h1>
        {movieList.map((movie) => (
          <a href="#" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt=""
            />
            <div className="row">
              <p className="title">{movie.title}</p>
              <p className="light-text date">
                {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
};

export default MoviesPage;

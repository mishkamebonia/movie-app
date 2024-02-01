import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "../components/Search";
import "../components/movies/movie-cards.scss";
import { apiKey } from "../config/movieApi";
import { Pagination } from "@mui/material";

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const getMovie = (pageNumber) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNumber}`
    )
      .then((res) => res.json())
      .then((json) => {
        setMovieList(json.results);
        setTotalPages(json.total_pages);
      });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get("page")) || 1;
    setPage(currentPage);
  }, [location.search]);

  useEffect(() => {
    getMovie(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    navigate(`/movies?page=${value}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log(movieList);

  return (
    <main>
      <Search />
      <div className="backdrop-card">
        <h1>Movies</h1>
        <div className="movies-row">
          {movieList &&
            movieList.map((movie) => (
              <a href="#" key={movie.id} className="movies">
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
        <Pagination
          className="pagitation"
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </div>
    </main>
  );
};

export default MoviesPage;

import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Search from "../Search";
import "../../components/movies/movie-cards.scss";
import { Pagination } from "@mui/material";

const Page = (props) => {
  const { title, apiUrl, apiSearch, apiPage, placeholder, pageUrl } = props;
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const getMovie = (pageNumber) => {
    fetch(`${apiUrl}&page=${pageNumber}`)
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
    navigate(`${apiPage}${value}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main>
      <Search
        setSearchList={setMovieList}
        searchApi={apiSearch}
        placeholder={placeholder}
      />
      <div className="backdrop-card">
        <h1>{title}</h1>
        <div className="movies-row">
          {movieList &&
            movieList.map((movie) => (
              <Link
                to={`${pageUrl}${movie.id}`}
                key={movie.id}
                className="movies"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt=""
                />
                <div className="row">
                  <p className="title">{movie.title || movie.name}</p>
                  <p className="light-text date">
                    {new Date(movie.release_date).getFullYear() ||
                      new Date(movie.first_air_date).getFullYear()}
                  </p>
                </div>
              </Link>
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

export default Page;

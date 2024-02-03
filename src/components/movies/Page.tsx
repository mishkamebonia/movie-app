import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Search from "../Search";
import "../../components/movies/movie-cards.scss";
import { Pagination } from "@mui/material";

const Page = (props) => {
  const { title, apiUrl, apiSearch, placeholder, pageUrl } = props;

  const [movieList, setMovieList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageNumber = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("query") || "";

  console.log("rerendered");

  const getMovie = () => {
    console.log("fetched");

    const url = query ? apiSearch : apiUrl;
    fetch(`${url}&page=${pageNumber}&query=${query}`)
      .then((res) => res.json())
      .then((json) => {
        setMovieList(json.results);
        setTotalPages(json.total_pages);
      });
  };

  useEffect(() => {
    getMovie();
  }, [pageNumber, query]);

  const handlePageChange = (event, value) => {
    navigate(`${location.pathname}?page=${value}&query=${query}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main>
      <Search
        onSearch={(searchString) => {
          navigate(`${location.pathname}?query=${searchString}`);
        }}
        placeholder={placeholder}
      />
      <div className="content">
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
            page={pageNumber}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </main>
  );
};

export default Page;

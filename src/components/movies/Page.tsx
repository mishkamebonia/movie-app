import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Search from "../Search";
import "../../components/movies/movie-cards.scss";
import { Pagination } from "@mui/material";
import Loader from "../Loader";
import { Skeleton } from "@mui/material";

const Page = (props) => {
  const { title, apiUrl, apiSearch, placeholder, pageUrl } = props;

  const [movieList, setMovieList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageNumber = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("query") || "";

  const getMovie = () => {
    const url = query ? apiSearch : apiUrl;
    setLoading(true);
    fetch(`${url}&page=${pageNumber}&query=${query}`)
      .then((res) => res.json())
      .then((json) => {
        setMovieList(json.results);
        setTotalPages(json.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
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

  const handleBookmared = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("clicked");
  };

  // if (loading) {
  //   return <Loader />;
  // }
  console.log(loading);

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
              movieList.map((movie) =>
                loading ? (
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="rectangular"
                    width="100%"
                    height="233px"
                  />
                ) : (
                  <Link
                    to={`${pageUrl}${movie.id}`}
                    key={movie.id}
                    className="movies"
                    style={{ zIndex: 1 }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      alt=""
                    />
                    <button
                      type="button"
                      style={{ zIndex: 100 }}
                      onClick={handleBookmared}
                    >
                      <i class="fa-solid fa-bookmark"></i>
                    </button>
                    <div className="row">
                      <p className="title">{movie.title || movie.name}</p>
                      <p className="light-text date">
                        {new Date(movie.release_date).getFullYear() ||
                          new Date(movie.first_air_date).getFullYear()}
                      </p>
                    </div>
                  </Link>
                )
              )}
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

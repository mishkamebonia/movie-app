import Search from "../components/Search";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { posterApi } from "../config/movieApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/auth";
import noImage from "../assets/no-image.jpeg";
import { routes } from "../App";
import "../scss/cards.scss";
import "../scss/buttons.scss";
import { Rating, Snackbar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useFetchBookmarks } from "../queries/useFetchBookmarks";
import { Bookmark } from "../@types";

const Bookmarked = () => {
  const datas = useFetchBookmarks();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [moviesData, setMoviesData] = useState<Bookmark[]>([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    setMoviesData(datas);
  }, [datas]);

  return (
    <main>
      <Search
        placeholder="Search for bookmarked shows"
        onSearch={(searchString: string) => {
          navigate(`${location.pathname}?query=${searchString}`);
        }}
      />
      <div className="card">
        <h1>bookmarked page</h1>
        <div className="movies-row">
          {moviesData.map((data) => (
            <Link
              to={`${
                data.type === "Movies" || data.type === "Popular Movies"
                  ? routes.movies
                  : routes.series
              }${data.movieId}`}
              key={data.movieId}
              className="movies"
              style={{ zIndex: 1 }}
            >
              <img
                src={`${posterApi}${data.poster}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImage;
                }}
              />
              <button
                type="button"
                className={
                  data.bookmarked ? "active-bookmark bookmark" : "bookmark"
                }
                style={{
                  zIndex: 100,
                }}
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    const docRef = doc(
                      db,
                      "usersBookmarked",
                      `${user?.uid}_${data.movieId}`
                    );
                    await deleteDoc(docRef);
                    handleClick();

                    setMoviesData(
                      moviesData.filter((item) => item.movieId !== data.movieId)
                    );
                  } catch (err) {
                    console.error("error", err);
                  }
                }}
              >
                <i
                  className={
                    "fa-bookmark " +
                    (data.bookmarked ? "fa-solid" : "fa-regular")
                  }
                ></i>
              </button>
              <div className="description-row">
                <div className="rating-row">
                  <Rating
                    style={{ fontSize: "18px", marginRight: "8px" }}
                    name="half-rating-read"
                    value={data.imdb / 2}
                    precision={0.1}
                    readOnly
                    emptyIcon={
                      <StarIcon
                        style={{ color: "rgb(255, 255, 255)" }}
                        fontSize="inherit"
                      />
                    }
                  />
                  <span className="light-text">
                    {Math.round(data.imdb * 10) / 10}
                  </span>
                </div>
                <p className="light-text date">
                  {new Date(data.date).getFullYear() ||
                    new Date(data.first_air_date).getFullYear()}
                </p>
              </div>
              <h4 className="title">{data.title}</h4>
            </Link>
          ))}
          <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            className="snackbar"
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message="Removed from bookmarks successfully"
          />
        </div>
      </div>
    </main>
  );
};

export default Bookmarked;

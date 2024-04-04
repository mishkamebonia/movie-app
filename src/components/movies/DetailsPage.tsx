import { apiKey } from "../../config/movieApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Search from "../Search";
import Slider from "./Slider";
import Loader from "../Loader";
import { movieApi } from "../../config/movieApi";
import { routes } from "../../App";
import "./DetailsPage.scss";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import bookmarked from "../../functions/handleBookmarked";
import { useAuthContext } from "../../providers/auth";
import { useFetchBookmarks } from "../../queries/useFetchBookmarks";
import Comments from "../Comments";

const DetailsPage = (props) => {
  const { url, videoUrl, route, placeholder, type } = props;
  const { movieId, seriesId } = useParams();
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [bookmarkedData, fetchBookmarks] = useFetchBookmarks();
  const [trailerKey, setTrailerKey] = useState(null);
  const [opts, setOpts] = useState({ height: "480", width: "854" });
  const navigate = useNavigate();
  const id = movieId || seriesId;

  useEffect(() => {
    if (!id) return;

    fetch(`${url}${id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setData(data));

    fetch(`${url}${id}${videoUrl}`)
      .then((res) => res.json())
      .then((data) => {
        const trailers = data.results.filter(
          (video) => video.type === "Trailer"
        );
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1440) {
        setOpts({ height: "360", width: "640" });
      } else {
        setOpts({ height: "480", width: "854" });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function isBookmarked(id) {
    return bookmarkedData.some((data) => data.movieId === id);
  }

  if (!data) {
    return <Loader />;
  }

  return (
    <main>
      <div className="content">
        <Search
          placeholder={placeholder}
          onSearch={(value) => {
            navigate(`${route}?query=${value}`);
          }}
        />
        <div className="details-page">
          <div className="movie-row">
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt=""
            />
            <div className="trailer">
              {trailerKey && <YouTube videoId={trailerKey} opts={opts} />}
            </div>
          </div>
          <div className="description">
            <div className="headline-row">
              <h1>{data.title || data.name}</h1>
              <button
                type="button"
                style={{ zIndex: 100 }}
                className={
                  isBookmarked(data.id)
                    ? "active-bookmark bookmark"
                    : "bookmark"
                }
                onClick={async (e) => {
                  e.preventDefault();
                  await bookmarked(
                    user.uid,
                    type,
                    data.id,
                    data.title || data.name,
                    data.vote_average,
                    data.release_date || data.first_air_date,
                    data.backdrop_path
                  ).then(() => fetchBookmarks());
                }}
              >
                <i
                  className={
                    "fa-bookmark " +
                    (isBookmarked(data.id) ? "fa-solid" : "fa-regular")
                  }
                ></i>
              </button>
            </div>
            <p style={{ display: "flex" }}>
              <span>IMDB:</span>
              <div className="rating-row">
                <Rating
                  style={{ fontSize: "18px", marginRight: "8px" }}
                  className="rating"
                  name="half-rating-read"
                  value={data.vote_average / 2}
                  precision={0.1}
                  readOnly
                  emptyIcon={
                    <StarIcon style={{ color: "fff" }} fontSize="inherit" />
                  }
                />
                <span className="light-text">
                  {Math.round(data.vote_average * 10) / 10}
                </span>
              </div>
            </p>
            {seriesId ? (
              <p>
                <span>Created by: </span>
                {data.created_by.map((author) => (
                  <a href="#" key={author.id} style={{ marginRight: "8px" }}>
                    {author.name},
                  </a>
                ))}
              </p>
            ) : null}
            <p>
              <span>Genres:</span>
              {data.genres.map((genre) => (
                <a href="#" key={genre.id} style={{ marginRight: "8px" }}>
                  {genre.name},
                </a>
              ))}
            </p>
            <p>
              <span>Studio:</span>
              {data.production_companies.map((companie) => (
                <a href="#" key={companie.id} style={{ marginRight: "8px" }}>
                  {companie.name},
                </a>
              ))}
            </p>
            <p>
              <span>Released date:</span>
              <a href="#">
                {new Date(data.release_date).getFullYear() |
                  new Date(data.first_air_date).getFullYear()}
              </a>
            </p>
            <p>
              {movieId ? (
                <p>
                  <span>Duration:</span>
                  {data.runtime} min
                </p>
              ) : null}
            </p>
            <p>
              <span>Language:</span>
              {data.spoken_languages.map((lang) => (
                <a href="#" key={lang.id} style={{ marginRight: "8px" }}>
                  {lang.english_name},
                </a>
              ))}
            </p>
            <p>
              <span>Country:</span>
              {data.production_countries.map((country) => (
                <a href="#" key={country.id} style={{ marginRight: "8px" }}>
                  {country.name},
                </a>
              ))}
            </p>
            {movieId ? (
              <>
                <p>
                  <span>Budget:</span>
                  {parseInt(data.budget).toLocaleString()} $
                </p>
                <p>
                  <span>Revenue:</span>
                  {parseInt(data.revenue).toLocaleString()} $
                </p>
              </>
            ) : null}
            {seriesId ? (
              <>
                <p>
                  <span>Episodes:</span>
                  {data.number_of_episodes}
                </p>
                <p>
                  <span>Seasones:</span>
                  {data.number_of_seasons}
                </p>
              </>
            ) : null}
            <div className="description">
              <h4>The story:</h4>
              <p>{data.overview}</p>
            </div>
          </div>
          <Comments movieId={movieId} seriesId={seriesId} />
        </div>
      </div>
      <Slider
        dataApi={movieApi}
        title="Popular Movies"
        url={routes.movies}
        slides="4"
        image="backdrop"
        // autoplay={true}
      />
    </main>
  );
};

export default DetailsPage;

import { apiKey } from "../config/movieApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Trending from "../components/movies/Trending";
import "./DetailsPage.scss";

const DetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const getVideos = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        const trailers = data.results.filter(
          (video) => video.type === "Trailer"
        );
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      });
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    getVideos();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const opts = {
    height: "600",
    width: "100%",
  };

  return (
    <main>
      <div className="details-page">
        <div className="row">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
          <div className="trailer">
            {trailerKey && <YouTube videoId={trailerKey} opts={opts} />}
          </div>
        </div>
        <div>
          <h1>{movie.title}</h1>
          <p>
            <span>Genres:</span>
            {movie.genres.map((genre) => (
              <a href="#" key={genre.id} style={{ marginRight: "8px" }}>
                {genre.name},
              </a>
            ))}
          </p>
          <p>
            <span>Studio:</span>
            {movie.production_companies.map((companie) => (
              <a href="#" key={companie.id} style={{ marginRight: "8px" }}>
                {companie.name},
              </a>
            ))}
          </p>
          <p>
            <span>Relased date:</span>
            <a href="#">{new Date(movie.release_date).getFullYear()}</a>
          </p>
          <p>
            <span>Duration:</span>
            {movie.runtime}m
          </p>
          <p>
            <span>Language:</span>
            {movie.spoken_languages.map((lang) => (
              <a href="#" key={lang.id} style={{ marginRight: "8px" }}>
                {lang.english_name},
              </a>
            ))}
          </p>
          <p>
            <span>Country:</span>
            {movie.production_countries.map((country) => (
              <a href="#" key={country.id} style={{ marginRight: "8px" }}>
                {country.name},
              </a>
            ))}
          </p>
          <p>
            <span>Budget:</span>
            {movie.budget}
          </p>
          <p>
            <span>Revenue:</span>
            {movie.revenue}
          </p>
          <div className="description">
            <h4>The story of the movie:</h4>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
      <Trending />
    </main>
  );
};

export default DetailsPage;

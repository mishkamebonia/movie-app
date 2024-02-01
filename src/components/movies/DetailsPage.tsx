import { apiKey } from "../../config/movieApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Trending from "./Trending";
import Search from "../Search";
import "./DetailsPage.scss";

const DetailsPage = (props) => {
  const { url, videoUrl, placeholder } = props;
  const { movieId, seriesId } = useParams();
  const [link, setLink] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const id = movieId || seriesId;
    if (!id) return;

    fetch(`${url}${id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setLink(data));

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
  }, [movieId, seriesId]);

  if (!link) {
    return <div>Loading...</div>;
  }

  const opts = {
    height: "600",
    width: "100%",
  };

  return (
    <main>
      <Search placeholder={placeholder} />
      <div className="details-page">
        <div className="row">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${link.poster_path}`}
            alt=""
          />
          <div className="trailer">
            {trailerKey && <YouTube videoId={trailerKey} opts={opts} />}
          </div>
        </div>
        <div>
          <h1>{link.title || link.original_name}</h1>
          {seriesId ? (
            <p>
              <span>Created by: </span>
              {link.created_by.map((author) => (
                <a href="#" key={author.id} style={{ marginRight: "8px" }}>
                  {author.name},
                </a>
              ))}
            </p>
          ) : null}
          <p>
            <span>Genres:</span>
            {link.genres.map((genre) => (
              <a href="#" key={genre.id} style={{ marginRight: "8px" }}>
                {genre.name},
              </a>
            ))}
          </p>
          <p>
            <span>Studio:</span>
            {link.production_companies.map((companie) => (
              <a href="#" key={companie.id} style={{ marginRight: "8px" }}>
                {companie.name},
              </a>
            ))}
          </p>
          <p>
            <span>Released date:</span>
            <a href="#">
              {new Date(link.release_date).getFullYear() |
                new Date(link.first_air_date).getFullYear()}
            </a>
          </p>
          <p>
            {movieId ? (
              <p>
                <span>Duration:</span>
                {link.runtime} min
              </p>
            ) : null}
          </p>
          <p>
            <span>Language:</span>
            {link.spoken_languages.map((lang) => (
              <a href="#" key={lang.id} style={{ marginRight: "8px" }}>
                {lang.english_name},
              </a>
            ))}
          </p>
          <p>
            <span>Country:</span>
            {link.production_countries.map((country) => (
              <a href="#" key={country.id} style={{ marginRight: "8px" }}>
                {country.name},
              </a>
            ))}
          </p>
          {movieId ? (
            <>
              <p>
                <span>Budget:</span>
                {link.budget}
              </p>
              <p>
                <span>Revenue:</span>
                {link.revenue}
              </p>
            </>
          ) : null}
          {seriesId ? (
            <>
              <p>
                <span>Episodes:</span>
                {link.number_of_episodes}
              </p>
              <p>
                <span>Seasones:</span>
                {link.number_of_seasons}
              </p>
            </>
          ) : null}
          <div className="description">
            <h4>The story:</h4>
            <p>{link.overview}</p>
          </div>
        </div>
      </div>
      <Trending />
    </main>
  );
};

export default DetailsPage;

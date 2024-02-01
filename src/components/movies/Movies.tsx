import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import SwiperCore from "swiper/core";
import "swiper/swiper-bundle.css";
import "./movie-cards.scss";
import { apiKey } from "../../config/movieApi";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, A11y]);

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const getMovie = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((json) => setMovieList(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <section id="tranding" className="poster-card">
      <div className="custom-navigation">
        <Link to="/movies">
          <h1>Movies</h1>
        </Link>
        <div className="swiper-btns">
          <div
            className="swiper-button-prev"
            onClick={() => swiperInstance?.slidePrev()}
          ></div>
          <div
            className="swiper-button-next"
            onClick={() => swiperInstance?.slideNext()}
          ></div>
        </div>
      </div>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={6}
        navigation={false}
        onSwiper={setSwiperInstance}
      >
        {movieList.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
              />
              <div className="row">
                <p className="title">{movie.title}</p>
                <p className="light-text date">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Movies;

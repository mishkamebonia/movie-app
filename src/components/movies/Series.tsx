import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import SwiperCore from "swiper/core";
import "swiper/swiper-bundle.css";
import "./movie-cards.scss";
import { apiKey } from "../../config/movieApi";

SwiperCore.use([Navigation, A11y]);

const Series = () => {
  const [movieList, setMovieList] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const getMovie = () => {
    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((json) => setMovieList(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieList);

  return (
    <section id="tranding" className="poster-card">
      <div className="custom-navigation">
        <h1>Series</h1>
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
        loop={true}
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={7}
        navigation={false}
        onSwiper={setSwiperInstance}
      >
        {movieList.map((movie) => (
          <SwiperSlide key={movie.id}>
            <a href="#">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
              />
              <div className="row">
                <p className="title">{movie.name}</p>
                <p className="light-text date">
                  {new Date(movie.first_air_date).getFullYear()}
                </p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Series;

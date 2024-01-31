import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./TrendingSwiper.scss";
import { apiKey } from "../config/movieApi";

const TrendingSwiper = () => {
  const [movieList, setMovieList] = useState([]);

  const getMovie = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((json) => setMovieList(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieList);

  return (
    <section id="tranding" className="movie-card">
      <h1>Trending</h1>
      <Swiper
        style={{ background: "red" }}
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={4.5}
        loop={true}
        autoplay={{ delay: 2000 }}
        // navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {movieList.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt=""
              />
              <p className="light-text"></p>
            </div>
            <p>{movie.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TrendingSwiper;

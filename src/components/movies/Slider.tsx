import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Skeleton } from "@mui/material";
import SwiperCore from "swiper/core";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.css";
import "../../scss/cards.scss";
import "../../scss/slider.scss";
import HandleBookmarked from "../../functions/HandleBookmarked";
import { useAuthContext } from "../../providers/auth";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useFetchBookmarks } from "../../queries/useFetchBookmarks";

SwiperCore.use([Navigation, A11y]);

const Slider = (props) => {
  const { dataApi, title, url, slides, image, autoplay } = props;
  const { user } = useAuthContext();

  const [dataList, setDataList] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const bookmarkedMovies = useFetchBookmarks();

  const getData = () => {
    fetch(dataApi)
      .then((res) => res.json())
      .then((json) => {
        setDataList(json.results);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function isBookmarked(id) {
    return bookmarkedMovies.some(
      (bookmarkedMovie) => bookmarkedMovie.movieId === id
    );
  }

  return (
    <section id="tranding" className="card">
      <div className="custom-navigation">
        <Link to={url}>
          <h1>{title}</h1>
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
        modules={[Navigation, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={slides}
        navigation={false}
        autoplay={
          autoplay ? { delay: 3000, disableOnInteraction: false } : false
        }
        onSwiper={setSwiperInstance}
      >
        {dataList.map((data) =>
          dataList ? (
            <SwiperSlide key={data.id}>
              <Link to={`${url}${data.id}`}>
                {image === "backdrop" && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                    alt=""
                  />
                )}
                {image === "poster" && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt=""
                  />
                )}
                <button
                  type="button"
                  className={
                    isBookmarked(data.id)
                      ? "active-bookmark bookmark"
                      : "bookmark"
                  }
                  style={{ zIndex: 100 }}
                  onClick={async (e) => {
                    e.preventDefault();
                    await HandleBookmarked(
                      user.uid,
                      title,
                      data.id,
                      data.title || data.name,
                      data.vote_average,
                      data.release_date || data.first_air_date,
                      data.backdrop_path
                    );
                  }}
                >
                  <i className="fa-regular fa-bookmark"></i>
                </button>
                <div className="description-row">
                  <div className="rating-row">
                    <Rating
                      style={{ fontSize: "18px", marginRight: "8px" }}
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
                  <p className="light-text date">
                    {new Date(data.release_date).getFullYear() ||
                      new Date(data.first_air_date).getFullYear()}
                  </p>
                </div>
                <h4 className="title">{data.title || data.name}</h4>
              </Link>
            </SwiperSlide>
          ) : (
            <SwiperSlide key="skeleton">
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                width="100%"
                height="233px"
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </section>
  );
};

export default Slider;

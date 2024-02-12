import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Skeleton } from "@mui/material";
import SwiperCore from "swiper/core";
import { Link } from "react-router-dom";
import imdb from "../../functions/imdb";
import "swiper/swiper-bundle.css";
import "../../scss/cards.scss";
import "../../scss/slider.scss";

SwiperCore.use([Navigation, A11y]);

const Slider = (props) => {
  const { dataApi, title, url, slides, image, autoplay } = props;

  const [dataList, setDataList] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const getData = () => {
    fetch(dataApi)
      .then((res) => res.json())
      .then((json) => setDataList(json.results));
  };

  useEffect(() => {
    getData();
  }, []);

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
                  style={{ zIndex: 100 }}
                  // onClick={handleBookmarked}
                  className="bookmark"
                >
                  <i className="fa-regular fa-bookmark"></i>
                </button>
                <div className="description-row">
                  <p className="imdb">{imdb(data.vote_average)}</p>
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

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import SwiperCore from "swiper/core";
import "swiper/swiper-bundle.css";
import "./movie-cards.scss";
import { Link } from "react-router-dom";

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

  console.log(dataList);

  return (
    <section id="tranding" className="poster-card">
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
        {dataList.map((data) => (
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
              <div className="row">
                <p className="title">{data.title || data.name}</p>
                <p className="light-text date">
                  {new Date(data.release_date).getFullYear() ||
                    new Date(data.first_air_date).getFullYear()}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;

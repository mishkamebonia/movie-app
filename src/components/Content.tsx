import { movieApi, seriesApi, newMoviesUrl } from "../config/movieApi";
import Slider from "./movies/Slider";
import "./Content.scss";

const Content = () => {
  return (
    <div className="content">
      <Slider
        dataApi={movieApi}
        title="Popular Movies"
        url="/movies/"
        slides="3"
        image="backdrop"
        autoplay={true}
      />
      <Slider
        dataApi={newMoviesUrl}
        title="Movies"
        url="/movies/"
        slides="5"
        image="poster"
        autoplay={false}
      />
      <Slider
        dataApi={seriesApi}
        title="TV Series"
        url="/series/"
        slides="5"
        image="poster"
        autoplay={false}
      />
    </div>
  );
};

export default Content;

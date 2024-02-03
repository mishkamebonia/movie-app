import DetailsPage from "../components/movies/DetailsPage";
import { movieUrl, videoUrl } from "../config/movieApi";
import { routes } from "../App";

const MovieDetail = () => {
  return (
    <DetailsPage
      url={movieUrl}
      videoUrl={videoUrl}
      route={routes.movies}
      placeholder="Search for movies"
    />
  );
};

export default MovieDetail;

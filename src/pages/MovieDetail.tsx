import DetailsPage from "../components/movies/DetailsPage";
import { movieUrl, videoUrl } from "../config/movieApi";

const MovieDetail = () => {
  return (
    <DetailsPage
      url={movieUrl}
      videoUrl={videoUrl}
      placeholder="Search for movies"
    />
  );
};

export default MovieDetail;

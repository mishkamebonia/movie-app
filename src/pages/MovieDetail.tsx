import DetailsPage from "../components/movies/DetailsPage";
import { movieUrl, videoUrl } from "../config/movieApi";
import { routes } from "../App";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieId } = useParams();

  return (
    <DetailsPage
      key={`movies-${movieId}`}
      type="Movies"
      url={movieUrl}
      videoUrl={videoUrl}
      route={routes.movies}
      placeholder="Search for movies"
    />
  );
};

export default MovieDetail;

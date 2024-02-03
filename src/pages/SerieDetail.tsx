import DetailsPage from "../components/movies/DetailsPage";
import { SerieUrl, videoUrl } from "../config/movieApi";
import { routes } from "../App";

const SerieDetail = () => {
  return (
    <DetailsPage
      url={SerieUrl}
      videoUrl={videoUrl}
      route={routes.series}
      placeholder="Search for TV series"
    />
  );
};

export default SerieDetail;

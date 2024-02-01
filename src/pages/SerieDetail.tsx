import DetailsPage from "../components/movies/DetailsPage";
import { SerieUrl, videoUrl } from "../config/movieApi";

const SerieDetail = () => {
  return (
    <DetailsPage
      url={SerieUrl}
      videoUrl={videoUrl}
      placeholder="Search for TV series"
    />
  );
};

export default SerieDetail;

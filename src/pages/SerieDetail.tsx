import DetailsPage from "../components/movies/DetailsPage";
import { SerieUrl, videoUrl } from "../config/movieApi";
import { routes } from "../App";
import { useParams } from "react-router-dom";

const SerieDetail = () => {
  const { seriesId } = useParams();

  return (
    <DetailsPage
      key={`series-${seriesId}`}
      type="TV Series"
      url={SerieUrl}
      videoUrl={videoUrl}
      route={routes.series}
      placeholder="Search for TV series"
    />
  );
};

export default SerieDetail;

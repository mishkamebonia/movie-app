import Page from "../components/movies/Page";
import { seriesApi, searchSeriesApi } from "../config/movieApi";
import { routes } from "../App";

const MoviePage = () => {
  return (
    <Page
      title="TV Series"
      apiUrl={seriesApi}
      apiSearch={searchSeriesApi}
      placeholder="Search for TV series"
      pageUrl={routes.series}
    ></Page>
  );
};
export default MoviePage;

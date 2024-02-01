import Page from "../components/movies/Page";
import { seriesApi, searchSeriesApi, pageSeriesApi } from "../config/movieApi";

const MoviePage = () => {
  return (
    <Page
      title="TV Series"
      apiUrl={seriesApi}
      apiSearch={searchSeriesApi}
      apiPage={pageSeriesApi}
      placeholder="Search for TV series"
      pageUrl="/series/"
    ></Page>
  );
};
export default MoviePage;

import Page from "../components/movies/Page";
import { movieApi, searchMovieApi, pageMoviesApi } from "../config/movieApi";

const MoviePage = () => {
  return (
    <Page
      title="Movies"
      apiUrl={movieApi}
      apiSearch={searchMovieApi}
      apiPage={pageMoviesApi}
      placeholder="Search for movies"
      pageUrl="/movies/"
    ></Page>
  );
};
export default MoviePage;

import Page from "../components/movies/Page";
import { movieApi, searchMovieApi } from "../config/movieApi";
import { routes } from "../App";

const MoviePage = () => {
  return (
    <Page
      title="Movies"
      apiUrl={movieApi}
      apiSearch={searchMovieApi}
      placeholder="Search for movies"
      pageUrl={routes.movies}
    />
  );
};
export default MoviePage;

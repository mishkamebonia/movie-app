import Search from "../components/Search";
import Content from "../components/Content";
import { searchMovieAndSeriesApi } from "../config/movieApi";
import Loader from "../components/Loader";

const Home = () => {
  return (
    <main>
      <Search
        placeholder="Search for movies or TV series"
        searchApi={searchMovieAndSeriesApi}
      />
      <Content />
    </main>
  );
};

export default Home;

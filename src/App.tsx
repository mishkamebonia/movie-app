import "./App.scss";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import Bookmarked from "./pages/Bookmarked";
import MovieDetail from "./pages/MovieDetail";
import SerieDetail from "./pages/SerieDetail";
import { useAuthContext } from "./providers/auth";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

const repoPrefix = "/movie-app";
export const routes = {
  home: "/movie-app" + "/",
  movies: "/movie-app" + "/movies/",
  moviesId: "/movie-app" + "/movies/:movieId",
  series: "/movie-app" + "/series/",
  seriesId: "/movie-app" + "/series/:seriesId",
  bookmarked: "/movie-app" + "/bookmarked/",
  login: "/movie-app" + "/login/",
  signUp: "/movie-app" + "/signUp/",
  profile: "/movie-app" + "/profile/",
};

function App() {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <Router>
      {user ? (
        <div className="home-page">
          <SideBar />
          <Routes>
            <Route path={routes.home} index element={<Home />} />
            <Route path={routes.profile} index element={<Profile />} />
            <Route path={routes.movies} element={<MoviesPage />} />
            <Route path={routes.moviesId} element={<MovieDetail />} />
            <Route path={routes.series} element={<SeriesPage />} />
            <Route path={routes.seriesId} element={<SerieDetail />} />
            <Route path={routes.bookmarked} element={<Bookmarked />} />
          </Routes>
        </div>
      ) : (
        <div>
          <Routes>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.signUp} element={<SignUp />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;

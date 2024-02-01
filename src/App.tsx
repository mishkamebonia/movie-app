import "./App.scss";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import Bookmarked from "./pages/Bookmarked";
import MovieDetail from "./pages/MovieDetail";
import SerieDetail from "./pages/SerieDetail";

function App() {
  return (
    <Router>
      <div className="home-page">
        <SideBar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/series/:seriesId" element={<SerieDetail />} />
          <Route path="/bookmarked" element={<Bookmarked />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

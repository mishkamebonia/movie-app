import "./App.scss";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import Bookmarked from "./pages/Bookmarked";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <Router>
      <div className="home-page">
        <SideBar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<DetailsPage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/bookmarked" element={<Bookmarked />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

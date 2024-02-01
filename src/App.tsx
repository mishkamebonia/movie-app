import "./App.scss";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import Bookmarked from "./pages/Bookmarked";

function App() {
  return (
    <Router>
      <div className="home-page">
        <SideBar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/bookmarked" element={<Bookmarked />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

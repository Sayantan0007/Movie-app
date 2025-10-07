import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
// import Home from "./components/HomePage/Home";
import Navbar from "./components/Navbar/Navbar";
// import Movies from "./components/Movies/movies";
// import Trending from "./components/TrendingMovies/Trending";
// import Leaderboard from "./components/Leaderboard/Leaderboard";
// import TvShow from "./components/TVshows/TvShow";
import { lazy } from "react";
import { Suspense } from "react";
import Loader from "./components/Loader/Loader";
import LogIn from "./SignIn/Login/LogIn";
import Register from "./SignIn/Register/Register";
import Footer from "./components/Footer/footer";
import PrivateRoute from "./SignIn/privateRoute/PrivateRoute";
import 'font-awesome/css/font-awesome.min.css';

function App() {
  const LazyHome = lazy(() => import("./components/HomePage/Home"));
  const LazyTvshow = lazy(() => import("./components/TVshows/TvShow"));
  const LazyMovies = lazy(() => import("./components/Movies/Movies"));
  const LazyLeaderboard = lazy(() =>
    import("./components/Leaderboard/Leaderboard")
  );
  const LazyHomeDetails = lazy(() =>
    import("./components/HomePage/HomeDetails/HomeDetails")
  );
  const LazyTvshowDetails = lazy(() =>
    import("./components/TVshows/TvshowDetails/TvDetails")
  );
  const LazyDashboard = lazy(() => import("./components/Dashboard/Dashboard"));
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LazyHome />} />

            <Route path="/signIn" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<LazyMovies />} />
            <Route path="/leaderboard" element={<LazyLeaderboard />} />
            <Route path="/tvshows" element={<LazyTvshow />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <LazyDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/home/:id" element={<LazyHomeDetails />} />
            <Route path="/tvshows/:id" element={<LazyTvshowDetails />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

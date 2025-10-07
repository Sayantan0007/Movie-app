import React, { useEffect, useRef, useState } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/img.png";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  // const sigIn = useSelector((state) => state.signIn);
  // const authToken = useSelector((state) => state.authToken);
  // const dispatch = useDispatch();
  let searchInput = useRef();
  const [outputRes, setOutputRes] = useState([]);
  const searchContainerRef = useRef();
  const handleSearchOnChange = () => {
    let searchInputVal = searchInput.current.value;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTI5NWJjOTkxZGRkMDI2ZDQ3MjI2ZjMwMTQxMmE1NyIsIm5iZiI6MTc0OTIwNTk3OC4xMTAwMDAxLCJzdWIiOiI2ODQyYzNkYTIwMDFhYzU5Nzc1MzlhMGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.10JpklH--KbVdqNk0eTzAtmYeeNE8x22AUte415GZK8",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchInputVal}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setOutputRes(res.results);
        // searchInput.current.value = "";
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setOutputRes([]); // Hide the result box
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    // dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    if (location.pathname == "/dashboard") {
      navigate("/");
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2">
        <NavLink
          className="navbar-brand mb-0 h1 py-2"
          to="/"
          style={{ color: "#f9c74f" }}
        >
          <i className="bi bi-camera-reels"></i> Movie app
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto nav-content d-flex align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <i className="bi bi-house-door"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies">
                <i className="bi bi-film"></i> Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tvshows">
                <i className="bi bi-tv"></i> TV shows
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/leaderboard">
                <i className="bi bi-trophy"></i> Leaderboard
              </NavLink>
            </li>
            {localStorage.getItem("token") && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  <i className="bi bi-people-fill"></i> Dashboard
                </NavLink>
              </li>
            )}
            <div className="d-flex justify-content-end">
              {localStorage.getItem("token") ? (
                <button
                  className="btn btn-danger form-control"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              ) : (
                <NavLink className="nav-link" to="/signIn">
                  <button className="btn btn-warning">
                    <i
                      className="bi bi-box-arrow-in-right"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Sign In
                  </button>
                </NavLink>
              )}
            </div>
          </ul>
        </div>
      </nav>

      {/* Search bar below navbar */}
      <div className="search-wrapper pt-4 d-flex justify-content-center">
        <div
          className="search-bar-container position-relative w-100 d-flex justify-content-center"
          style={{ maxWidth: "1500px" }}
          ref={searchContainerRef}
        >
          <input
            type="text"
            className="search-control"
            ref={searchInput}
            placeholder="Search for movies..."
            style={{ width: "90%" }}
          />
          <i
            className="bi bi-search search-icon"
            onClick={handleSearchOnChange}
          ></i>

          {outputRes.length > 0 && (
            <div className="search-results-box">
              {outputRes.map((item) => (
                <div
                  className="search-result-item"
                  key={item.id}
                  onClick={() => {
                    // handleOutsideClick();
                    setOutputRes([]);
                    setTimeout(() => {
                      navigate(`/home/${item.id}`);
                    }, 50);
                  }}
                >
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                        : img
                    }
                    alt={item.original_title}
                    className="result-thumbnail"
                  />
                  <div className="result-details">
                    <p className="result-title">{item.original_title}</p>
                    <p className="result-year">
                      {item.release_date
                        ? item.release_date.slice(0, 4)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

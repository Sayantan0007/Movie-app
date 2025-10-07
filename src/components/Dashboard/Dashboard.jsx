import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard.css";

const Dashboard = () => {
  const wishlistMovies = useSelector((state) => state.wishlist.wishlist);
  const ratedMovies = useSelector((state) => state.addstarReducer.ratedMovies);

  const dispatch = useDispatch();
  return (
    <div className="dashboard-container">
      {/* Favourite Movies Section */}
      <h2 className="dashboard-title">Your Favourite Movies</h2>
      {wishlistMovies.length === 0 ? (
        <p className="empty-message">
          You haven't added any movies to your favourites yet.
        </p>
      ) : (
        <div className="wishlist-grid">
          {wishlistMovies.map((movie, index) => (
            <div className="wishlist-card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="wishlist-img"
              />
              <div className="wishlist-info">
                <h3 className="movie-title">
                  {movie.title || movie.original_title}
                </h3>
                <p className="movie-rating">⭐ {movie.vote_average}</p>
                <div
                  className="del-btn"
                  onClick={() =>
                    dispatch({
                      type: "REMOVEWISHLIST",
                      payload: movie,
                    })
                  }
                >
                  <i className="bi bi-trash3"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rated movies */}
      <h2 className="dashboard-title">Your Rated Movies</h2>
      {ratedMovies.length === 0 ? (
        <p className="empty-message">You haven't rated any movies yet.</p>
      ) : (
        <div className="wishlist-grid">
          {ratedMovies.map((movie, index) => (
            <div className="wishlist-card rated-card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="wishlist-img"
              />
              <div className="wishlist-info">
                <h3 className="movie-title">
                  {movie.title || movie.original_title}
                </h3>
                <p className="movie-rating">
                  TMDB Rating: ⭐ {movie.vote_average}
                </p>
                <span className="rating-badge">
                  You Rated: {movie.userRating}/10
                </span>
                <div
                  className="del-btn-rating"
                  onClick={() =>
                    dispatch({
                      type: "REMOVERATEDMOVIE",
                      payload: movie,
                    })
                  }
                >
                  <i className="bi bi-trash3"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dashboard;

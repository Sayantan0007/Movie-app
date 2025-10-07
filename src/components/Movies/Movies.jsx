import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Trending from "../TrendingMovies/Trending";
import Upcoming from "../upcoming/Upcoming";
import Leaderboard from "../Leaderboard/Leaderboard";
const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTI5NWJjOTkxZGRkMDI2ZDQ3MjI2ZjMwMTQxMmE1NyIsIm5iZiI6MTc0OTIwNTk3OC4xMTAwMDAxLCJzdWIiOiI2ODQyYzNkYTIwMDFhYzU5Nzc1MzlhMGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.10JpklH--KbVdqNk0eTzAtmYeeNE8x22AUte415GZK8",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => setMovieData(res.results))
      .catch((err) => console.error(err));
  }, []);
  const navigate = useNavigate();
  const renderStars = (rating) => {
      let stars = [];
      let fullStars = Math.floor(rating / 2);
      let hasHalfStar = rating % 2 >= 1;
      for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar className="star-icon" key={`full${i}`} />);
      }
      if (hasHalfStar) {
        stars.push(<FaStarHalfAlt className="star-icon" key={"half"} />);
      }
      while (stars.length < 5) {
        stars.push(
          <FaRegStar className="star-icon" key={`empty-${stars.length}`} />
        );
      }
      return stars;
    };
  return (
    <>
      <div className="trending-container">
        <div className="header-container" style={{textAlign:"center"}}>
          <h3>Now Playing</h3>
        </div>
        <div className="trendy-container">
          {movieData.map((item) => {
            return (
              <div
                className="card card-trendy-container"
                onClick={() => navigate(`/home/${item.id}`)}
              >
                <div className="card-body card-container-body">
                  {
                    <img
                      src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
                      alt={item.title}
                    />
                  }
                  <div>
                    <p className="movie-title">{item.title}</p>
                  </div>
                  <div className="movie-rating">
                    {renderStars(item.vote_average)}
                    <span className="rating-number">
                      {item.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="trending-container">
        <div className="header-container" style={{textAlign:"center"}}>
          <h3>Trendig</h3>
        </div>
        <Trending renderStars={renderStars} />
      </div>
      <div className="trending-container">
        <div className="header-container" style={{textAlign:"center"}}>
          <h3>Upcoming movies</h3>
        </div>
        <Upcoming renderStars={renderStars}/>
      </div>
      <div className="style-footer footer-mode bg-dark">
        <div className="footer-scroll-container">
          <Leaderboard footerMode={true} />
        </div>
      </div>
      
    </>
  );
};

export default Movies;

import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./tvshow.css";
import { useNavigate } from "react-router-dom";
import TvLeader from "../TvLeaderboard/TvLeader";
const TvShow = () => {
  const [tvData, setTvData] = useState([]);
  const [airData, setAirData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTI5NWJjOTkxZGRkMDI2ZDQ3MjI2ZjMwMTQxMmE1NyIsIm5iZiI6MTc0OTIwNTk3OC4xMTAwMDAxLCJzdWIiOiI2ODQyYzNkYTIwMDFhYzU5Nzc1MzlhMGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.10JpklH--KbVdqNk0eTzAtmYeeNE8x22AUte415GZK8",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((res) => res.json())
      .then((res) => setTvData(res.results))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => setAirData(res.results))
      .catch((err) => console.error(err));
  });
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
  const navigate = useNavigate();
  return (
    <>
      <div className="tv-section style-footer">
        <h2 className="section-title">Popular TV Shows</h2>
        <div className="tvshow-container">
          {tvData.map((item) => (
            <div
              className="tv-card"
              key={item.id}
              onClick={() => navigate(`/tvshows/${item.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
                alt={item.name}
                className="tv-img"
              />
              <div className="tv-info">
                <p className="tv-title">{item.name}</p>
                <div className="tv-rating">
                  {renderStars(item.vote_average)}
                  <span className="rating-number">
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="section-title" style={{ marginTop: "30px" }}>
          Airing today
        </h2>
        <div className="tvshow-container">
          {airData.map((item) => (
            <div
              className="tv-card"
              key={item.id}
              onClick={() => navigate(`/tvshows/${item.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
                alt={item.name}
                className="tv-img"
              />
              <div className="tv-info">
                <p className="tv-title">{item.name}</p>
                <div className="tv-rating">
                  {renderStars(item.vote_average)}
                  <span className="rating-number">
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="style-footer footer-mode bg-dark">
          <div className="footer-scroll-container">
            <TvLeader footerMode={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TvShow;

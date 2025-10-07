import React, { useEffect, useState } from "react";
import "./trending.css";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Trending = ({renderStars}) => {
  const [trendingData, setTrendingData] = useState([]);
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
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    )
      .then((res) => res.json())
      .then((res) => setTrendingData(res.results))
      .catch((err) => console.error(err));
  }, []);
  const navigate = useNavigate()
  return (
    <div>
      <div className="trendy-container">
        {trendingData.map((item) => {
          return (
            <div className="card card-trendy-container" onClick={()=>navigate(`/home/${item.id}`)}>
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
                <div className="trending-section">
                  <p className="trending-word">Trending</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;

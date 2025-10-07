import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TvLeader = ({ footerMode = false }) => {
  const [data, setData] = useState([]);
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
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => setData(res.results))
      .catch((err) => console.error(err));
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <div className="top-movie-section bg-dark ">
        <h2
          className="section-title"
          onClick={() => {
            navigate("/leaderboard");
          }}
        >
          TV Shows Leaderboard
        </h2>
        {/* <span className="tooltiptext">Go to Leaderboard Page</span> */}
        <div
          className={`top-movies-container ${footerMode ? "footer-mode" : ""}`}
        >
          {data.map((item) => {
            return (
              <div
                className="top-movie-card "
                onClick={() => navigate(`/tvshows/${item.id}`)}
              >
                <div className="image-section">
                  <img
                    src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
                    alt=""
                  />
                </div>

                <div className="top-movies-info">
                  <p className="title-section">{item.original_title}</p>
                  <div className="movies-popularity">
                    <p className="movies-popularity-section">
                      Popularity:{item.popularity.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TvLeader;

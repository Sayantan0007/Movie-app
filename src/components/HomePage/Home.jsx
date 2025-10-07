import React, { useEffect, useState } from "react";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NavLink, Outlet } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Trending from "../TrendingMovies/Trending";
import Leaderboard from "../Leaderboard/Leaderboard";
import { useNavigate } from "react-router-dom";
import Upcoming from "../upcoming/Upcoming";
const Home = () => {
  let [data, setData] = useState([]);
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
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setData(res.results);
      })
      .catch((err) => console.error(err));
  }, []);
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    // fade: true,
    // centerMode: true,
    waitForAnimate: false,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

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
    <div>
      <div className="home-container">
        <Slider {...settings}>
          {data.map((item, id) => {
            return (
              <div
                className="slide-item "
                key={id}
                onClick={() => navigate(`/home/${item.id}`)}
              >
                <div className="img-container">
                  <img
                    src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
                    alt={item.title}
                  />
                </div>
                <div>
                  <p className="movie-title">
                    {item.title ? item.title.slice(0, 65) : "Movie"}
                  </p>
                </div>
                <div className="movie-rating">
                  {renderStars(item.vote_average)}
                  <span className="rating-number">
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="trending-container">
        <div className="header-container">
          <h3>Trendig</h3>
        </div>
        <Trending renderStars={renderStars} />
      </div>
      <div className="trending-container">
        <div className="header-container">
          <h3>Upcoming movies</h3>
        </div>
        <Upcoming renderStars={renderStars} />
      </div>
      <div className="style-footer footer-mode bg-dark">
        <div className="footer-scroll-container">
          <Leaderboard footerMode={true} />
        </div>
      </div>
    </div>
  );
};

export default Home;

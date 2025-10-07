import React, { useState, useEffect } from "react";
import "./starRating.css";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import "font-awesome/css/font-awesome.min.css";
import { useDispatch } from "react-redux";

const StarRating = ({ movieId, movieDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [guestId, setGuestId] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [userRating, setUserRating] = useState(null);

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
      "https://api.themoviedb.org/3/authentication/guest_session/new",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("guestId", res.guest_session_id);
        setGuestId(res.guest_session_id);
      })
      .catch((err) => console.error("Guest session fetch failed", err));
  }, []);

  const handleRating = async (rating) => {
    if (!localStorage.getItem("token")) {
      navigate("/signIn");
      return;
    }

    if (!guestId) {
      setStatusMsg("Guest session not ready. Try again in a moment.");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTI5NWJjOTkxZGRkMDI2ZDQ3MjI2ZjMwMTQxMmE1NyIsIm5iZiI6MTc0OTIwNTk3OC4xMTAwMDAxLCJzdWIiOiI2ODQyYzNkYTIwMDFhYzU5Nzc1MzlhMGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.10JpklH--KbVdqNk0eTzAtmYeeNE8x22AUte415GZK8",
      },
      body: JSON.stringify({ value: rating }), // Must be between 0.5 and 10
    };

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestId}`,
        options
      );
      const data = await res.json();

      if (data.success) {
        setStatusMsg("Thanks for rating!");
        setUserRating(rating);

        dispatch({
          type: "ADDRATING",
          payload: { movieDetails, userRating: rating },
        });
      } else {
        setStatusMsg("Failed to submit rating.");
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="star-rating-wrapper">
      <h4 className="star-heading">Rate this movie</h4>
      <ReactStars
        count={10}
        onChange={handleRating}
        size={30}
        color2={"#ffd700"}
        half={true}
        // edit={!!guestId} // Disable if guestId not ready
      />
      {userRating && (
        <p style={{ color: "#ffd700", marginTop: "0.5rem" }}>
          You rated this movie: {userRating} / 10
        </p>
      )}
      {statusMsg && (
        <p
          className="rating-status"
          style={{ color: "#fff", marginTop: "0.5rem" }}
        >
          {statusMsg}
        </p>
      )}
    </div>
  );
};

export default StarRating;

import React, { useEffect, useState } from "react";
import "./tvdetails.css";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
const TvDetails = () => {
  const { id } = useParams();
  const [wikidata_id, setWikidata_id] = useState("");
  const [fResults, setFResults] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [genre, setGenre] = useState([]);
  const [matchedGenre, setMatchedGenre] = useState([]);
  const [videoClips, setVideoClips] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTI5NWJjOTkxZGRkMDI2ZDQ3MjI2ZjMwMTQxMmE1NyIsIm5iZiI6MTc0OTIwNTk3OC4xMTAwMDAxLCJzdWIiOiI2ODQyYzNkYTIwMDFhYzU5Nzc1MzlhMGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.10JpklH--KbVdqNk0eTzAtmYeeNE8x22AUte415GZK8",
    },
  };
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${Number(id)}/external_ids`, options)
      .then((res) => res.json())
      .then((res) => setWikidata_id(res.wikidata_id))
      .catch((err) => console.error(err));
  }, [id]);
  useEffect(() => {
    if (!wikidata_id) return;
    fetch(
      `https://api.themoviedb.org/3/find/${wikidata_id}?external_source=wikidata_id`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.tv_results);
        setFResults(res.tv_results);
      })
      .catch((err) => console.error(err));
  }, [wikidata_id]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        const trailer = res.results.find((opt) => opt.site == "YouTube");
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        } else {
          setTrailerUrl(null);
        }
        const clips = res.results.filter((option) => {
          return (
            (option.site == "YouTube" && option.type == "Clip") ||
            option.type == "Clip" ||
            option.type == "Clip"
          );
        });
        setVideoClips(clips);
      })
      .catch((err) => console.error(err));
  }, [id]);
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/tv/list?language=en", options)
      .then((res) => res.json())
      .then((res) => setGenre(res.genres))
      .catch((err) => console.error(err));
  }, []);
  // console.log(genre);
  useEffect(() => {
    if (fResults.length > 0 && genre.length > 0) {
      let matched_genName = genre.filter((gen) => {
        return fResults[0].genre_ids.includes(gen.id);
      });
      // console.log(matched_genName)
      setMatchedGenre(matched_genName);
    }
  }, [fResults, genre]);

  // console.log(matchedGenre);
  return (
    <div>
      <div className="tv-details-container">
        {fResults[0] ? (
          <div className="tv-details-movie-card">
            <div className="tv-details-title-section">
              <h4>{fResults[0].original_name}</h4>
            </div>
            <div className="tv-item-detail">
              <div className="tv-genre-display">
                {matchedGenre.map((gen) => {
                  return <p className="tv-media-type">{gen.name}</p>;
                })}
              </div>

              <p>{fResults[0].overview}</p>
              <div className="tv-detail-img-container">
                <img
                  src={`https://image.tmdb.org/t/p/w400${fResults[0].poster_path}`}
                  alt=""
                />
              </div>
              <div className="tv-watch-button">
                {trailerUrl ? (
                  <a
                    href={trailerUrl}
                    target="_blank"
                    className="btn btn-warning mt-3"
                  >
                    Watch trailer
                  </a>
                ) : (
                  <p className="tv-no-teaser-message">No trailer available</p>
                )}
              </div>
              {videoClips.map((videos) => {
                return (
                  <div className="tv-video-container">
                    <iframe
                      width="100%"
                      height="400"
                      src={`https://www.youtube.com/embed/${videos.key}`}
                      title="Clips"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default TvDetails;

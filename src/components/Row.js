import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../components/styles/row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original/";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=4e5d32559e5978b918939c9ee4f373c0&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => {
          setTrailerUrl(data.results[0].key);
        })
        .catch((err) => console.log(err));
      // movieTrailer(movie?.name || "")
      //   .then((url) => {
      //     const urlParams = new URLSearchParams(new URL(url).search);
      //     setTrailerUrl(urlParams.get("v"));
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  };

  return (
    <div className="row">
      {/* title */}
      <div className="row_title">
        <h3>{title}</h3>
      </div>

      {/* poster container */}
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${baseUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          );
        })}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

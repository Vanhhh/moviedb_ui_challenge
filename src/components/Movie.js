import React from "react";
import moment from "moment";

const Movie = ({ movie, ...rest }) => {
  console.log(movie);
  return (
    <div {...rest}>
      <img
        src={`//image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
        alt={movie.title + " - Poster"}
      />
      <h3>{movie.title}</h3>
      <h4>{moment(movie.release_date).format("DD.MM.YYYY")}</h4>
      <span>{movie.vote_average}</span>
    </div>
  );
};

export default Movie;

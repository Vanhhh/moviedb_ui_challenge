import React from "react";
import moment from "moment";

const Movie = ({ movie, ...rest }) => {
  console.log(movie);
  return (
    <div {...rest}>
      <img
        className="movie__img"
        src={`//image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
        alt={movie.title + " - Poster"}
      />
      <div className="movie__bottom-container">
        <h3 className="movie__title">{movie.title}</h3>
        <h4 className="movie__date">
          {moment(movie.release_date).format("DD.MM.YYYY")}
        </h4>
      </div>
      <span className="movie__vote">{movie.vote_average}</span>
    </div>
  );
};

export default Movie;

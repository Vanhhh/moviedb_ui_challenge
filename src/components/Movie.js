import React from "react";
import moment from "moment";
import styled from "styled-components";

////styled-components////

///colors////
const colorblue = "#28a5ff";
const colorwhite = "#ffffff";
const MovieImg = styled.div`
  height: 27.27vw;
  border-radius: 0.5rem;
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: all 0.5s;
`;

const MovieVote = styled.span`
  background: ${(props) => (props.movie__vote = colorblue)};
  border-radius: 0.5rem;
  color: ${(props) => (props.movie__vote = colorwhite)};
  font-size: 2rem;
  line-height: 2.6rem;
  padding: 1.1rem 0.9rem;
  position: absolute;
  z-index: 1;
  bottom: 1rem;
  right: 1rem;
`;

const MovieBottomContainer = styled.div`
  text-align: left;
  margin-top: 1.6rem;
`;
const MovieTitle = styled.h3`
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.6rem;
  margin-bottom: 0.3rem;
`;
const MovieDate = styled.h4`
  font-weight: 400;
  font-size: 1.4rem;
  color: $color-gray;
  line-height: 1.8rem;
`;

const Movie = ({ movie, ...rest }) => {
  console.log(movie);
  return (
    <div {...rest}>
      <MovieImg
        className="movie__img"
        style={{
          backgroundImage: `url(//image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path})`,
        }}
      >
        <MovieVote className="movie__vote">{movie.vote_average}</MovieVote>
      </MovieImg>
      <MovieBottomContainer className="movie__bottom__container">
        <MovieTitle className="movie__title">{movie.title}</MovieTitle>
        <MovieDate className="movie__date">
          {moment(movie.release_date).format("DD.MM.YYYY")}
        </MovieDate>
      </MovieBottomContainer>
    </div>
  );
};

export default Movie;

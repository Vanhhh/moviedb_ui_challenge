import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { TMDB_API_KEY } from "../api/key";
import Movie from "./Movie";
import styled from "styled-components";
import { Search } from "react-feather";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [queryText, setQueryText] = useState("");
  const [query, setQuery] = useState(" ");

  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false&840`
      )
      .then((res) => {
        setData(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  useEffect(() => {
    if (loading) {
      setQuery(searchInput.current.value);
    }
  }, [loading]);

  const onSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
  };

  ////styled-components////

  ///colors////
  const colorblue = "#28a5ff";

  const MovieList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    grid-column-gap: 7%;
    margin-top: 4rem;
    width: 80%;
    margin: 4rem auto 0 auto;
  `;

  const WebTitle = styled.h1`
    font-weight: bold;
    font-size: 4rem;
    line-height: 4rem;
    margin: 4.8rem;
  `;
  const TitleMovie = styled.span`
    color: ${(props) => (props.title__movie = colorblue)};
  `;

  const SearchSubMit = styled.button`
    background: ${(props) => (props.search__submit = colorblue)};
    width: 5.6rem;
    height: 5.6rem;
    left: 35.8rem;
    top: 0rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
  `;

  const movieListHtmlElement =
    data && data.length ? (
      <MovieList className="movieList">
        {data.map((item) => (
          <Movie key={item.id} movie={item} className="movie" />
        ))}
      </MovieList>
    ) : (
      <span></span>
    );

  return (
    <div className="App">
      <WebTitle className="web__title">
        <TitleMovie id="title__movie">Movie</TitleMovie>
        <span>DB</span>
      </WebTitle>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Type in search query..."
          className="search__input"
          value={queryText}
          ref={searchInput}
          onChange={(e) => setQueryText(e.value)}
        />
        <SearchSubMit className="search__submit">
          <Search color="white" />
        </SearchSubMit>
      </form>
      {loading ? <p>Loading...</p> : movieListHtmlElement}
    </div>
  );
}

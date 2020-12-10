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
  const colorwhitegray = "#f4f4f4";

  const MovieList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    grid-column-gap: 7%;
    margin-top: 4rem;
    width: 80%;
    margin: 4rem auto 0 auto;
  `;
  const Movie = styled.div`
    margin-bottom: 3rem;
    overflow: hidden;
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
  const SearchInput = styled.input`
    background: ${(props) => (props.search__input = colorwhitegray)};
    font-size: 1.8rem;
    line-height: 2.3rem;
    width: 35rem;
    height: 5.6rem;
    left: 0rem;
    top: calc(50% - 56rem / 2);
    border: none;
    border-radius: 0.5rem;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin-right: 0.8rem;
    cursor: pointer;
    padding: 1.65rem 0;
    padding-left: 1.6rem;
    box-sizing: border-box;
    transition: all 0.2s;
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
  const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const App = styled.div`
    text-align: center;
    font-family: "IBM Plex Sans", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 2rem;
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
    <App className="app">
      <WebTitle className="web__title">
        <TitleMovie id="title__movie">Movie</TitleMovie>
        <span>DB</span>
      </WebTitle>
      <Form className="form" onSubmit={onSubmit}>
        <SearchInput
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
      </Form>
      {loading ? <p>Loading...</p> : movieListHtmlElement}
    </App>
  );
}

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { TMDB_API_KEY } from "../api/key";
import Movie from "./Movie";
{
  /*import { Search } from "react-feather";*/
}

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

  const movieListHtmlElement =
    data && data.length ? (
      <div className="movieList">
        {data.map((item) => (
          <Movie key={item.id} movie={item} className="movie" />
        ))}
      </div>
    ) : (
      <span>Bitte suche etwas</span>
    );

  return (
    <div className="App">
      <h1 className="web__title">
        <span id="title__movie">Movie</span>
        <span>DB</span>
      </h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Type in search query..."
          className="search"
          value={queryText}
          ref={searchInput}
          onChange={(e) => setQueryText(e.value)}
        />

        {/*<Search className="search-submit" color="white"/>*/}
        <input type="submit" value="Suchen" className="search-submit" />
      </form>
      {loading ? <p>Loading...</p> : movieListHtmlElement}
    </div>
  );
}

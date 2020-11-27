import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { TMDB_API_KEY } from "../api/key";

import Movie from "./Movie";

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

  return (
    <div className="App">
      <h1>MovieDB</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="search"
          value={queryText}
          ref={searchInput}
          onChange={(e) => setQueryText(e.value)}
        />
        <input type="submit" value="Suchen" />
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : data && data.length ? (
        data.map((item) => <Movie key={item.id} movie={item} />)
      ) : (
        <span>Bitte suche etwas</span>
      )}
    </div>
  );
}

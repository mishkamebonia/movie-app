import "./Search.scss";
import { useState } from "react";

const Search = (props) => {
  const { setSearchList, searchApi, placeholder } = props;
  const [query, setQuery] = useState("");

  const search = async (e) => {
    e.preventDefault();

    try {
      const url = `${searchApi}&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setSearchList(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-input">
      <label htmlFor="search">
        <i className="fa-solid fa-magnifying-glass"></i>
      </label>
      <form onSubmit={search}>
        <input
          id="search"
          placeholder={placeholder}
          type="search"
          value={query}
          onChange={changeHandler}
        />
      </form>
    </div>
  );
};

export default Search;

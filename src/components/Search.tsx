import "./Search.scss";

const Search = () => {
  return (
    <div className="search-input">
      <label htmlFor="search">
        <i className="fa-solid fa-magnifying-glass"></i>
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search for movies or TV series"
      />
    </div>
  );
};

export default Search;

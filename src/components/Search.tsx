import "./Search.scss";

const Search = (props) => {
  const { onSearch, placeholder } = props;

  return (
    <div className="search-input">
      <label htmlFor="search">
        <i className="fa-solid fa-magnifying-glass"></i>
      </label>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);

          onSearch(formData.get("search"));
        }}
      >
        <input
          id="search"
          placeholder={placeholder}
          type="search"
          name="search"
        />
      </form>
    </div>
  );
};

export default Search;

import * as React from "react";
import "./Search.scss";
import { Button, Backdrop } from "@mui/material";

const Search = (props) => {
  const { onSearch, placeholder } = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    if (placeholder === "Search for movies or TV series") {
      setOpen(false);
    }
  };
  const handleOpen = () => {
    if (placeholder === "Search for movies or TV series") {
      setOpen(true);
    }
  };

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
          onClick={handleOpen}
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <h1>hello</h1>
        </Backdrop>
      </form>
    </div>
  );
};

export default Search;

import { useState } from "react";
import Router from "next/router";
import { SearchOutlined } from "@ant-design/icons";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      Router.push(`/products/search?name=${keyword}`);
      setKeyword("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products... "
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;

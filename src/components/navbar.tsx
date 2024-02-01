import React from "react";
import SearchBar from "./ui/searchBar";
import Menu from "./ui/menu";

const Navbar: React.FC = () => {
  return (
    <div className="flex p-2 justify-between items-center">
      <SearchBar />
      <Menu />
    </div>
  );
};

export default Navbar;

import React from "react";
import SearchBar from "./ui/searchBar";
import Menu from "./ui/menu";

const Navbar: React.FC = () => {
  return (
    <div className="flex p-4 bg-[#18181B]  border-b-2 border-gray-700/30 justify-end  items-center relative z-10">
      <SearchBar />
      <Menu />
    </div>
  );
};

export default Navbar;

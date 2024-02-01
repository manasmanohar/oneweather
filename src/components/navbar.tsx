import React from "react";
import SearchBar from "./ui/searchBar";
import Menu from "./ui/menu";
import { useWeatherContext } from "../context/weatherContext";

const Navbar: React.FC = () => {
  const { handleUpdateLocation } = useWeatherContext();

  return (
    <div className="flex m-2 p-2 justify-between items-center">
      <SearchBar onSearch={(location) => console.log(location)} />
      <Menu onUpdateLocation={handleUpdateLocation} />
    </div>
  );
};

export default Navbar;

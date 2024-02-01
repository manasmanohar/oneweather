import React from "react";
import { fetchReverseGeocoding } from "../../api/reverseGeocoding";
import { LocationData } from "../../types/types";
import { IoIosSearch } from "react-icons/io";

interface SearchBarProps {
  onSearch: (location: LocationData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const handleSearch = async () => {
    try {
      const newLocation = await fetchReverseGeocoding(searchQuery);
      if (newLocation) {
        onSearch(newLocation);
      }
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mr-2">
        {" "}
        <input
          className="rounded-md bg-black  ring-2 ring-neutral-700  "
          type="text"
          placeholder=" city name / zip code"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="items-center mt-1 flex-inline">
        <button
          className="ring-2 ring-neutral-700  p-1 rounded "
          onClick={handleSearch}
        >
          <IoIosSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
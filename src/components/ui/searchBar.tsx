import React, { useEffect, useRef } from "react";
import { fetchReverseGeocoding } from "../../api/reverseGeocoding";
import { IoIosSearch } from "react-icons/io";
import { useWeatherContext } from "../../context/weatherContext";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const { updateData } = useWeatherContext();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    try {
      const newLocation = await fetchReverseGeocoding(searchQuery);
      if (newLocation) {
        console.log(newLocation, "from search bar");
        await updateData(newLocation);
      }
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
      handleSearch();
    }
  };

  useEffect(() => {
    const handleKeyShortcut = (event: KeyboardEvent) => {
      const isCmdOrCtrlKey = event.metaKey || (event.ctrlKey && !event.altKey);
      if (isCmdOrCtrlKey && event.key.toLowerCase() === "j") {
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyShortcut);

    return () => {
      document.removeEventListener("keydown", handleKeyShortcut);
    };
  }, []);

  return (
    <div className="flex items-center justify-center mr-4">
      <div className="mr-2">
        <input
          ref={searchInputRef}
          className="rounded-md bg-[#18181B] ring-2 mr-2 ring-gray-700/30 p-1"
          type="text"
          placeholder="Search city... CMD+ J"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="items-center flex-inline">
        <button
          className="ring-2 ring-neutral-700 p-1 rounded"
          onClick={handleSearch}
        >
          <IoIosSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

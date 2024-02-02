import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./themeToggle";
import UnitToggle from "./unitToggle";
import { useWeatherContext } from "../../context/weatherContext";
import { useTheme } from "../../context/themeContext";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
const Menu = () => {
  const { location, updateData } = useWeatherContext();
  const { unit } = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUpdateUnit = async () => {
    // toggleUnit();
    const updatedUnit = unit === "metric" ? "imperial" : "metric";

    console.log("Updated unit in Menu:", updatedUnit); // Log the updated unit
    console.log("Location in Menu:", location);

    updateData(location, updatedUnit);
    if (location) {
      await updateData(location, unit);
    }
  };

  return (
    <div className="flex 999 " ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className=" rounded-md"
        type="button"
        aria-haspopup="menu"
        aria-expanded={isDropdownOpen}
      >
        {isDropdownOpen ? (
          <RiArrowDropUpLine size={32} />
        ) : (
          <RiArrowDropDownLine size={32} />
        )}
      </button>
      {isDropdownOpen && (
        <div className="z-999 absolute right-0 mt-12 gap-2 mr-4  lg:w-[20%] w-[40%]   bg-[#18181B]  flex flex-col  p-2  bg-background ring-1 ring-gray-700  rounded-lg">
          {" "}
          <ThemeToggle />
          {/* <UnitToggle onUpdateUnit={handleUpdateUnit} /> */}
          <UnitToggle onUpdateUnit={handleUpdateUnit} />
        </div>
      )}
    </div>
  );
};

export default Menu;

import React from "react";
import { useTheme } from "../../context/themeContext";
import { RiCelsiusFill } from "react-icons/ri";
import { RiFahrenheitFill } from "react-icons/ri";
import { FaTemperatureQuarter } from "react-icons/fa6";

import { useWeatherContext } from "../../context/weatherContext";

interface UnitToggleProps {
  onUpdateUnit: () => Promise<void>;
}
const UnitToggle: React.FC<UnitToggleProps> = ({ onUpdateUnit }) => {
  const { location, updateData } = useWeatherContext();
  const { toggleUnit, unit } = useTheme();
  const handleToggleUnit = async () => {
    console.log(unit);
    const updatedUnit = unit === "metric" ? "imperial" : "metric";
    toggleUnit(unit);
    if (location) {
      updateData(location, updatedUnit);
    }
    await onUpdateUnit();
  };

  return (
    <div className="rounded-md inline-flex">
      <button
        className="inline-flex items-center justify-center ring-1 h-full py-4 ring-gray-700 rounded-md  w-full"
        onClick={handleToggleUnit}
      >
        <FaTemperatureQuarter className="mr-4" />
        {unit === "metric" ? (
          <p>
            <RiCelsiusFill size={20} />
          </p>
        ) : (
          <RiFahrenheitFill size={20} />
        )}
        <span className="sr-only">Toggle unit{}</span>
      </button>
    </div>
  );
};

export default UnitToggle;

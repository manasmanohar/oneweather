import React from "react";
import { useTheme } from "../../context/themeContext";
import { RiCelsiusFill } from "react-icons/ri";
import { RiFahrenheitFill } from "react-icons/ri";
import { FaTemperatureQuarter } from "react-icons/fa6";

interface UnitToggleProps {
  onUpdateUnit: () => Promise<void>;
}
const UnitToggle: React.FC<UnitToggleProps> = ({ onUpdateUnit }) => {
  const { toggleUnit, unit } = useTheme();

  const handleToggleUnit = () => {
    toggleUnit();
    onUpdateUnit();
  };

  return (
    <div className=" rounded-md inline-flex">
      {" "}
      <button
        className="inline-flex items-center justify-center border rounded-md h-8 w-full"
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

import { FiSunset } from "react-icons/fi";
const FeelsLikeWidget = () => {
  return (
    <div className="flex flex-col justify-between h-full gap-8 ring-1 ring-slate-700 rounded-lg p-4 w-1/2   ">
      <div className="flex flex-col  gap-y-2  ">
        <div className="flex gap-2 top items-center">
          {" "}
          <FiSunset size={20} />
          <p className="font-bold text-sm">Sunset</p>
        </div>
        <div>
          <p className="font-bold">4:41 PM</p>
        </div>
      </div>
      <div className=" mt-">
        <p>Sunrise: 8:04 AM</p>
      </div>
    </div>
  );
};

export default FeelsLikeWidget;

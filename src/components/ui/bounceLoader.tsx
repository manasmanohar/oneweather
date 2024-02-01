import React from "react";
import { BounceLoader } from "react-spinners";

interface BounceLoaderProps {
  active: boolean;
  color: string;
  size: number;
}

export const BounceLoaderComponent: React.FC<BounceLoaderProps> = ({
  active,
  color,
  size,
}) => {
  return (
    <div
      style={{
        display: active ? "flex" : "none",
        position: "fixed",
        bottom: "5%",
        right: "5%",
        zIndex: 1000,
      }}
      className="absolute bottom-4 right-4"
    >
      <BounceLoader color={color} size={size} />
    </div>
  );
};

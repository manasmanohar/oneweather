import React, { useState, useEffect } from "react";

interface ClockProps {
  timezoneOffset: number;
}

const Clock: React.FC<ClockProps> = ({ timezoneOffset }) => {
  const [cityTime, setCityTime] = useState<Date | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentUtcTime = new Date();
      const offset = currentUtcTime.getTimezoneOffset() * 60000;
      const cityUtcTime =
        currentUtcTime.getTime() + offset + timezoneOffset * 1000;
      setCityTime(new Date(cityUtcTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timezoneOffset]);

  if (!cityTime) {
    return null;
  }

  const formattedDateTime = cityTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const dayOfWeek = cityTime.toLocaleDateString(undefined, {
    weekday: "long",
  });

  return (
    <p className="font-bold">
      {dayOfWeek} {formattedDateTime}
    </p>
  );
};

export default Clock;

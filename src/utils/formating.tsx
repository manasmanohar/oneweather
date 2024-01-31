export const capitalizeEveryWord = (input: string): string => {
  if (typeof input !== "string") {
    throw new Error("Input must be a string");
  }

  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${day}, ${time}`;
};

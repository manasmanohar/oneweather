/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          background: "#FFFFFF",
          text: "hsl(210, 5%, 10%)",
          primary: "hsl(200, 90%, 60%)",
          accent: "hsl(40, 100%, 60%)",
          border: "hsl(210, 15%, 89%)",
        },

        dark: {
          background: "hsl(210, 10%, 98%)",
          text: "hsl(210, 5%, 10%)",
          primary: "hsl(200, 90%, 60%)",
          accent: "hsl(40, 100%, 60%)",
          border: "hsl(210, 15%, 89%)",
        },
      },
    },
  },
  plugins: [],
};

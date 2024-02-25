/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: "390px auto",
      },
      spacing: {
        "2px": "2px",
      },
    },
  },
  plugins: [],
};

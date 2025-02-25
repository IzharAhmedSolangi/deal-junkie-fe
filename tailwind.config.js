/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    screens: {
      xs: "320px",
      sm: "600px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      primary: "#01E678",
      secondary: "#022247",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      proxima: ["Proxima Nova"],
    },
  },
};
export const plugins = [];

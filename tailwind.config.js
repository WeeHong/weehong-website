module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#2f80ed",
      },
      fontFamily: {
        sans: ["'Noto Sans'", "Lobster"],
      },
    },
  },
  plugins: [],
};

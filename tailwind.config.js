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
        noto: ["'Noto Sans'", "sans-serif"],
        ibm: ["'IBM Plex Mono'", "monospace"],
      },
      height: {
        136: "38rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

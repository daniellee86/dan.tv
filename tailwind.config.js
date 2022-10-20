//EXTEND TAILWINDS COLOURS WITH OUR THEME
const themeColors = require("./theme-colors.json");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      sepia: {
        25: ".25",
        50: ".50",
        75: ".75",
      },
      width: {
        1600: "1600px",
        300: "300px",
        350: "350px",
        400: "400px",
        450: "450px",
        210: "210px",
        550: "550px",
        260: "260px",
        650: "650px",
      },
      height: {
        600: "600px",
        280: "280px",
        900: "900px",
        458: "458px",
      },
      top: {
        " 50%": "50%",
      },
      backgroundColor: {
        primary: "#F1F1F2",
        blur: "#030303",
      },
      colors: {
        ...themeColors,
      },
      height: {
        "88vh": "88vh",
      },
      backgroundImage: {
        "blurred-img":
          "url('https://raw.githubusercontent.com/daniellee86/danielCloughPortfolio/main/src/assets/noise.gif')",
      },
      boxShadow: {
        sidebarHover:
          "inset 5px 5px 10px #090808, inset -5px -5px 10px #171616",
        forYou: "5px 5px 10px #090808, -5px -5px 10px #171616;",
      },
    },
  },
  plugins: [],
};

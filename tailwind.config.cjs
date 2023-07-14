const config = {
  content: ["*.html", "./src/**/*.{html,js,svelte,vue,ts}"],

  theme: {
    extend: {
      colors: {
        primaryTeal: "#00768a",
        primaryPoppyRed: "#ef3e3d",
        primaryPurple: "#211746",
        primaryDarkGrey: "#5d594d",
        secondaryCoolGrey: "#a1a1a4",
        secondaryGold: "#c1962e",
        secondaryBlue: "#5aa3d2",
        secondaryGreen: "#b0d239",
        huh: "#211746"
      }
    },
    fontFamily: {
      sans: [
        "Lato",
        "Roboto",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif"
      ],
      serif: [
        "Merriweather",
        "Charter",
        "Bitstream Charter",
        "Sitka Text",
        "Cambria",
        "serif"
      ]
    }
  },
  plugins: []
}

module.exports = config;

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
        secondaryGreen: "#b0d239"
      }
    },
    fontFamily: {
      sans: [
        "Lato",
        "'Source Sans 3'",
        "Roboto",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "'Segoe UI'",
        "'Helvetica Neue'",
        "Arial",
        "'Noto Sans'",
        "sans-serif"
      ],
      serif: [
        "Merriweather",
        "Georgia",
        "Cambria",
        "Charter",
        "'Bitstream Charter'",
        "'Sitka Text'",
        "'Noto Serif'",
        "serif"
      ]
    }
  },
  plugins: []
}

module.exports = config;

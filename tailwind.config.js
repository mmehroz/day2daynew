module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        primary: "64px",
        sides: "24px",
      },
      colors: {
        primary: "#f4f4f5",
        background: "#fafafa",
        primaryText: "#1e293b",
        backgroundColorSecondary: "#f4f4f5",
        cardBg: "#cardBg",
        secondaryTextColor: "#1e293b",
        borderColor: "#4b5563",
        backgroundColorThird: "#d4d4d8",
        main: "#fe9413",
        mainSecondary: "#fa545e",
      },
      fontSize: {
        sx: "14px",
        base: "16px",
        sm: "18px",
        tiny: "20px",
        md: "24px",
      },
      borderRadius: {
        tiny: "4px",
      },
      screens: {
        "3xl": "1800px",
        "4xl": "1950px",
        "2k": "2000px",
      },
      animation: {
        loader: "ping 0.2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
    fontFamily: {
      primary: ["Open Sans", "sans-serif"],
      fashion: ["Satisfy", "cursive"],
    },
  },
  plugins: [],
};

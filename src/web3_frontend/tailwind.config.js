/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"], // Ensure it scans your files
    theme: {
      extend: {
        fontFamily :{
          'aeonik' : ['Aeonik', 'sans-serif'],
        }
      },
    },
    plugins: [
      require("@tailwindcss/typography"),
    ],
  };
  
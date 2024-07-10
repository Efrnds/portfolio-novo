/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { default: "#F0F0E9" },
      fontFamily: {
        Urbanist: ["Urbanist", "sans-serif"],
        UrbanistBold: ["Urbanist-Bold", "sans-serif"]
      },
    },
    plugins: [],
  }
}
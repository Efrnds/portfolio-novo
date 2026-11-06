/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "!./src/product-slices/upstream/**",
    "!./src/product-slices/generated/**",
    "!./src/product-slices/compat/**",
    "!./src/product-slices/screens/**",
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

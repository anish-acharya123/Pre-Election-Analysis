/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "user-guide": "url('/src/assets/votingImage/userguide.jpg')",
      },
    },
  },
  plugins: [],
};

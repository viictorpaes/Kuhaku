/** @type {import('tailwindcss').Config} */
export default 
{
  content: 
  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: 
  {
    extend: 
    {
      colors: 
      {
        darkBg: '#0d1531',
        cardBg: '#10193d',
      }
    },
  },
  
  plugins: [],
}
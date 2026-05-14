/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          bg: '#09090b',          // The deep black/slate background
          card: '#121214',        // Slightly lighter gray for the dashboard cards
          border: '#27272a',      // Subtle dark gray for borders
          primary: '#00e5bf',     // The vibrant cyan/teal accent color
          primaryHover: '#00c4a3',// A slightly darker cyan for button hovers
          textMain: '#f8fafc',    // Pure white for primary readable text
          textMuted: '#a1a1aa',   // Soft gray for labels and secondary text
        }
      },
      fontFamily: {
        // You can use font-sans for standard text, and font-serif for big headings
        sans: ['Inter', 'system-ui', 'sans-serif'], 
        serif: ['Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      height:{
        'screen-dynamic': 'calc(var(--vh,1vh) * 100)'
      },
      minHeight:{
        'screen-dynamic': 'calc(var(--vh,1vh) * 100)'
      }
    },
  },
  plugins: [],
}


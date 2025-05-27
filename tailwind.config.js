export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      height: {
        "screen-dynamic": "calc(var(--vh,1vh) * 100)",
        "screen-dynamic-minus-header": "calc(var(--vh,1vh) * 100 - 50px)",
      },
      minHeight: {
        "screen-dynamic": "calc(var(--vh,1vh) * 100)",
      },
    },
  },
  plugins: [],
};


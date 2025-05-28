export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      height: {
        "screen-dynamic": "calc(var(--vh,1vh) * 100)",
        "screen-dynamic-minus-header": "calc(var(--vh,1vh) * 100 - 50px)",
        "screen-80-minus-header": "calc(var(--vh,1vh) * 80 - 50px)",
        "screen-60-minus-header": "calc(var(--vh,1vh) * 58 - 50px)",
      },
      minHeight: {
        "screen-dynamic": "calc(var(--vh,1vh) * 100)",
      },
      boxShadow: {
        around: "0 1px 3px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};


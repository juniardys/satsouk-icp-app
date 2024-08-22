import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(90deg, #F43F5E 25%, #FCD34D 100%);",
        "primary-gradient-2":
          "linear-gradient(90deg, #F43F5E 25%, #F59E0B 100%);",
      },
      colors: {
        "primary-gradient":
          "linear-gradient(90deg, #F43F5E 25%, #FCD34D 100%);",
        "primary-gradient-2":
          "linear-gradient(90deg, #F43F5E 25%, #F59E0B 100%);",
      },
    },
  },
  plugins: [],
};
export default config;

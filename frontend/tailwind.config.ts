import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "text-animation": "text-animation 0.8s forwards",
        "text-animation-op": "text-animation-op 0.8s forwards",
      },
      keyframes: {
        "text-animation": {
          "0%": { opacity: "0", transform: "translateY(-1rem)" },
          "100%": { opacity: "1", transform: "translateY(0rem)" },
        },
        "text-animation-op": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animationDelay: {
        "1": "0.4s",
        "2": "0.6s",
        "3": "0.8s",
        "4": "1s",
        "5": "1.2s",
        "6": "1.4s",
        "7": "1.6s",
        "8": "1.8s",
        "9": "2.0s",
        "10": "2.2s",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".horizontal-tb": {
          writingMode: "horizontal-tb",
        },
        ".vertical-rl": {
          writingMode: "vertical-rl",
          "-ms-writing-mode": "tb-rl",
        },
        ".vertical-lr": {
          writingMode: "vertical-lr",
        },
        ".rtl": {
          direction: "rtl",
        },
      };
      addUtilities(newUtilities);
    }),
    plugin(function ({ addUtilities, theme, e }) {
      const animationDelays = theme("animationDelay") || {};
      const animationDelayUtilities: Record<string, any> = {};
      Object.keys(animationDelays).forEach((key) => {
        const utilityName = `.animation-delay-${e(key)}`;
        animationDelayUtilities[utilityName] = {
          animationDelay: animationDelays[key],
        };
      });
      addUtilities(animationDelayUtilities);
    }),
  ],
};
export default config;

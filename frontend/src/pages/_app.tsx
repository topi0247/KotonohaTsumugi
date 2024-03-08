import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Shippori_Mincho_B1 } from "next/font/google";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { _Headers } from "@/components/_headers";

const ShipporiMinchoB1 = Shippori_Mincho_B1({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <div className={ShipporiMinchoB1.className}>
        <_Headers />
        <main className="max-w-[1200px] h-screen m-auto">
          <Component {...pageProps} />
        </main>
        <footer></footer>
      </div>
    </ThemeProvider>
  );
}

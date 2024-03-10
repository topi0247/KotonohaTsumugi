import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Shippori_Mincho_B1 } from "next/font/google";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { _Headers } from "@/components/_headers";
import { AuthProvider } from "@/providers/auth";

const ShipporiMinchoB1 = Shippori_Mincho_B1({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <div
          className={`${ShipporiMinchoB1.className} flex max-h-screen overflow-y-hidden`}
        >
          <div className="ml-auto flex flex-col vertical-rl">
            <_Headers />
            <main className="max-w-[1100px] w-full h-screen m-auto mr-[26px]">
              <Component {...pageProps} />
            </main>
          </div>
          <footer className="fixed bottom-0 w-full flex justify-center items-center">
            ©ことのはつむぎ
          </footer>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

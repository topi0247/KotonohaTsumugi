import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Shippori_Mincho_B1 } from "next/font/google";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { _Headers } from "@/components/_headers";
import { AuthProvider } from "@/providers/auth";
import { useEffect, useRef } from "react";

const ShipporiMinchoB1 = Shippori_Mincho_B1({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   screenRef.current!.onwheel = (e) => {
  //     e.preventDefault();

  //     let delta = (-e.deltaY / Math.abs(e.deltaY)) * window.innerWidth;
  //     if (delta > 0) {
  //       delta += screenRef.current!.scrollLeft;
  //       delta = Math.floor(delta / window.innerWidth) * window.innerWidth;
  //     } else {
  //       delta += screenRef.current!.scrollLeft;
  //       delta = Math.ceil(delta / window.innerWidth) * window.innerWidth;
  //     }
  //     screenRef.current!.scrollLeft = delta;
  //   };
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <div className={`${ShipporiMinchoB1.className} flex max-h-screen`}>
          <div
            ref={screenRef}
            className="ml-auto flex flex-col vertical-rl w-full hidden-scrollbar"
          >
            <_Headers />
            <main className="h-screen m-auto">
              <Component {...pageProps} />
            </main>
          </div>
          <footer className="fixed bottom-0 w-full flex justify-center items-center mb-4 bg-white ">
            ©言の葉つむぎ
          </footer>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

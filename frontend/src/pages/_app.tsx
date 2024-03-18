import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Shippori_Mincho_B1 } from "next/font/google";
import { _Headers } from "@/pages/components/_headers";
import { useRef } from "react";
import { AppProvider } from "@/providers";

const ShipporiMinchoB1 = Shippori_Mincho_B1({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  return (
    <AppProvider>
      <div className={`${ShipporiMinchoB1.className} flex max-h-screen`}>
        <div
          ref={screenRef}
          className="ml-auto flex flex-col vertical-rl w-full hidden-scrollbar"
        >
          <_Headers />
          <main className="w-full flex">
            <Component {...pageProps} />
          </main>
        </div>
        <footer className="fixed bottom-0 w-full flex justify-end items-center p-4">
          ©言の葉つむぎ
        </footer>
      </div>
    </AppProvider>
  );
}

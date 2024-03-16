import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { ReadingProvider } from "./reading";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ReadingProvider>{children}</ReadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

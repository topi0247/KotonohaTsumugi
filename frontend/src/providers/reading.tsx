import { ReactNode, createContext, useContext, useState } from "react";

interface ReadingType {
  isReading: boolean;
  setIsReading: (isReading: boolean) => void;
}

interface ReadingProviderProps {
  children: ReactNode;
}

const ReadingContext = createContext<ReadingType | undefined>(undefined);

export const useRead = () => {
  const context = useContext(ReadingContext);
  if (context === undefined) {
    throw new Error("useRead must be used within a ReadingProvider");
  }
  return context;
};

export const ReadingProvider = ({ children }: ReadingProviderProps) => {
  const [isReading, setIsReading] = useState(false);

  const value = {
    isReading,
    setIsReading,
  };

  return (
    <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>
  );
};

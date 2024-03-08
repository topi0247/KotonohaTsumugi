import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";

type UserProps = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type AuthContextProps = {
  user: UserProps | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ status: number }>;
  logout: () => void;
  signUp: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<{ status: number }>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v${process.env.NEXT_PUBLIC_API_VERSION}/login`,
      { email, password }
    );
    if (res.status === 200) {
      setUser({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        created_at: res.data.created_at,
        updated_at: res.data.updated_at,
      });
    }

    setIsLoading(false);
    return { status: res.status };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const signUp = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      password_confirmation: string
    ) => {
      setIsLoading(true);
      setError(null);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v${process.env.NEXT_PUBLIC_API_VERSION}/users`,
        { name, email, password, password_confirmation }
      );
      if (res.status === 201) {
        setUser(res.data);
      }

      setIsLoading(false);
      return { status: res.status };
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import { User } from "@/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signUp: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => Promise<boolean>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;
const API_FULL_URL = `${API_URL}/api/v${API_VERSION}`;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch(`${API_FULL_URL}/logged_in`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setIsLoggedIn(data.logged_in);
        setUser(data.user);
      } catch (error) {
        console.error("ログイン状態の確認に失敗しました。", error);
      }
    };

    checkLoggedIn();
  }, []);

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const resJson = await response.json();
        const data = resJson.data;
        const status = resJson.status;

        if (status.code !== 200) {
          throw new Error("ログインに失敗しました");
        }

        setUser(data);
        setIsLoggedIn(true);
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  };

  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "DELETE",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("ログアウトに失敗しました");
      }
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, email, password, passwordConfirm }),
        });

        if (!response.ok) {
          throw new Error("登録に失敗しました");
        }
        const user = await response.json();
        setUser(user);
        setIsLoggedIn(true);
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getCookie } from "typescript-cookie";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLogin: boolean;
  currentUser: () => Promise<User | null>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => Promise<void>;
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

  useEffect(() => {
    currentUser().then((user) => {
      setUser(user);
    });
  }, []);

  const currentUser = async () => {
    try {
      const response = await fetch(`${API_FULL_URL}/users/current_user/index`, {
        method: "GET",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `_relay_writer_session=${getCookie(
            "_relay_writer_session"
          )}`,
        }),
      });

      if (!response.ok) {
        throw new Error("ユーザー情報の取得に失敗しました");
      }

      let user = await response.json();
      if (user.id === null) {
        user = null;
      }
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error("ログインに失敗しました");
      }
      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
      method: "DELETE",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `_relay_writer_session=${getCookie(
          "_relay_writer_session"
        )}`,
      }),
    });
    if (!response.ok) {
      throw new Error("ログアウトに失敗しました");
    }
    setUser(null);
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password, passwordConfirm }),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error("登録に失敗しました");
      }
      const user = await response.json();
      //setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const isLogin = currentUser() !== null;

  const value = {
    user,
    isLogin,
    currentUser,
    login,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

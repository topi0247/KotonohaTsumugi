// context/AuthContext.tsx
import { FlashOnRounded } from "@mui/icons-material";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getCookie, setCookie } from "typescript-cookie";

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
  const [isLogin, setIsLogin] = useState(user !== null);

  useEffect(() => {
    setIsLogin(user !== null);
  }, [user]);

  const currentUser = async () => {
    try {
      if (!getCookie("_relay_writer_session")) {
        return null;
      }

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

      const resJson = await response.json();

      if (!resJson) {
        return null;
      }

      setUser(resJson.data);
      return resJson.data;
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

      const resJson = await response.json();
      const data = resJson.data;
      const status = resJson.status;

      if (status.code !== 200) {
        return null;
      }

      setUser(data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const logout = async () => {
    try {
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
      console.log(response);
      if (!response.ok) {
        throw new Error("ログアウトに失敗しました");
      }
      setCookie("_relay_writer_session", "", { expires: new Date(0) });
      setUser(null);
    } catch (error) {
      console.error(error);
    }
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
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

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

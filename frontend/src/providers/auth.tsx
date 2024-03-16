import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  currentUser: () => Promise<number | undefined>;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem("auth") && setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("auth", "true");
      return;
    }
    localStorage.removeItem("auth");
  }, [isLoggedIn]);

  const currentUser = async () => {
    try {
      const response = await fetch(`${API_FULL_URL}/current_user`, {
        method: "GET",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      const data = await response.json();
      setUser(data);
      localStorage.setItem("auth", "true");
      return data;
    } catch (error) {
      console.error(error);
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
      setIsLoggedIn(true);
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
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    user,
    isLoggedIn,
    currentUser,
    login,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

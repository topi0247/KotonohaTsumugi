import axios from "axios";
import { useState, useCallback } from "react";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v${process.env.NEXT_PUBLIC_API_VERSION}/login`,
      { email, password }
    );
    if (res.status === 200) {
      setUser(res.data);
    }

    setIsLoading(false);
    return { status: res.status };
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    setIsLoading(false);
  }, []);

  const currentUser = useCallback(() => {
    return user;
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

  return { isLoading, error, login, logout, signUp, currentUser };
};

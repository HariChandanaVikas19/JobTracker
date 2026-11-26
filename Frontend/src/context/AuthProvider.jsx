import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

const TOKEN_KEY = "userToken"; // the Axios interceptor reads this same key

export const AuthProvider = ({ children }) => {
  // Start from localStorage so a page refresh keeps you logged in
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const login = useCallback((newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({ token, isLoggedIn: Boolean(token), login, logout }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

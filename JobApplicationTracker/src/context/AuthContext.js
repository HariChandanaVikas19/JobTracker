import { createContext } from "react";

// Holds { token, isLoggedIn, login(token), logout() } for the whole app
export const AuthContext = createContext(null);

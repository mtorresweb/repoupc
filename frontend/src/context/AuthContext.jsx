import { createContext, useState } from "react";
export const AuthContext = createContext({});

export function ContextProvider({ children }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");

  const logIn = (token, user) => {
    setUser(user);
    setToken(token);
  };

  const logOut = () => {
    setUser({});
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, logIn, logOut, search, setSearch, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser =Cookies.get("jwt") || localStorage.getItem("messenger");

  const [authUser, setAuthUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
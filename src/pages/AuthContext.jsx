// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { useRouter } from 'next/router';

const AuthContext = createContext();

// AuthContext.js
export const AuthProvider = ({ children }) => {
  const [access, setaccess] = useState(null);
  const [refress, setrefress] = useState(null);
  const [username, setusername] = useState(null);
  // const router = useRouter();

  useEffect(() => {
    setaccess(sessionStorage.getItem("item_key"));
  }, [access, refress, username]);

  const login = (access, refress, username) => {
    setaccess(access);

    setrefress(refress);

    setusername(username);
    sessionStorage.setItem("item_key", access);
  };

  return (
    <AuthContext.Provider value={{ login, refress, access, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};

import React, { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load logged-in user on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService
        .getProfile()
        .then((data) => {
          setUser(data.user); // backend returns {user:{}}
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  // LOGIN
  const login = async (credentials) => {
    const data = await authService.login(credentials);

    localStorage.setItem("token", data.token);

    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
    });

    return data;
  };

  // REGISTER
  const register = async (info) => {
    const data = await authService.register(info);

    localStorage.setItem("token", data.token);

    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
    });

    return data;
  };

  // LOGOUT
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

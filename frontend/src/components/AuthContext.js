import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setUser(null);
    }
  }, [token]);

  const login = (jwtToken, userData) => {
    localStorage.setItem("jwtToken", jwtToken);
    setToken(jwtToken);
    setUser(userData);
    navigate("/home"); // Redirect to Home after login
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
    setUser(null);
    navigate("/signin"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

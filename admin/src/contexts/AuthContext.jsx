import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set up axios defaults
  const API_URL = "http://localhost:5000/api";
  axios.defaults.baseURL = API_URL;

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Verify token validity
      axios
        .get("/auth/me")
        .then((response) => {
          if (response.data.role === "admin") {
            setUser(response.data);
          } else {
            localStorage.removeItem("adminToken");
            delete axios.defaults.headers.common["Authorization"];
          }
        })
        .catch(() => {
          localStorage.removeItem("adminToken");
          delete axios.defaults.headers.common["Authorization"];
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token, user: userData } = response.data;

      if (userData.role !== "admin") {
        throw new Error("Access denied. Admin privileges required.");
      }

      localStorage.setItem("adminToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./Context";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Track from "./components/Track";
import PlaylistPage from "./components/PlaylistPage";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Home Route (No token check needed) */}
        <Route path="/" element={<Home />} />
        
        {/* Protected Routes (Requires token) */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/signin" />}
        />
        <Route
          path="/track"
          element={token ? <Track /> : <Navigate to="/signin" />}
        />
        <Route
          path="/playlist"
          element={token ? <PlaylistPage /> : <Navigate to="/signin" />}
        />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={token ? "/" : "/signin"} />} />
      </Routes>
      
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

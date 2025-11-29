// client/src/main.tsx  (top-level)
import axios from "axios";
axios.defaults.withCredentials = true;
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import useAuthStore from "./zustand/useAuthStore.ts";
import "./index.css";
import { SocketProvider } from "./context/SocketContext.tsx"; // ← NEW

const RootApp = () => {
  const { authUser } = useAuthStore();
  return (
    <Routes>
      <Route path="/" element={authUser ? <App /> : <Navigate to="/login" />} />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>        
        <RootApp />
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
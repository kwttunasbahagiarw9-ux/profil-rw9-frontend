import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import AdminLogin from "./admin/AdminLogin";
import AdminPreview from "./admin/AdminPreview";
import { getToken } from "./admin/api";
import "./index.css";

function RequireAuth({ children }) {
  if (!getToken()) return <Navigate to="/admin" replace />;
  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route
          path="/admin"
          element={
            getToken() ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth>
              <AdminPreview />
            </RequireAuth>
          }
        />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
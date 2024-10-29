import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";

import { AuthProvider } from "./context/AuthContext";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import GoogleAuth from "@/utils/GoogleAuth";
import { Home } from "lucide-react";
import ProtectedRoute from "@/components/protected-route";

function App() {

  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth" element={<GoogleAuth />} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

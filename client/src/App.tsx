import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";

import { AuthProvider } from "@/context/AuthContext";

import ProtectedRoute from "@/components/protected-route";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import CreateGroupPage from "@/pages/CreateGroupPage";
import NotificationsPage from "@/pages/NotificationsPage";
import GroupPage from "@/pages/GroupPage";
import GoogleAuth from "@/utils/GoogleAuth";

function App() {

  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth" element={<GoogleAuth />} />
            <Route path="/create" element={<ProtectedRoute><CreateGroupPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
            <Route path="/group/:groupId" element={<ProtectedRoute><GroupPage /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

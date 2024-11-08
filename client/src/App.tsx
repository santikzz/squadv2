import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";

import { GlobalProvider } from "@/context/GlobalContext";

import ProtectedRoute from "@/components/protected-route";
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import CreateGroupPage from "@/pages/CreateGroupPage";
import EditGroupPage from "@/pages/EditGroupPage";
import NotificationsPage from "@/pages/NotificationsPage";
import GroupPage from "@/pages/GroupPage";
import UserPage from "@/pages/UserPage";
import ChatPage from "@/pages/ChatPage";
import ProfilePage from "@/pages/ProfilePage";
import GoogleAuth from "@/utils/GoogleAuth";

function App() {

  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GlobalProvider>
        <Router>

          <Routes>
            <Route path="/auth" element={<GoogleAuth />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreateGroupPage /></ProtectedRoute>} />
            <Route path="/edit/:groupId" element={<ProtectedRoute><EditGroupPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
            <Route path="/group/:groupId" element={<ProtectedRoute><GroupPage /></ProtectedRoute>} />
            <Route path="/group/:groupId/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/user/:userId" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>

        </Router>
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default App

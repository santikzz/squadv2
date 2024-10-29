import { createContext, useState, useEffect } from "react";
import { api } from "@/services/Api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initalizateAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
                api.setAuthToken(token);
                try {
                    const userData = await api.getEnvironmentFull();
                    setUser(userData);
                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('token');
                    api.setAuthToken(null);
                    setIsAuthenticated(false);
                }
            }
        }
        initalizateAuth();
    }, [])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
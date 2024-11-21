import { createContext, useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query"
import { api } from "@/services/Api";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [ownedJoinedGroups, setOwnedJoinedGroups] = useState(null)

    const isDesktop = useMediaQuery("(min-width: 768px)")

    useEffect(() => {
        const initalizateAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                login(token);
            }
        }
        initalizateAuth();
        setLoading(false);
    }, [])

    const login = async (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        api.setAuthToken(token);
        try {
            const environment = await api.getEnvironmentFull();
            setUser(environment.user);
            setOwnedJoinedGroups(environment.groups);
        } catch (error) {
            console.error(error);
            localStorage.removeItem('token');
            api.setAuthToken(null);
            setIsAuthenticated(false);
        }
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setOwnedJoinedGroups(null);
        api.setAuthToken(null);
        localStorage.removeItem('token');
    }

    if (loading) return <div>loading...</div>;

    return (
        <GlobalContext.Provider value={{ loading, user, ownedJoinedGroups, setOwnedJoinedGroups, isAuthenticated, login, logout, isDesktop, search, setSearch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalProvider, GlobalContext };
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from "@/services/Api";

const GoogleAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        if (token) {
            localStorage.setItem('token', token);
            api.setAuthToken(token);
            navigate('/');
        }
    }, [location, navigate]);

    return null;

};

export default GoogleAuth;
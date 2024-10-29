import axios from 'axios';

const API_URL = 'http://localhost:3000';

const axiosApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': true,
    },
    // withCredentials: true,
});

const setAuthToken = (token) => {
    if (token) {
        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosApi.defaults.headers.common['Authorization'];
    }
}

const basicLogin = async (email, password) => {
    const response = await axiosApi.post('/api/users/login', {
        email: email,
        password: password,
    });
    if (response.status === 200) {
        const { token } = response.data;
        setAuthToken(token);
        localStorage.setItem('token', token);
        return true;
    }
    return false;
}

const getGroups = async () => {
    const response = await axiosApi.get('/api/groups');
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const getUserSelf = async () => {
    const response = await axiosApi.get('/api/users/me');
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const getEnvironmentFull = async () => {
    const response = await axiosApi.get('/api/environment');
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const api = {
    API_URL, setAuthToken, basicLogin, getGroups, getUserSelf, getEnvironmentFull
}
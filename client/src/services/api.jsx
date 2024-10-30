import axios from 'axios';

const API_URL = 'http://localhost:3000';
// const API_URL = 'https://squadv2-api.xnebula.duckdns.org';

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

const getGroup = async (groupId) => {
    const response = await axiosApi.get(`/api/groups/${groupId}`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const createGroup = async (formData) => {
    const response = await axiosApi.post(`/api/groups`, formData);
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

const leaveGroup = async (groupId) => {
    const response = await axiosApi.post(`/api/groups/${groupId}/leave`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const joinGroup = async (groupId) => {
    const response = await axiosApi.post(`/api/groups/${groupId}/join-request`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const api = {
    API_URL,
    setAuthToken,
    basicLogin,
    getGroups,
    getGroup,
    createGroup,
    getUserSelf,
    getEnvironmentFull,
    leaveGroup,
    joinGroup,
}
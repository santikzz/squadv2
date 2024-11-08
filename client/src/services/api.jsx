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

const basicLogin = async (userdata) => {
    const response = await axiosApi.post('/auth/login', userdata);
    if (response.status === 200) {
        const { token } = response.data;
        return token;
    }
    return false;
}

const registerUser = async (userdata) => {
    try {
        const response = await axiosApi.post('/auth/register', userdata);
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        return false;
    }
}

const getGroups = async ({ search = null } = {}) => {

    const endpoint = '/api/groups';
    let url;
    const params = {};
    if (search) params.search = search;

    const query = new URLSearchParams(params).toString();
    url = query ? `${endpoint}?${query}` : endpoint;

    const response = await axiosApi.get(url);
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

const getUser = async (userId) => {
    const response = await axiosApi.get(`/api/users/${userId}`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const createGroup = async (formData) => {
    const response = await axiosApi.post(`/api/groups`, formData);
    if (response.status === 201) {
        return response.data;
    }
    return null;
}

const updateGroup = async (groupId, formData) => {
    const response = await axiosApi.put(`/api/groups/${groupId}`, formData);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const deleteGroup = async (groupId) => {
    const response = await axiosApi.delete(`/api/groups/${groupId}`);
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
    const response = await axiosApi.post(`/api/groups/${groupId}/join`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const cancelJoinGroup = async (groupId) => {
    const response = await axiosApi.post(`/api/groups/${groupId}/join`, { cancel_request: true });
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const getUserOwnedGroups = async (userId) => {
    const response = await axiosApi.get(`/api/users/${userId}/groups`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const kickGroupMember = async (groupId, userId) => {
    const response = await axiosApi.post(`/api/groups/${groupId}/kick`, { userId: userId });
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const getNotifications = async () => {
    const response = await axiosApi.get(`/api/notifications`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const manageJoinRequest = async (groupId, userId, action) => {
    const response = await axiosApi.post(`/api/groups/${groupId}/join-request`, { userId: userId, action: action });
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const updateUser = async (formData) => {
    const response = await axiosApi.put('/api/users', formData);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const getSelfGroups = async () => {
    const response = await axiosApi.get('/api/users/me/groups');
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const getMessagesByGroupId = async (groupId) => {
    const response = await axiosApi.get(`/api/messages/group/${groupId}`);
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
    updateGroup,
    deleteGroup,
    createGroup,
    getUserSelf,
    getEnvironmentFull,
    leaveGroup,
    joinGroup,
    registerUser,
    cancelJoinGroup,
    getUserOwnedGroups,
    getUser,
    kickGroupMember,
    getNotifications,
    manageJoinRequest,
    updateUser,
    getSelfGroups,
    getMessagesByGroupId
}
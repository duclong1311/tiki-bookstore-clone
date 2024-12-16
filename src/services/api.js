import axios from '../utils/axios-customize';

export const callRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', { fullName, email, password, phone });
}

export const callLogin = (username, password, delay) => {
    return axios.post('/api/v1/auth/login', { username, password, delay });
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout');
}

export const getAccount = () => {
    return axios.get('/api/v1/auth/account');
}

export const getUsersWithPaginate = (query) => {
    return axios.get(`/api/v1/user?${query}`);
}

export const createUser = (fullName, password, email, phone) => {
    return axios.post('/api/v1/user', { fullName, password, email, phone });
}

export const importUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data);
}

export const deleteUser = (Id) => {
    return axios.delete(`/api/v1/user/${Id}`)
}

export const updateUser = (_id, fullName, phone) => {
    return axios.put('/api/v1/user', { _id, fullName, phone });
}

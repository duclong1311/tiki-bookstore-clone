import axios from '../utils/axios-customize';

// Login, Register & everything about account

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

// Manage User

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

// Manage Book

export const getBookWithPaginate = (query) => {
    return axios.get(`/api/v1/book?${query}`);
}

export const uploadBookImage = (fileImg) => {
    let formData = new FormData();
    formData.append('fileImg', fileImg);

    return axios.post(`/api/v1/file/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        }
    });
}

export const createBook = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.post('api/v1/book', { thumbnail, slider, mainText, author, price, sold, quantity, category });
}

export const updateBook = (id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.put(`/api/v1/book/${id}`, { thumbnail, slider, mainText, author, price, sold, quantity, category });
}

export const deleteBook = (Id) => {
    return axios.delete(`/api/v1/book/${Id}`);
}

export const getBookCategory = () => {
    return axios.get(`/api/v1/database/category`);
}

// Homepage

export const getBookById = (id) => {
    return axios.get(`/api/v1/book/${id}`);
}
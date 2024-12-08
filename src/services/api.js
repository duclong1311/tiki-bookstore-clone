import { axios } from '../utils/axios-customize';

export const callRegister = (fullname, email, password, phone) => {
    return axios.post('/api/v1/user/register', { fullname, email, password, phone });
}

import Axios from './axios';

const authToken = token => token ? Axios.defaults.headers.common['Authorization'] = `Bearer ${token}` : delete Axios.defaults.headers.common['Authorization']

export default authToken;
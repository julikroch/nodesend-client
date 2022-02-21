import axios from 'axios';

const Axios = axios.create({
    baseURL: process.env.backendURL
})

export default Axios
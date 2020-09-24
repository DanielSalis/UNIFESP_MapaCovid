import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_CONNECTION_STRING + process.env.REACT_APP_API_PORT,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
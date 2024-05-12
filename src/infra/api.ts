import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://localhost:44323',
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
    }
});

export default Api;
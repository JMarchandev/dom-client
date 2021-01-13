// External imports
import Axios from 'axios';

const API_URL = process.env.REACT_APP_DOM_API_URL

const config = {
    headers: {
        'Access-Control-Request-Headers': 'x-requested-with, content-type',
        'Content-Type': 'application/json;charset=UTF-8',
    }
};

// AUTHENTIFICATION
export function auth(bodyRequest) {
    return Axios.post(`${API_URL}/auth/me`, bodyRequest, config);
}
// External imports
import Axios from 'axios';

const API_URL = process.env.REACT_APP_DOM_API_URL;

const config = {
    headers: {
        'Access-Control-Request-Headers': 'x-requested-with, content-type',
        'Content-Type': 'application/json;charset=UTF-8',
    }
};
// GET ALL
export function getUsers() {
    return Axios.get(`${API_URL}/users`)
}
// GET ONE
export function getUserById(id) {
    return Axios.get(`${API_URL}/users`)
}
// ADD ONE
export function addUser(bodyRequest) {
    return Axios.post(`${API_URL}/users`, bodyRequest, config)
};
// PUT ONE
// DELETE ONE

// External imports
import Axios from 'axios';

const API_URL = process.env.REACT_APP_DOM_API_URL

const config = {
    headers: {
        'Access-Control-Request-Headers': 'x-requested-with, content-type',
        'Content-Type': 'application/json;charset=UTF-8',
    }
};

// GET ALL
export function getRooms() {
    return Axios.get(`${API_URL}/rooms`)
}

// GET ONE

// ADD ONE
export function addRoom(bodyRequest) {
    return Axios.post(`${API_URL}/rooms`, bodyRequest, config)
};

// PUT ONE

// DELETE ONE
export function removeRoom(id) {
    return Axios.delete(`${API_URL}/rooms/${id}`, config)
};
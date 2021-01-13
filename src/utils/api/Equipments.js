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
export function getEquipments() {
    return Axios.get(`${API_URL}/equipments`)
}

// GET ONE
export function getEquipmentById(id) {
    return Axios.get(`${API_URL}/equipments/${id}`, config)
}

// ADD ONE
export function addEquipment(bodyRequest) {
    return Axios.post(`${API_URL}/equipments`, bodyRequest, config)
};

// PUT ONE
export function updateEquipment(id, bodyRequest) {
    return Axios.patch(`${API_URL}/equipments/${id}`, bodyRequest, config)
}
// DELETE ONE
export function removeEquipment(id) {
    return Axios.delete(`${API_URL}/equipments/${id}`, config)
};
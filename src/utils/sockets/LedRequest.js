// Socket config
import openSocket from 'socket.io-client';

// API requests
import { getEquipmentById, updateEquipment } from '../api/Equipments';

const socket = openSocket(process.env.REACT_APP_DEVICE_IP, { transports: ['websocket'] });

// Request
const reqToggleLedKey = 'REQ_TOGGLE_LED';
const reqTimerLedKey = 'REQ_TIMER_LED';
const reqProgramLedKey = 'REQ_PROGRAM_LED';
const reqGetLedStatusKey = 'REQ_GET_LED_STATUS';

// Response
const resToggleLedKey = 'RES_TOGGLE_LED';
const resTimerLedKey = 'RES_TIMER_LED';
const resProgramLedKey = 'RES_PROGRAM_LED';
// eslint-disable-next-line no-unused-vars
const resGetLedStatus = 'RES_GET_LED_STATUS';

export function toggleLed(equipment) {
    return new Promise(async (resolve, reject) => {
        await socket.emit(reqToggleLedKey, (equipment));

        socket.on(resToggleLedKey, async (response) => {
            await getEquipmentById(equipment._id).then(res => {
                const bodyRequest = {
                    status: response.status.newStatus,
                    counter: res.data.counter + 1
                };

                updateEquipment(response.data._id, bodyRequest)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            });
        });
    });
};

export function timerLed(equipment, action) {
    return new Promise(async (resolve, reject) => {
        await socket.emit(reqTimerLedKey, ({ equipment, action }))

        await socket.on(`${resTimerLedKey}_${equipment.id}`, async (response) => {
            if (response?.status) {
                await getEquipmentById(response.data._id)
                    .then(res => {
                        const bodyRequest = {
                            status: response.status.newStatus,
                            counter: response.counter + 1
                        };;

                        updateEquipment(response.data._id, bodyRequest)
                            .then(res => resolve(res))
                            .catch(err => reject(err))
                    })

            } else if (response?.message) {
                reject(response.message);
            };
        });
    });
};

export function programLed(equipment, action) {
    return new Promise(async (resolve, reject) => {
        await socket.emit(reqProgramLedKey, ({ equipment, action }))

        await socket.on(`${resProgramLedKey}_${equipment._id}`, async (response) => {
            if (response?.status) {
                await getEquipmentById(response.data._id)
                    .then(res => {
                        const bodyRequest = {
                            status: response.status.newStatus,
                            counter: response.counter + 1
                        }

                        updateEquipment(response.data._id, bodyRequest)
                            .then(res => resolve(res))
                            .catch(err => reject(err))
                    })

            } else if (response?.message) {
                reject(response.message);
            };
        });
    });
};

export function getLedStatus(equipment) {
    socket.emit(reqGetLedStatusKey, (equipment));
};

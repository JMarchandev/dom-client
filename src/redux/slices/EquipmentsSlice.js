export const setEquipments = (payload) => {
    return {
        type: 'EQUIPMENTS_LOADED',
        payload,
    };
};

export const setInitializedEquipments = (payload) => {
    return {
        type: 'INITIALIZED_EQUIPMENT_LOADED',
        payload,
    };
};

const initialState = {
    allEquipments: {},
    personalEquipments: {},
    initializedEquipments: {},
};

export default function equipmentsReducer(state = initialState, action) {
    switch (action.type) {
        case 'EQUIPMENTS_LOADED':
            return {
                ...state,
                allEquipments: action.payload,
            };
        case 'INITIALIZED_EQUIPMENT_LOADED':
            return {
                ...state,
                initializedEquipments: action.payload
            };
        default:
            return state;
    };
};
export const setRooms = (payload) => {
    return {
        type: 'ROOMS_LOADED',
        payload,
    };
};

const initialState = {
    allRooms: {},
    personalRooms: {}
};

export default function roomsReducer(state = initialState, action) {
    switch (action.type) {
        case "ROOMS_LOADED":
            return {
                ...state,
                allRooms: action.payload,
            };
        default:
            return state;
    };
};
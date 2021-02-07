// Action
export const setLeftBarStatus = (payload) => {
    return {
        type: 'LEFT_MENU_STATUS_CHANGED',
        payload,
    };
};

export const setRightBarStatus = (payload) => {
    return {
        type: 'RIGHT_MENU_STATUS_CHANGED',
        payload,
    };
};

export const setModalStatus = (payload) => {
    return {
        type: 'MODAL_STATUS_CHANGED',
        payload,
    };
};

export const setRenderEquipments = (payload) => {
    return {
        type: 'EQUIPMENTS_RENDERED',
        payload,
    };
};

export const setRenderRooms = (payload) => {
    return {
        type: 'ROOMS_RENDERED',
        payload,
    };
};

const initialState = {
    leftMenu: false,
    rightMenu: {
        status: false,
        view: null,
    },
    modal: {
        status: false,
        view: null,
        id: null
    },
    render: {
        equipments: false,
        rooms: false,
    }
};

export default function navigationReducer(state = initialState, action) {
    switch (action.type) {
        case 'LEFT_MENU_STATUS_CHANGED':
            return {
                ...state,
                leftMenu: action.payload,
            };
        case 'RIGHT_MENU_STATUS_CHANGED':
            return {
                ...state,
                rightMenu: action.payload,
            };
        case 'MODAL_STATUS_CHANGED':
            return {
                ...state,
                modal: action.payload,
            };
        case 'EQUIPMENTS_RENDERED':
            return {
                ...state,
                render: {
                    ...state.render,
                    equipments: action.payload
                },
            };
        case 'ROOMS_RENDERED':
            return {
                ...state,
                render: {
                    ...state.render,
                    rooms: action.payload
                },
            };
        default:
            return state;
    };
};
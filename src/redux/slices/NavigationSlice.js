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

export const setRenderStatus = (payload) => {
    return {
        type: 'RENDERED',
        payload,
    }
}

const initialState = {
    leftMenu: false,
    rightMenu: {
        status: false,
        view: null,
    },
    modal: {
        status: false,
        view: null,
    },
    render: false
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
        case 'RENDERED':
            console.log('slice');
            return {
                ...state,
                render: action.payload,
            }
        default:
            return state;
    };
};
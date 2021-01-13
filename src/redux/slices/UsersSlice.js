export const setProfiles = (payload) => {
    return {
        type: "PROFILES_LOADED",
        payload,
    };
};

export const setCurrentProfile = (payload) => {
    return {
        type: "USER_CONNECTED",
        payload
    };
};

const initialState = {
    allProfiles: {},
    currentProfile: null,
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case "PROFILES_LOADED":
            return {
                ...state,
                allProfiles: action.payload,
            };
        case "USER_CONNECTED":
            return {
                ...state,
                currentProfile: action.payload
            };
        default:
            return state;
    };
};
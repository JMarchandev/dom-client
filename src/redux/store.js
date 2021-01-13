import { createStore, combineReducers } from "redux";

// Slices
import navigationReducer from './slices/NavigationSlice';
import equipmentsReducer from './slices/EquipmentsSlice';
import roomsReducer from './slices/RoomsSlice';
import usersReducer from './slices/UsersSlice';

const rootReducer = combineReducers({
    navigation: navigationReducer,
    equipments: equipmentsReducer,
    rooms: roomsReducer,
    users: usersReducer
})

function configureStore(state) {
    return createStore(
        rootReducer, state
        + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
};

export default configureStore;
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setModalStatus } from '../../redux/slices/NavigationSlice';

// React-Router
// API request
// Socket resquest
// Internal import
import Profiles from './Profiles';
import Login from './Login';

// Material UI

export default function SimpleDialogDemo() {
    const { status, view } = useSelector(state => state.navigation.modal)
    const dispatch = useDispatch()


    const handleClose = (value) => {
        dispatch(setModalStatus({ status: false, view: null }));
    };

    function View() {
        switch (view) {
            case 'PROFILES':
                return <Profiles open={status} onClose={handleClose} />;
            case 'LOGIN':
                return <Login open={status} onClose={handleClose} />
            default:
                break;
        }
    }

    return (
        <div>
            {View()}
        </div>
    );
}

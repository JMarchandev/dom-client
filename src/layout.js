import React, { useEffect, useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setEquipments, setInitializedEquipments } from './redux/slices/EquipmentsSlice';
import { setRooms } from './redux/slices/RoomsSlice';
import { setProfiles } from './redux/slices/UsersSlice';

// React-Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// API request
import { getEquipments } from './utils/api/Equipments';
import { getRooms } from './utils/api/Rooms';
import { getUsers } from './utils/api/Users';

// Internal import
import { TopMenu } from './components/TopMenu/TopMenu';
import Equipments from './pages/equipments/Equipments';
import Rooms from './pages/rooms/Rooms';
import Home from './pages/home/Home';
import Modal from './components/Modals/Modal';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { setRenderEquipments } from './redux/slices/NavigationSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        minHeight: '100vh'
    },
    container: {
        marginTop: theme.sizing.marginTop,
    },
}));

const Layout = () => {
    const [isLoading, setIsLoading] = useState(false)
    const equipments = useSelector(state => state.navigation.render.equipments)

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        getEquipments()
            .then(res => {
                const equipments = res.data;

                const initializedEquipments = equipments
                    .filter(equipment => equipment?.gpio)
                //.sort((a, b) => (a.counter < b.counter) ? 1 : -1)

                dispatch(setInitializedEquipments(initializedEquipments))
                dispatch(setEquipments(equipments))
            })
        dispatch(setRenderEquipments(false))
    }, [equipments])

    useEffect(() => {
        setIsLoading(true)

        Promise.all([getEquipments(), getRooms(), getUsers()])
            .then((res) => {
                const equipments = res[0].data;
                const rooms = res[1].data;
                const profiles = res[2].data;

                const initializedEquipments = equipments
                    .filter(equipment => equipment?.gpio)
                //.sort((a, b) => (a.counter < b.counter) ? 1 : -1)

                dispatch(setInitializedEquipments(initializedEquipments))
                dispatch(setEquipments(equipments))
                dispatch(setRooms(rooms))
                dispatch(setProfiles(profiles))
            })
            .catch(err => {
                console.log(err.message)
            })

        setIsLoading(false)
    }, [])

    return (
        <div className={classes.root}>
            {isLoading
                ? 'Please wait ...'
                : <>
                    <Modal />
                    <Router>
                        <TopMenu />
                        <div className={classes.container}>
                            <Switch>
                                <Route path="/equipments">
                                    <Equipments />
                                </Route>
                                <Route path="/rooms">
                                    <Rooms />
                                </Route>
                                <Route path="/">
                                    <Home />
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                </>
            }
        </div>
    );
};

export default Layout; 
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

// Socket resquest
// Internal import
import { TopMenu } from './components/TopMenu/TopMenu';
import Equipments from './pages/equipments/Equipments';
import Rooms from './pages/rooms/Rooms';
import Home from './pages/home/Home';
import Modal from './components/Modals/Modal';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { setRenderStatus } from './redux/slices/NavigationSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        minHeight: '100vh'
    },
    container: {
        marginTop: '10vh',
    },
}));

const Layout = () => {
    const [isLoading, setIsLoading] = useState(false)
    const state = useSelector(state => state);
    const render = useSelector(state => state.navigation.render)

    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        async function promise() {
            await Promise.all([getEquipments(), getRooms(), getUsers()])
                .then((res) => {
                    const equipments = res[0].data;
                    const rooms = res[1].data;
                    const profiles = res[2].data;

                    console.log(JSON.stringify(profiles), JSON.stringify(state.profiles))

                    if (JSON.stringify(equipments) !== JSON.stringify(state.equipments.allEquipments)) {
                        console.log('s');
                        const initializedEquipments = equipments
                            .filter(equipment => equipment?.gpio)
                            //.sort((a, b) => (a.counter < b.counter) ? 1 : -1)

                        dispatch(setInitializedEquipments(initializedEquipments))
                        dispatch(setEquipments(equipments))
                    }
                    if (JSON.stringify(rooms) !== JSON.stringify(state.rooms.allRooms)) {
                        console.log('s');
                        dispatch(setRooms(rooms))
                    }
                    if (JSON.stringify(profiles) !== JSON.stringify(state.users.allProfiles)) {
                        console.log('s');
                        dispatch(setProfiles(profiles))
                    }
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        promise()
        setIsLoading(false)
        dispatch(setRenderStatus(false))
    }, [render])

    return (
        <div className={classes.root}>
            {isLoading
                ? 'Please wait ...'
                : <>
                    <Modal />
                    <Router>
                        <TopMenu />
                        <div className={classes.container}>
                            {/* <Container className={classes.container} maxWidth={'md'}> */}
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
                            {/* </Container> */}
                        </div>
                    </Router>
                </>
            }
        </div>
    );
};

export default Layout; 
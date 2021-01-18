import React from 'react';

// Redux
// React-Router
// API request
// Socket resquest
// Internal import
import RoomsTable from '../../components/RoomsTable/RoomsTable';
import AddRoomForm from '../../components/RoomsTable/AddRoomForm';
// Material UI
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: theme.sizing.marginRight,
        marginLeft: theme.sizing.marginLeft,
        [theme.breakpoints.down("xs")]: {
            marginRight: 10,
            marginLeft: 10,
        },
    },
}));

export const Rooms = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <RoomsTable />
            <AddRoomForm />
        </div>
    );
};

export default Rooms;
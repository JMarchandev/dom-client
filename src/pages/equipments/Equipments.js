import React from 'react';

// Redux
// React-Router
// API request
// Socket resquest
// Internal import
import EquipmentsTable from '../../components/EquipmentsTable/EquipmentsTable';
import AddEquipmentForm from '../../components/EquipmentsTable/AddEquipmentForm';

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

export const EquipmentTable = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <EquipmentsTable />
            <AddEquipmentForm />
        </div>
    );
};

export default EquipmentTable;
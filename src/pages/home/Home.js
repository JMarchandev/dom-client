import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// React-Router
// API request
// Socket resquest
// Internal import
import LedCard from '../../components/EquipmentsCards/LedCard';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: theme.sizing.marginRight,
        marginLeft: theme.sizing.marginLeft,
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'space-around',
    }
}));

export const Home = () => {
    const { initializedEquipments } = useSelector(state => state.equipments);
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid className={classes.grid} container>
                {initializedEquipments.length > 0
                    && initializedEquipments.map(equipment => (
                        <Grid
                            key={equipment._id}
                            className={classes.gridItem}
                            item
                            lg={3}
                        >
                            <LedCard equipment={equipment} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

export default Home;
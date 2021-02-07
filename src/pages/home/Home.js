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
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        marginTop: theme.sizing.marginTop,
        marginRight: theme.sizing.marginRight,
        marginLeft: theme.sizing.marginLeft,
        [theme.breakpoints.down("xs")]: {
            marginRight: 10,
            marginLeft: 10,
        },
    },
    card: {
        width: "100%",
        padding: 10,
        [theme.breakpoints.down("xs")]: {
            textAlign: 'center',
        },
    },
    items: {
        display: 'flex',
        flexWrap: 'wrap',
        [theme.breakpoints.down("xs")]: {
            justifyContent: 'space-between',
        },
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
            <Grid container sm="12" md="12" lg="6">
                <Card className={classes.card}>
                    <Typography variant="h6">Equipements favoris</Typography>
                    <div className={classes.items}>
                        {initializedEquipments.length > 0
                            && initializedEquipments.slice(0, 3).map(equipment => (
                                <Grid
                                    key={equipment._id}
                                    className={classes.gridItem}
                                    item
                                    sm="6" md="4" lg="4"
                                >
                                    <LedCard equipment={equipment} />
                                </Grid>
                            ))
                        }
                    </div>
                </Card>
            </Grid>
        </div>
    );
};

export default Home;
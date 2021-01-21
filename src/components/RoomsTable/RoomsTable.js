import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// React-Router
// API request
// Socket resquest
// Internal import
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 10,
        '& > *': {
            borderBottom: 'unset',
        },
    },
    tableContainer: {
        width: '100%',
        padding: 10,
    },
    table: {
        marginTop: 20,
        border: 1,
        borderRadius: '25%',
        borderColor: theme.palette.primary.dark,
    },
    tableHead: {
        backgroundColor: theme.palette.primary.main,
    },
    tableBody: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    tableHeadItem: {
        color: theme.palette.primary.contrastText
    },
    deleteButton: {
        backgroundColor: '#ffc107',
    },
    emptyMessage: {
        marginTop: 10,
    }
}));

function RoomRow(props) {
    const { room } = props;

    const classes = useStyles();

    const handleDeleteRoom = (id) => {
        console.log(id);
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell align="left" component="th" scope="row">
                    <Typography variant="body1">{room.name}</Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography variant="body1">{room.creationDate}</Typography>
                </TableCell>
                <TableCell align="right">
                    <Button onClick={() => handleDeleteRoom(room._id)} className={classes.deleteButton}>
                        <DeleteForeverIcon />
                    </Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function RoomsTable() {
    const { allRooms } = useSelector(state => state.rooms);
    const classes = useStyles();

    return (
        <Grid className={classes.grid} container>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Typography variant="h5">Mes Pieces</Typography>
                {allRooms.length > 0
                    ? <Table className={classes.table} aria-label="collapsible table">
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell className={classes.tableHeadItem} align="left">
                                    <Typography variant="subtitle1">Nom</Typography>
                                </TableCell>
                                <TableCell className={classes.tableHeadItem} align="left">
                                    <Typography variant="subtitle1">Date de création</Typography>
                                </TableCell>
                                <TableCell align="left" />
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody}>
                            {allRooms.length > 0 &&
                                allRooms.map((rooms, i) => (
                                    <RoomRow key={rooms._id} room={rooms} />
                                ))}
                        </TableBody>
                    </Table>
                    : <Typography className={classes.emptyMessage} variant="body1">Aucun équipement trouvé, verifier la connexion a la base de données ou ajoutez un equipement</Typography>}
            </TableContainer>
        </Grid>
    );
}
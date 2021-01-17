import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setModalStatus } from '../../redux/slices/NavigationSlice';

// React-Router
// API request
// Socket resquest
// Internal import
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InitEquipmentForm from './InitEquipmentForm';

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

function EquipmentRow(props) {
    const [open, setOpen] = React.useState(false);
    const { equipment } = props;

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleDeleteEquipment = (id) => {
        dispatch(setModalStatus({ status: true, view: 'DELETE_MODAL', id }))
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell align="left">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {!equipment?.gpio
                            ? open
                                ? <KeyboardArrowUpIcon />
                                : <KeyboardArrowDownIcon />
                            : null
                        }
                    </IconButton>
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                    <Typography variant="body1">{equipment.name}</Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography variant="body1">{equipment.gpio ? <CheckIcon /> : <ClearIcon />}</Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography variant="body1">{equipment.gpio && equipment.status === 1 ? 'on' : 'off'}</Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography variant="body1">{equipment?.isPersonal === true ? 'Personel' : 'Commun'}</Typography>
                </TableCell>
                <TableCell align="right">
                    <Button onClick={() => handleDeleteEquipment(equipment._id)} className={classes.deleteButton}>
                        <DeleteForeverIcon />
                    </Button>
                </TableCell>


            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <div>
                                <Typography variant="h6" gutterBottom component="div">
                                    Initialiser l'équipment
                                </Typography>
                            </div>
                            <div>
                                <InitEquipmentForm equipment={equipment} open={setOpen} />
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function EquipmentsTable() {
    const { allEquipments } = useSelector(state => state.equipments);
    const classes = useStyles();

    return (
        <Grid className={classes.grid} container>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Typography variant="h5">Mes Equipments</Typography>
                {allEquipments.length > 0
                    ? <Table className={classes.table} aria-label="collapsible table">
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell align="left" />
                                <TableCell className={classes.tableHeadItem} align="left">
                                    <Typography variant="subtitle1">Nom</Typography>
                                </TableCell>
                                <TableCell className={classes.tableHeadItem} align="left">
                                    <Typography variant="subtitle1">Initialisé</Typography>
                                </TableCell>
                                <TableCell className={classes.tableHeadItem} align="left">
                                    <Typography variant="subtitle1">Status</Typography>
                                </TableCell>
                                <TableCell className={classes.tableHeadItem} align="left">
                                    <Typography variant="subtitle1">Propriété</Typography>
                                </TableCell>
                                <TableCell className={classes.tableHeadItem} align="left">
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody}>
                            {allEquipments.length > 0 &&
                                allEquipments.map((equipment, i) => (
                                    <EquipmentRow key={equipment._id} equipment={equipment} />
                                ))}
                        </TableBody>
                    </Table>
                    : <Typography className={classes.emptyMessage} variant="body1">Aucun équipement trouvé, verifier la connexion a la base de données ou ajoutez un equipement</Typography>}
            </TableContainer>
        </Grid>
    );
}

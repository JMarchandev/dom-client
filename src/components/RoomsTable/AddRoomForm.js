import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setModalStatus, setRenderRooms } from '../../redux/slices/NavigationSlice';

// React-Router
// API request
// Socket resquest
// Internal import
import { addRoom } from '../../utils/api/Rooms';

// Material UI
import { makeStyles, withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: 10,
        padding: 10,
    },
    alert: {
        marginTop: 5,
        [theme.breakpoints.down("xs")]: {
            display: 'none'
        },
    },
    divider: {
        marginTop: 10,
    },
    grid: {
        display: 'flex',
        alignItems: 'center'
    },
    form: {
        marginTop: 10,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        width: '100%',
    },
}));

const PurpleSwitch = withStyles({
    root: {
        marginTop: 0,
    },
    switchBase: {
        color: '#78909c',
        '&$checked': {
            color: '#8bc34a',
        },
        '&$checked + $track': {
            backgroundColor: '#8bc34a',
        },
    },
    checked: {},
    track: {},
})(Switch);

export const AddRoomForm = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        isPersonal: false
    })
    const user = useSelector(state => state.users.currentProfile)

    const dispatch = useDispatch()
    const classes = useStyle();

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleIsPersonalChange = async (e) => {
        if (user === null) {
            await dispatch(setModalStatus({ status: true, view: 'PROFILES' }))
        }

        if (user !== null) {
            setFormValues({
                ...formValues,
                isPersonal: !formValues.isPersonal
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formValues.isPersonal === true && user === null) {
            await dispatch(setModalStatus({ status: true, view: 'PROFILES' }))
        }

        const { name, type, isPersonal } = formValues
        const bodyRequest = {
            name,
            type,
            isPersonal,
            user
        }

        addRoom(bodyRequest)
            .then(res => {
                dispatch(setRenderRooms(true))
                setFormValues({
                    name: '',
                    isPersonal: false
                })
            })
            .catch(err => console.log(err.message))
    }

    console.log(formValues);

    return (
        <Paper className={classes.root}>
            <Typography variant="h5">Ajouter une pièce</Typography>
            <Alert className={classes.alert} severity="success">Ajoutez une piece, vous pourrez y synchroniser des equipements.</Alert>
            <Divider className={classes.divider} />
            <form onSubmit={handleSubmit} className={classes.form}>
                <Grid className={classes.grid} container>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                id="name"
                                name="name"
                                value={formValues.name}
                                label="Nom la piece"
                                variant="outlined"
                                onChange={handleChange}
                                placeholder="Entrez un nom"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md lg={2}>
                        <FormControl className={classes.formControl}>
                            <FormControlLabel
                                name="isPersonal"
                                control={
                                    <PurpleSwitch
                                        checked={formValues.isPersonal}
                                        value={formValues.isPersonal}
                                        onChange={handleIsPersonalChange}
                                        classes={{
                                            root: classes.root,
                                            switchBase: classes.switchBase,
                                            thumb: classes.thumb,
                                            track: classes.track,
                                            checked: classes.checked,
                                        }}
                                        id="switch-isPersonal"
                                        name="isPersonal"
                                        color="default"
                                    />
                                }
                                label="Privé"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md lg={3}>
                        <FormControl className={classes.formControl}>
                            <Button type="submit" className={classes.button} size="large" variant="contained" color="primary">Ajouter</Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </Paper >
    );
};

export default AddRoomForm;
import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProfile } from '../../redux/slices/UsersSlice';

// React-Router
// API request
import { auth } from '../../utils/api/auth';

// Socket resquest
// Internal import
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';

import PersonIcon from '@material-ui/icons/Person';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '1rem',
        marginBottom: 5,
    },
    field: {
        marginBottom: '0.5rem',
    }
}));

export const Profiles = (props) => {
    const [formValues, setFormValues] = useState({ pwd: '' })
    const { onClose } = props;
    const { status, resources } = useSelector(state => state.navigation.modal)

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const bodyRequest = {
            id: resources._id,
            pwd: formValues.pwd
        };

        await auth(bodyRequest)
            .then(res => {
                dispatch(setCurrentProfile(res.data))
                onClose()
            })
            .catch(err => console.error(err.message))

    }

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={status}>
            <DialogTitle id="simple-dialog-title">Connexion</DialogTitle>
            <List>
                <ListItem
                    button
                    key={resources._id}
                >
                    <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText>{resources.firstName} {resources.lastName}</ListItemText>
                </ListItem>
            </List>
            <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off">
                <TextField
                    id="outlined-basic"
                    name="pwd"
                    label="Mot de passe"
                    className={classes.field}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined" />
                <Button type="submit" variant="contained" fullWidth color="light">Valider</Button>
            </form>
        </Dialog>
    );
};

export default Profiles;
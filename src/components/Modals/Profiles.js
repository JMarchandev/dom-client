import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setModalStatus } from '../../redux/slices/NavigationSlice';

// React-Router
// API request
// Socket resquest
// Internal import
// Material UI
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';

import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

export const Profiles = (props) => {
    const { onClose, open = true } = props;
    const { allProfiles } = useSelector(state => state.users);

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Choisissez un profil</DialogTitle>
            <List>
                {allProfiles.length > 0
                    && allProfiles.map((profile) => (
                        <ListItem
                            button
                            onClick={() => dispatch(setModalStatus({ status: true, view: "LOGIN", resources: profile }))}
                            key={profile._id}
                        >
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>{profile.firstName} {profile.lastName}</ListItemText>
                        </ListItem>
                    ))
                }

                <ListItem autoFocus button>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account" />
                </ListItem>
            </List>
        </Dialog>
    );
};

Profiles.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default Profiles;
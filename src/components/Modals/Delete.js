import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRenderStatus } from '../../redux/slices/NavigationSlice';

// React-Router
// API request
import { removeEquipment } from '../../utils/api/Equipments';

// Socket resquest
// Internal import
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogueContent from '@material-ui/core/DialogContent';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    buttonDiv: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'space-around'
    }
});

export const Profiles = (props) => {
    const { onClose, open = true } = props;
    const {id} = useSelector(state => state.navigation.modal)

    console.log(props);

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClose = () => {
        onClose();
    };

    const handleApprovalTrue = (e) => {
        console.log(id);
        removeEquipment(id)
            .then(res => {
                dispatch(setRenderStatus(true))
                onClose();
            })
            .catch(err => {
                console.log(err.message)
                onClose();
            })
    }

    const handleApprovalFalse = (e) => {
        e.preventDefault()
        onClose()
    }

    return (
        <Dialog className={classes.dialog} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Voulez-vous vraiment supprimer cet équipement ?</DialogTitle>
            <DialogueContent>
                <Alert severity="warning">Cet evenement sera irrémédiable</Alert>
                <div className={classes.buttonDiv}>
                    <Button onClick={handleApprovalFalse} variant="contained">Annuler</Button>
                    <Button onClick={handleApprovalTrue} variant="contained" color="primary">Supprimer</Button>
                </div>
            </DialogueContent>
        </Dialog>
    );
};

export default Profiles;
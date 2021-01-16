import React, { useState } from 'react';

// Redux
// React-Router
// API request
// Socket resquest
// Internal import
// Material UI
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { updateEquipment } from '../../utils/api/Equipments';
import { useDispatch } from 'react-redux';
import { setRenderStatus } from '../../redux/slices/NavigationSlice';

const useStyle = makeStyles((theme) => ({
    form: {
        marginTop: 10,
    },
    grid: {
        display: 'flex',
        alignItems: 'center'
    },
    formControl: {
        marginRight: theme.spacing(1),
        minWidth: 120,
        display: 'flex',
        justifyContent: 'space-between'
    },
}))

export const InitEquipmentForm = (Props) => {
    const { equipment, open } = Props
    const [formValues, setFormValues] = useState({
        gpio: '',
    });

    const dispatch = useDispatch();
    const classes = useStyle();

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const { gpio } = formValues;

        const bodyRequest = {
            gpio,
        };

        updateEquipment(equipment._id, bodyRequest)
            .then(res => {
                dispatch(setRenderStatus(true));
                setFormValues({ gpio: '' })
                open(false)
            })
            .catch(err => console.log(err.message))
    };

    console.log(formValues);
    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <Grid className={classes.grid} container>
                <Grid item md>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            id="gpio"
                            name="gpio"
                            value={formValues.name}
                            label="Emplacement"
                            variant="outlined"
                            placeholder="GPIO"
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item md>
                    <FormControl className={classes.formControl}>
                        <Button
                            type="submit"
                            className={classes.button}
                            size="large"
                            variant="contained"
                            color="primary"
                        >
                            Ajouter
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
};

export default InitEquipmentForm;
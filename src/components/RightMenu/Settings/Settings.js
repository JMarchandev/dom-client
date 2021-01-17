import React from 'react';

// Redux
// React-Router
// API request
// Socket resquest
// Internal import
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1rem'
    }
}));

export const Settings = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper>
                <Typography variant='h6'>
                    Settings
                </Typography>
            </Paper>
        </div>
    );
};

export default Settings;
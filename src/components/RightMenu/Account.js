import React from 'react';

// Redux
// React-Router
// API request
// Socket resquest
// Internal import
// Material UI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1rem'
    }
}));

export const Account = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>Account</div>
    );
};

export default Account;
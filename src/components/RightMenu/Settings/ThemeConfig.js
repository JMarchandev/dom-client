import React from 'react';

// Redux
// React-Router
// API request
// Socket resquest
// Internal import

// Material UI
import Paper from '@material-ui/core/Paper';
import DomTabs from '../../common/DomTabs';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    paper: {
        minWidth: '100%'
    }
}))

export default function ThemeConfig() {
    const [value, setValue] = React.useState(0);
    const classes = useStyles()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabs = [{title: "test", content: <p>test</p>}, {title: "test1", content: <p>test1</p>}]

    return (
        <Paper className={classes.paper} square>
            <DomTabs value={value} onChange={handleChange} items={tabs} />
        </Paper >
    );
}

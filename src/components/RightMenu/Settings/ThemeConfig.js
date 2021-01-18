import React from 'react';

// Redux
// React-Router
// API request
// Socket resquest
// Internal import

// Material UI
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function ThemeConfig() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper square>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab component="div" label="Active" />
                <Tab component="div" label="Active" />
            </Tabs>
        </Paper>
    );
}

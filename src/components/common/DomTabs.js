import React from 'react';

// Redux
// React-Router
// API request
// Socket resquest
// Internal import

// Material UI
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box, Typography, withStyles } from '@material-ui/core';

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: '50%',
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            opacity: 1,
        },
        '&$selected': {
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function DomTabs({ onChange, value, items }) {

    return (
        <>
            <AntTabs value={value} onChange={onChange} aria-label="ant example">
                {items.map((item, i) => (
                    <AntTab label={item.title} />

                ))}
                {/* <AntTab label="Tab 2" /> */}
            </AntTabs>
            {items.map((item, i) => (
                <TabPanel value={value} index={i}>
                    {item.content}
                </TabPanel>
            ))}
            {/* <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item 2
            </TabPanel> */}
        </>
    )
}
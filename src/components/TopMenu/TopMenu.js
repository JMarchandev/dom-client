import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setLeftBarStatus, setRightBarStatus, setModalStatus } from '../../redux/slices/NavigationSlice';

// React-Router
import { Link } from "react-router-dom";

// API request
// Socket resquest
// Internal import
import { LeftMenu } from '../LeftMenu/LeftMenu';
import { RightMenu } from '../RightMenu/RightMenu';

// Material UI
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        minHeight: theme.sizing.marginTop,
        backgroundColor: theme.palette.primary.dark,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
    }
}));

export const TopMenu = ({ children }) => {
    const leftMenu = useSelector(state => state.navigation.leftMenu);
    const rightMenu = useSelector(state => state.navigation.rightMenu);
    const user = useSelector(state => state.users.currentProfile);

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleToggleLeftMenu = () => {
        dispatch(setLeftBarStatus(!leftMenu));
    };

    const handleToggleRightMenu = (view) => {
        if (rightMenu.status === true) {
            dispatch(setRightBarStatus({ status: false, view: null }))
        } else if (rightMenu.status === false) {
            dispatch(setRightBarStatus({ status: true, view: view }))
        }
    }

    const handleChangeModalStatus = (newStatus, view) => {
        if (newStatus === false) {
            dispatch(setModalStatus({ status: false, view: null }));
        } else if (newStatus === true) {
            dispatch(setModalStatus({ status: newStatus, view }));
        };
    };

    return (
        <div className={classes.root}>
            <AppBar
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: leftMenu,
                })}
                position="fixed"
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        onClick={handleToggleLeftMenu}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to={'/'}>Dom-House</Link>
                    </Typography>
                    {user === null &&
                        <Button
                            onClick={() => dispatch(setModalStatus({ status: true, view: 'PROFILES' }))}
                            color="inherit"
                        >Login</Button>
                    }
                    {user?._id &&
                        <Button
                            onClick={() => handleToggleRightMenu('ACCOUNT')}
                            color="inherit"
                        >
                            {user.firstName}&emsp;
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        </Button>
                    }

                    <Button onClick={() => handleToggleRightMenu('SETTINGS')} color="inherit">
                        <SettingsIcon />
                    </Button>
                </Toolbar>
            </AppBar>
            <LeftMenu />
            <RightMenu />
        </div >
    );
};
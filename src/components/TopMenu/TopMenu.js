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

import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        //backgroundColor: theme.palette.primary.light,
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        // width: `calc(100% - ${theme.sizing.marginLeft}px)`,
        // marginLeft: theme.sizing.marginLeft,
        // transition: theme.transitions.create(['margin', 'width'], {
        //     easing: theme.transitions.easing.easeOut,
        //     duration: theme.transitions.duration.enteringScreen,
        // }),
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
    const leftMenu = useSelector(state => state.navigation.leftMenu)
    const rightMenu = useSelector(state => state.navigation.rightMenu)
    const user = useSelector(state => state.users.currentProfile)
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleToggleLeftMenu = () => {
        dispatch(setLeftBarStatus(!leftMenu))
    }

    const handleChangeModalStatus = (newStatus, view) => {
        console.log(newStatus);
        if (newStatus === false) {
            dispatch(setModalStatus({ status: false, view: null }))
        } else if (newStatus === true) {
            dispatch(setModalStatus({ status: newStatus, view }))
        }
    }

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
                        <Link className={classes.link} to={'/'}>News</Link>
                    </Typography>
                    {user === null &&
                        <Button
                            onClick={() => dispatch(setModalStatus({ status: true, view: 'PROFILES' }))}
                            color="inherit"
                        >Login</Button>
                    }
                    {user?._id &&
                        <Button
                            onClick={() => dispatch(setRightBarStatus({ status: true, view: 'ACCOUNT' }))}
                            color="inherit"
                        >{user.firstName}</Button>
                    }

                    <Button onClick={() => handleChangeModalStatus(!rightMenu.status, 'SETINGS')} color="inherit">
                        <SettingsIcon />
                    </Button>
                </Toolbar>
            </AppBar>
            <LeftMenu />
            <RightMenu />
        </div >
    );
};
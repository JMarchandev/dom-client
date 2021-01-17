import React from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setRightBarStatus } from '../../redux/slices/NavigationSlice';

// API request
// Socket resquest
// Internal import
import Account from './Account';
import Settings from './Settings/Settings';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: theme.sizing.marginRight,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.sizing.marginRight,
    backgroundColor: theme.palette.primary.main,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   marginLeft: -drawerWidth,
  // },
  // contentShift: {
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginLeft: 0,
  // },
}));

export const RightMenu = () => {
  const { status, view } = useSelector(state => state.navigation.rightMenu);

  const dispatch = useDispatch()
  const classes = useStyles();

  const toggleDrawer = (status, view) => (event) => {
    dispatch(setRightBarStatus({ status, view }));
  };

  const View = () => {
    switch (view) {
      case 'SETTINGS':
        return <Settings/>;
      case 'ACCOUNT':
        return <Account />;
      default:
        break;
    }
  }

  return (
    <div className={classes.root} >
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
        open={status}
        onClose={toggleDrawer(false, null)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} />
        <Divider />
        {View()}
      </Drawer>
    </div >
  );
}

export default RightMenu;

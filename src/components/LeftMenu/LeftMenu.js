import React from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setLeftBarStatus } from '../../redux/slices/NavigationSlice';

// React-Router
import { Link } from "react-router-dom";

// API request
// Socket resquest
// Internal import

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

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
    width: theme.sizing.marginLeft,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.sizing.marginLeft,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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

export const LeftMenu = () => {
  const store = useSelector(state => ({
    status: state.navigation.leftMenu,
    equipments: state.equipments.allEquipments,
    rooms: state.rooms.allRooms,
  }));

  const dispatch = useDispatch()
  const classes = useStyles();

  const toggleDrawer = (status) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    dispatch(setLeftBarStatus(status));
  };

  return (
    <div className={classes.root} >
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={store.status}
        onClose={toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} />
        <Divider />
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          {store.rooms.length > 0
            && store.rooms.map((room, index) => (
              <ListItem button key={room._id}>
                <Link to={'/rooms'}>
                  <ListItemText>{room.name}</ListItemText>
                </Link>
              </ListItem>
            ))
          }
        </List>
        <Divider />
        <List>
          {store.equipments.length > 0
            && store.equipments.map((equipment, index) => (
              <ListItem button key={equipment._id}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <Link to={'/equipments'}>
                  <ListItemText>{equipment.name}</ListItemText>
                </Link>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </div >
  );
}

export default LeftMenu;

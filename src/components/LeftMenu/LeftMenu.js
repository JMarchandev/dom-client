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
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    margin: 10,
    width: theme.sizing.marginLeft,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.sizing.marginLeft,
    backgroundColor: theme.palette.secondary.light,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  list: {
    margin: 10
  },
  headerAccordion: {
    paddingLeft: 0
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.dark,
    '&:hover, :&focus, &:active': {
      textDecoration: 'none',
      color: 'inherit',
    }
  }
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
        variant='permanent'
        anchor='left'
        open={store.status}
        onClose={toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List className={classes.list}>
          <Accordion>
            <AccordionSummary
              className={classes.headerAccordion}
              expandIcon={<ExpandMoreIcon />}
            >
              <Link className={classes.link} to={'/rooms'}>
                <ListItem button key={'title'}>
                  <ListItemIcon>
                    <MeetingRoomIcon fontSize="large" color="primary" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6">Pieces</Typography>
                  </ListItemText>
                </ListItem>
              </Link>
            </AccordionSummary>
            {store.rooms.length > 0
              && store.rooms.map((room, index) => (
                <Link className={classes.link} to={`/rooms/${room._id}`}>
                  <ListItem button key={room._id}>
                    <ListItemText>
                      <Typography variant="subtitle1">
                        {room.name}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </Link>
              ))
            }
          </Accordion>
          <Accordion>
            <AccordionSummary
              className={classes.headerAccordion}
              expandIcon={<ExpandMoreIcon />}
            >
              <Link className={classes.link} to={'/equipments'}>
                <ListItem button key={'title'}>
                  <ListItemIcon>
                    <SettingsRemoteIcon fontSize="large" color="primary" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6">Equipments</Typography>
                  </ListItemText>
                </ListItem>
              </Link>
            </AccordionSummary>
            {store.equipments.length > 0
              && store.equipments.map((equipment, index) => (
                <Link className={classes.link} to={`/equipments/${equipment._id}`}>
                  <ListItem button key={equipment._id}>
                    <ListItemText>
                      <Typography variant="subtitle1">{equipment.name}</Typography>
                    </ListItemText>
                  </ListItem>
                </Link>
              ))
            }
          </Accordion>
        </List>
      </Drawer>
    </div >
  );
}

export default LeftMenu;

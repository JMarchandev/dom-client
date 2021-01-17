// Redux
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
// React-Router
// API request
// Socket resquest
import { toggleLed } from '../../utils/sockets/LedRequest'

// Internal import

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { setRenderStatus } from '../../redux/slices/NavigationSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  icon: {
    width: '4rem',
    height: '4rem',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  }
}));

export const LedCard = ({ equipment }) => {
  const user = useSelector(state => state.users.currentProfile)
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleToggleLed = () => {
    toggleLed(equipment)
      .then(res => dispatch(setRenderStatus(true)))
      .catch(err => console.log(err.message))
  };

  return (
    <div className={classes.root}>
      <Card
        className={classes.paper}
        elevation={3}
        style={equipment.status === 0
          ? { 'backgroundColor': '#ef9a9a' }
          : { 'backgroundColor': '#a5d6a7' }
        }>
        <Button onClick={handleToggleLed}>
          <EmojiObjectsIcon className={classes.icon} />
        </Button>
        <div>
          {equipment.isPersonal === true
            ? equipment.user === user?._id
              ? <LockOpenIcon />
              : <LockIcon />
            : null
          }
          <Typography variant="subtitle1">{equipment.name}</Typography>
        </div>
      </Card>
    </div>
  );
}

export default LedCard;

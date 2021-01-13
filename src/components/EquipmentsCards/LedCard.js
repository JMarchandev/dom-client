// Redux
import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
// React-Router
// API request
// Socket resquest
import { toggleLed } from '../../utils/sockets/LedRequest'

// Internal import

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
    width: '70%',
    height: '70%',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  }
}));

export const LedCard = ({ equipment }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {

  }, [equipment])

  const handleToggleLed = () => {
    toggleLed(equipment)
      .then(res => dispatch(setRenderStatus(true)))
      .catch(err => console.log(err.message))
  };

  return (
    <div className={classes.root}>
      <Paper
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
          <Typography variant="subtitle1">{equipment.name}</Typography>
        </div>
      </Paper>
    </div>
  );
}

export default LedCard;

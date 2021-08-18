import React from 'react';
import './navbar.css'

import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Link
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

const Navbar=() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} >
              <Link href='/' color='inherit' className='link'>
                  Contact Keeper
              </Link>
          </Typography>
          <Button color="inherit" href='/contacts'>View</Button>
          <Button color="inherit" href='/addContact'>Create</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Navbar
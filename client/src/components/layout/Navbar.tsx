import React, { FC, Fragment } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// スライサー
import { logout, authStatus } from '../../features/auth/authSlice';
import { clearProfile } from '../../features/profile/profileSlice';

// Material-UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    }
  })
);

const Navbar: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector(authStatus);

  const AuthLinks = () => {
    return (
      <div className={classes.sectionDesktop}>
        <Link to='/dashboard'>
          <IconButton aria-label='show 17 new notifications' color='inherit'>
            <i className='fas fa-user' style={{ color: '#fff' }} />{' '}
            <span className='text-dark'> Dashboard</span>
          </IconButton>
        </Link>
        <a
          href='#!'
          onClick={() => {
            dispatch(logout());
            dispatch(clearProfile());
          }}>
          <IconButton aria-label='show 42 new mails'>
            <i className='fas fa-sign-out-alt' style={{ color: '#fff' }} />
            {'  '}
            <span className='text-dark'>Logout</span>
          </IconButton>
        </a>
      </div>
    );
  };
  const GuestLinks = () => {
    return (
      <div className={classes.sectionDesktop}>
        <a href='#!'>
          <IconButton aria-label='show 42 new mails'>
            <i className='fas fa-window-restore' style={{ color: '#fff' }} />
          </IconButton>
        </a>
        <Link to='/register'>
          <IconButton aria-label='show 17 new notifications' color='inherit'>
            <i className='fas fa-user-plus' style={{ color: '#fff' }} />
          </IconButton>
        </Link>
        <Link to='/login'>
          <IconButton aria-label='show 4 new mails' color='inherit'>
            <i className='fas fa-sign-in-alt' style={{ color: '#fff' }} />
          </IconButton>
        </Link>
      </div>
    );
  };

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'>
              <i className='fas fa-code' style={{ color: '#fff' }} />
            </IconButton>
            <Typography
              className={classes.title}
              variant='h6'
              noWrap
              style={{ color: '#fff' }}>
              Developer Sns
            </Typography>
          </Link>
          <div className={classes.grow} />
          <Fragment>
            {!auth.loading && auth.isAuthenticated ? (
              <AuthLinks />
            ) : (
              <GuestLinks />
            )}
          </Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

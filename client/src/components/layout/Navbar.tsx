import React, { FC, Fragment, useState } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// スライサー
import { logout, authStatus } from '../../features/auth/authSlice';
import { clearProfile } from '../../features/profile/profileSlice';

// Material-UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'block'
      }
    },
    deskTopMenu: {
      display: 'block',
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    },
    title: {
      flexGrow: 1
    },
    linkStyle: {
      textDecoration: 'none',
      width: '150px',
      display: 'block'
    }
  })
);

const Navbar: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector(authStatus);

  const [state, setState] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(open);
    };

  const AuthLinks = () => {
    return (
      <div>
        <Link
          to='/profiles'
          className={
            classes.linkStyle +
            ' ' +
            'bg-primary text-white text-center p-3 border border-white'
          }>
          開発者
        </Link>

        <Link
          className={
            classes.linkStyle +
            ' ' +
            'bg-primary text-white text-center p-3 border border-white'
          }
          to='/posts'>
          投稿
        </Link>
        <Link
          className={
            classes.linkStyle +
            ' ' +
            'bg-primary text-white text-center p-3 border border-white'
          }
          to='/dashboard'>
          ダッシュボード
        </Link>
        <a
          className={
            classes.linkStyle +
            ' ' +
            'bg-primary text-white text-center p-3 border border-white'
          }
          href='#!'
          onClick={() => {
            dispatch(logout());
            dispatch(clearProfile());
          }}>
          ログアウト
        </a>
      </div>
    );
  };
  const GuestLinks = () => {
    return <div className={classes.root}></div>;
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            News
          </Typography>
          <div className={classes.deskTopMenu}>
            <Button color='inherit'>Login</Button>
          </div>
          <IconButton className={classes.menuButton} color='inherit'>
            <MenuIcon onClick={toggleDrawer(true)} />
          </IconButton>
          <Drawer anchor='right' open={state} onClose={toggleDrawer(false)}>
            {
              <Fragment>
                {!auth.loading && auth.isAuthenticated ? (
                  <AuthLinks />
                ) : (
                  <GuestLinks />
                )}
              </Fragment>
            }
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

// <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
//   <IconButton
//     edge='start'
//     className={classes.menuButton}
//     color='inherit'
//     aria-label='open drawer'>
//     <i className='fas fa-code' style={{ color: '#fff' }} />
//   </IconButton>
//   <Typography
//     className={classes.title}
//     variant='h6'
//     noWrap
//     style={{ color: '#fff' }}>
//     Developer Sns
//   </Typography>
//   </Link>

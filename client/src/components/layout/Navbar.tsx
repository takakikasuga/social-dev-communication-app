import React, { FC, Fragment, useState } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// コンポーネント
import { DrawerLinks } from './index';

// スライサー
import { logout, authStatus } from '../../features/auth/authSlice';
import { clearProfile } from '../../features/profile/profileSlice';

// Material-UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
      flexGrow: 1,
      color: '#fff',
      textDecoration: 'none',
      fontSize: '24px',
      '&:link': {
        color: '#fff'
      },
      '&:visited': {
        color: '#fff'
      },
      '&:active': {
        color: '#fff'
      }
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

  const GuestLinks: FC = () => {
    return (
      <div>
        <Link className='p-3 text-decoration-none text-white' to='/profiles'>
          開発者
        </Link>
        <Link className='p-3 text-decoration-none text-white' to='/register'>
          新規登録
        </Link>
        <Link className='p-3 text-decoration-none text-white' to='/login'>
          ログイン
        </Link>
      </div>
    );
  };

  const AuthLinks: FC = () => {
    return (
      <div style={{ color: '#fff' }}>
        <Link className='p-3 text-decoration-none text-white' to='/profiles'>
          開発者
        </Link>
        <Link className='p-3 text-decoration-none text-white' to='/posts'>
          投稿
        </Link>
        <Link className='p-3 text-decoration-none text-white' to='/dashboard'>
          ダッシュボード
        </Link>
        <a
          className='p-3 text-decoration-none text-white'
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

  const DrawerAuthLinks: FC = () => {
    return (
      <div>
        <DrawerLinks spaRoute='profiles'>開発者</DrawerLinks>
        <DrawerLinks spaRoute='posts'>投稿</DrawerLinks>
        <DrawerLinks spaRoute='dashboard'>ダッシュボード</DrawerLinks>
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

  const DrawerGuestLinks: FC = () => {
    return (
      <div>
        <DrawerLinks spaRoute='profiles'>開発者</DrawerLinks>
        <DrawerLinks spaRoute='register'>新規登録</DrawerLinks>
        <DrawerLinks spaRoute='login'>ログイン</DrawerLinks>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/' className={classes.title}>
            DevNet
          </Link>
          <div className={classes.deskTopMenu}>
            {!auth.loading && auth.isAuthenticated ? (
              <AuthLinks />
            ) : (
              <GuestLinks />
            )}
          </div>
          <div onClick={toggleDrawer(true)}>
            <IconButton className={classes.menuButton} color='inherit'>
              <MenuIcon />
            </IconButton>
          </div>
          <Drawer anchor='right' open={state} onClose={toggleDrawer(false)}>
            {
              <Fragment>
                {!auth.loading && auth.isAuthenticated ? (
                  <DrawerAuthLinks />
                ) : (
                  <DrawerGuestLinks />
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

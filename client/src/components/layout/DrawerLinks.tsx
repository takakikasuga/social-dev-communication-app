import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    linkStyle: {
      textDecoration: 'none',
      width: '150px',
      display: 'block'
    }
  })
);

const DrawerLinks: FC<{ spaRoute: string; children: string }> = ({
  spaRoute,
  children
}) => {
  const classes = useStyles();
  return (
    <Link
      className={
        classes.linkStyle +
        ' ' +
        'bg-primary text-white text-center p-3 border border-white'
      }
      to={`/${spaRoute}`}>
      {children}
    </Link>
  );
};

export default DrawerLinks;

import React from 'react';
import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <Toolbar />
      <main className={classes.Content}>{props.children}</main>
    </div>
  );
};

export default Layout;

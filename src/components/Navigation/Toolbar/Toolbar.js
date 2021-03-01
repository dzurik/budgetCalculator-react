import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationList from '../NavigationList/NavigationList';

const Toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <Logo />
      <NavigationList>
        <p>auth</p>
        <p>add</p>
      </NavigationList>
    </div>
  );
};

export default Toolbar;

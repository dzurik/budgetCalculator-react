import classes from './NavigationList.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationList = () => {
  return (
    <div className={classes.Navigation}>
      <ul className={classes.NavigationList}>
        <NavigationItem className={classes.NavigationList__item} link="/">
          Overview
        </NavigationItem>
        <NavigationItem link="/transactions">Transactions</NavigationItem>
      </ul>
    </div>
  );
};

export default NavigationList;

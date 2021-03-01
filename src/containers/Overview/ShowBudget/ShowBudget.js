import classes from './ShowBudget.module.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { currencyHelper } from '../../../shared/utility';

const ShowBudget = () => {
  const totalBudget = useSelector((state) => {
    return state.totalBudget;
  });

  const currency = useSelector((state) => {
    return state.currency;
  });

  const currencies = useSelector((state) => {
    return state.currencies;
  });

  let budgetClasses = [classes.Budget];

  if (totalBudget < 0) {
    budgetClasses.push(classes.Red);
  }

  useEffect(() => {}, [totalBudget]);

  return (
    <div className={classes.ShowBudget}>
      <h2>Budget:</h2>
      <h1 className={budgetClasses.join(' ')}>
        {!totalBudget
          ? currencyHelper(currency, 'HUF', 0, currencies)
          : currencyHelper(currency, 'HUF', totalBudget, currencies)}
      </h1>
    </div>
  );
};

export default ShowBudget;

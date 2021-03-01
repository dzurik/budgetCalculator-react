import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classes from './CurrencyChanger.module.scss';
import * as actions from '../../store/actions/index';

const CurrencyChanger = () => {
  const [currency, setCurrency] = useState('HUF');
  const [sortBy, setSortBy] = useState('default');

  const dispatch = useDispatch();

  const onChangeCurrency = useCallback(
    (currency) => dispatch(actions.changeCurrency(currency)),
    [dispatch]
  );

  const onChangeSortBy = useCallback((sortBy) => dispatch(actions.changeSortBy(sortBy)), [
    dispatch,
  ]);

  useEffect(() => {
    onChangeCurrency(currency);
  }, [currency, onChangeCurrency]);

  useEffect(() => {
    onChangeSortBy(sortBy);
  }, [onChangeSortBy, sortBy]);

  return (
    <div className={classes.CurrencyChanger}>
      <h3>Current Currency: {currency}</h3>
      <div className={classes.Change}>
        <p>Change currency:</p>
        <select
          className={classes.Select}
          onChange={(event) => setCurrency(event.target.value)}
        >
          <option value="HUF">Ft</option>
          <option value="EUR">€</option>
          <option value="USD">$</option>
          <option value="GBP">£</option>
        </select>
      </div>
      <div className={classes.SortBy}>
        <p>Sort by:</p>
        <select
          className={classes.Select}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="default">No Sort</option>
          <option value="ascending">A - Z</option>
          <option value="descending">Z - A</option>
          <option value="smallest">Smallest Amount</option>
          <option value="largest">Largest Amount</option>
        </select>
      </div>
    </div>
  );
};

export default CurrencyChanger;
